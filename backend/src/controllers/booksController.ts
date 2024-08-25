import { Request, Response } from "express";
import { getBooksByTitle } from "../utils/apiHelper";
import { redisClient } from "../lib/redisClient";
import { prisma } from "../lib/prismaClient";

export const getBook = async (req: Request, res: Response) => {
  const title = req.params.title;
  try {
    const data = await redisClient
      .get(title.toLowerCase())
    if (data !== null) {
      console.log("Cache hit");
      return res.json(JSON.parse(data));
    } else {
      const response: any = await getBooksByTitle(title);
      await redisClient.setEx(title.toLowerCase(), 3600, JSON.stringify(response))
      res.send(response);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error ocurred while fetching book data");
  }
};

export const createBook = async (req: Request, res: Response) => {
  const data = req.body
  console.log(data)
  let book = await prisma.book.findUnique({where: {isbn: data.isbn}})
  
  if (!book){
    try {
      console.log("I am here", book)
      book = await prisma.book.create({data: {
        isbn: data.isbn,
        title: data.title,
        author: data.author,
        rating: data.rating,
        publishedYear: data.publishedYear,
        numberOfPages: data.numberOfPages,
        firstSentence: data.firstSentence
      }})
    }
    catch(error) {
      console.log(error);
      return res.status(500).send("Error occurred while creating the book.")
    }
    
    try {
      const userBook = await prisma.userBook.create({
        data: {
          userId: userId,
          bookId: book.isbn,
          readingStatus: data.readingStatus,
          rating: data.rating
        }
      })
    }

  } 
}
