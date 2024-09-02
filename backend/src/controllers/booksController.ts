import { Request, Response } from "express";
import { getBooks as getBooksFromApi } from "../utils/apiHelper";
import { redisClient } from "../lib/redisClient";
import { prisma } from "../lib/prismaClient";
import {
  getBookDescription,
  getBookRecommendations,
  getBookGenres,
  getAiRelatedBooks,
} from "../utils/aiHelper";
import { getFlattenedBooks, getScoredBooks } from "../utils/bookHelper";
import { Prisma } from "@prisma/client";

type BookWithGenre = Prisma.BookGetPayload<{
  include: {
    genres: true;
  };
}>;

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
    console.error(error);
    res.status(500).send("Error ocurred while fetching book data");
  }
};

export const createBook = async (req: Request, res: Response) => {
  const data = req.body;
  let book = await prisma.book.findUnique({ where: { isbn: data.isbn } });
  if (!book) {
    const activeGenres = await getActiveGenres();

    const descriptionPromise = getBookDescription(data.title, data.author);
    const genresPromise = getBookGenres(activeGenres, data.title, data.author);

    const [description, genres] = await Promise.all([
      descriptionPromise,
      genresPromise,
    ]);
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
          ...(genres && genres.length > 0
            ? {
                genres: {
                  connect: genres.map((id) => ({ id })),
                },
              }
            : {}),
        },
      });
    } catch (error) {
      console.error(error);
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
  try {
    const books = await prisma.userBook.findMany({
      where: {
        userId: req.user!.userId,
      },
      include: {
        book: {
          include: {
            genres: true,
            relatedBooks: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const flattenedBooks = getFlattenedBooks(books);
    return res.send(flattenedBooks);
  } catch (error) {
    console.error("Error in getMyBooks:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const getRelatedBooks = async (req: Request, res: Response) => {
  const { isbn } = req.body;

  if (!isbn || isbn === "") {
    return res.status(400).send("No ISBN provided");
  }
  const data = await redisClient.get(`related-${isbn}`);
  if (data !== null) {
    return res.json(JSON.parse(data));
  }

  const myBook = await prisma.book.findUnique({
    where: { isbn },
    include: {
      relatedBooks: true,
    },
  });

  if (!myBook) {
    return res.status(404).send("No Book Found to Update");
  }

  if (myBook.relatedBooks.length > 0) {
    await redisClient.setEx(
      `related-${isbn}`,
      3600,
      JSON.stringify(myBook.relatedBooks)
    );
    return res.send(myBook.relatedBooks);
  }

  const aiRelatedBooks = await getAiRelatedBooks(myBook.title, myBook.author);
  const relatedBooks = await findAndCreateBooks(aiRelatedBooks);

  const promises = relatedBooks.map((associatedBook) => {
    return prisma.book.update({
      data: {
        relatedBooks: {
          connect: {
            isbn: myBook.isbn,
          },
        },
      },
      where: { isbn: associatedBook.isbn },
    });
  });

  const response = await Promise.all(promises);
  await redisClient.setEx(`related-${isbn}`, 3600, JSON.stringify(response));
  return res.send(response);
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
      `recommended-${req.user?.userId}-${currentRecommendations?.length || 0}`
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

    if (userBooks.length < 4) {
      return res.send([]);
    }

    // flattenUserBooks
    const flattenedBooks = getFlattenedBooks(userBooks);
    // scoring
    const scoredBooks = getScoredBooks(flattenedBooks);
    const bookRecommendations = await getBookRecommendations(scoredBooks);
    // const aiSuggestedBooks = createAiGeneratedBooks(scoredBooks)

    // only recommend books with covers
    const mergedBooks = (await findAndCreateBooks(bookRecommendations)).filter(
      (book) => !!book.imageUrl
    );

    await redisClient.setEx(
      `recommended-${req.user?.userId}-${currentRecommendations?.length || 0}`,
      3600,
      JSON.stringify(mergedBooks)
    );
    return res.send(mergedBooks);
  } catch (err) {
    console.error(err, "Finding Recommendations");
    return res.status(500).send("Error finding recommendations");
  }
};

const getActiveGenres = async () => {
  // get active genres
  const cachedGenres = await redisClient.get("genres");
  if (cachedGenres !== null) {
    return JSON.parse(cachedGenres);
  }
  const activeGenres = (await prisma.bookGenres.findMany()).map(
    ({ id, name }) => ({
      id,
      name,
    })
  );
  await redisClient.setEx("genres", 3600, JSON.stringify(activeGenres));
  return activeGenres;
};

const findAndCreateBooks = async (
  books: Array<{ author: string; title: string }>
): Promise<Array<BookWithGenre>> => {
  // Get data from api
  const apiDataPromise = books.map(({ title, author }) => {
    return getBooksFromApi(title + " " + author, 1);
  });
  const apiData = await Promise.all(apiDataPromise);
  const flattenedData = apiData.flat();
  if (!flattenedData) {
    return [];
  }

  const isbns = flattenedData.map((data) => data.isbn);

  const existingBooks = await prisma.book.findMany({
    where: { isbn: { in: isbns } },
    include: { genres: true },
  });

  const foundIsbns = existingBooks.map(({ isbn }) => isbn);

  const booksToBeCreated = flattenedData.filter(
    ({ isbn }) => !foundIsbns.includes(isbn)
  );
  let createdBooks: Array<BookWithGenre> = [];
  if (booksToBeCreated && booksToBeCreated.length > 0) {
    // get genres
    const activeGenres = await getActiveGenres();
    const createdBooksPromise = booksToBeCreated.map(async (book) => {
      const descriptionPromise = getBookDescription(
        book.title,
        book.author.join(", ")
      );
      const genresPromise = getBookGenres(
        activeGenres,
        book.title,
        book.author.join(", ")
      );
      const [description, genres] = await Promise.all([
        descriptionPromise,
        genresPromise,
      ]);
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
          genres: {
            connect: genres.map((id) => ({ id })),
          },
        },
        include: {
          genres: true,
        },
      });
    });
    createdBooks = await Promise.all(createdBooksPromise);
  }
  return [...existingBooks, ...createdBooks];
};
