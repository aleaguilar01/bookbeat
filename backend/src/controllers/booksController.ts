import { Request, Response } from "express";
import { getBooksByTitle } from "../utils/apiHelper";
import { redisClient } from "../lib/redisClient";
import { prisma } from "../lib/prismaClient";

export const getBook = async (req: Request, res: Response) => {
  const title = req.params.title;
  try {
    const data = await redisClient.get(title.toLowerCase());
    if (data !== null) {
      return res.json(JSON.parse(data));
    } else {
      const response: any = await getBooksByTitle(title);
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
    try {
      book = await prisma.book.create({
        data: {
          isbn: data.isbn,
          title: data.title,
          author: data.author,
          rating: data.rating,
          publishedYear: data.publishedYear,
          numberOfPages: data.numberOfPages,
          firstSentence: data.firstSentence,
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
      updatedAt: 'desc'
    }
  });
  const flattenedBooks = books.map(({ book, rating, ...rest }) => {
    return {
      myRating: rating,
      ...book,
      ...rest,
    };
  });
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
  const books = await prisma.userBook.findFirstOrThrow({
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
