import { Request, Response } from "express";
import { getBooks as getBooksFromApi } from "../utils/apiHelper";
import { redisClient } from "../lib/redisClient";
import { prisma } from "../lib/prismaClient";
import { getBookDescription, getBookRecommendations } from "../utils/aiHelper";
import { getFlattenedBooks, getScoredBooks } from "../utils/bookHelper";

export const getBook = async (req: Request, res: Response) => {
  const title = req.params.title;
  try {
    const data = await redisClient.get(title.toLowerCase());
    if (data !== null) {
      return res.json(JSON.parse(data));
    } else {
      const response: any = await getBooksFromApi(title);
      await redisClient.setEx(
        title.toLowerCase(),
        3600,
        JSON.stringify(response)
      );
      res.send(response);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error ocurred while fetching book data");
  }
};

export const createBook = async (req: Request, res: Response) => {
  const data = req.body;
  let book = await prisma.book.findUnique({ where: { isbn: data.isbn } });
  if (!book) {
    const description = await getBookDescription(data.title, data.author);
    try {
      book = await prisma.book.create({
        data: {
          isbn: data.isbn,
          title: data.title,
          author: data.author,
          rating: data.rating,
          publishedYear: data.publishedYear,
          numberOfPages: data.numberOfPages,
          firstSentence: description,
          imageUrl: data.imageUrl,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Error occurred while creating the book.");
    }
  }

  const userBook = await prisma.userBook.create({
    data: {
      user: {
        connect: {
          id: req.user?.userId,
        },
      },
      book: {
        connect: {
          isbn: book.isbn,
        },
      },
      readingStatus: data.readingStatus,
    },
  });

  res.send(userBook);
};

export const getMyBooks = async (req: Request, res: Response) => {
  const books = await prisma.userBook.findMany({
    where: {
      userId: req.user!.userId,
    },
    include: {
      book: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  const flattenedBooks = getFlattenedBooks(books);
  return res.send(flattenedBooks);
};

export const updateMyBooks = async (req: Request, res: Response) => {
  const data = req.body;

  if (
    !Object(data).hasOwnProperty("isFavorite") &&
    !data.readingStatus &&
    !data.myRating
  ) {
    return res.status(500).send("No valid data to update");
  }
  // validate book belongs and exists to user
  await prisma.userBook.findFirstOrThrow({
    where: {
      id: data.id,
      userId: req.user?.userId,
    },
  });

  await prisma.userBook.update({
    data: {
      ...(Object(data).hasOwnProperty("isFavorite")
        ? { isFavorite: data.isFavorite }
        : {}),
      ...(data.readingStatus ? { readingStatus: data.readingStatus } : {}),
      ...(data.myRating ? { rating: data.myRating } : {}),
    },
    where: {
      id: data.id,
    },
  });

  return res.send({});
};

export const getRecommendedBooks = async (req: Request, res: Response) => {
  const { currentRecommendations } = req.body;
  try {
    const data = await redisClient.get(
      `recommed-${req.user?.userId}-${currentRecommendations?.length || 0}`
    );
    if (data !== null) {
      return res.json(JSON.parse(data));
    }
    const userBooks = await prisma.userBook.findMany({
      where: { userId: req.user?.userId },
      include: {
        book: true,
      },
    });

    // flattenUserBooks
    const flattenedBooks = getFlattenedBooks(userBooks);
    // scoring
    const scoredBooks = getScoredBooks(flattenedBooks);
    const bookRecommendations = await getBookRecommendations(scoredBooks);
    // Get data from api
    const apiDataPromise = bookRecommendations.map((recommendation) => {
      return getBooksFromApi(
        recommendation.title + " " + recommendation.author,
        1
      );
    });
    const apiData = await Promise.all(apiDataPromise);
    const flattenedData = apiData.flat();
    if (!flattenedData) {
      return res.send([]);
    }

    const isbns = flattenedData.flat().map((data) => data.isbn);

    const books = await prisma.book.findMany({
      where: { isbn: { in: isbns } },
    });

    const foundIsbns = books.map(({ isbn }) => isbn);

    const booksNotFound = flattenedData.filter(
      ({ isbn }) => !foundIsbns.includes(isbn)
    );

    let createdBooks: any[] = [];
    if (booksNotFound && booksNotFound.length > 0) {
      const createdBooksPromise = booksNotFound.map(async (book) => {
        const description = await getBookDescription(
          book.title,
          book.author.join(", ")
        );
        return prisma.book.create({
          data: {
            isbn: book.isbn,
            title: book.title,
            author: book.author.join(", "),
            rating: book.ratings,
            publishedYear: book.published_year,
            numberOfPages: book.number_of_pages,
            firstSentence: description,
            imageUrl: book.cover_url,
          },
        });
      });
      const promisedResolved = await Promise.all(createdBooksPromise);
      createdBooks = promisedResolved;
    }

    // only recommend books with covers
    const mergedBooks = [...books, ...createdBooks].filter(book => !!book.imageUrl);

    await redisClient.setEx(
      `recommed-${req.user?.userId}-${currentRecommendations?.length || 0}`,
      3600,
      JSON.stringify(mergedBooks)
    );
    return res.send(mergedBooks);
  } catch (err) {
    console.error(err, "Finding Recommendations");
    return res.status(500).send("Error finding recommendations");
  }
};
