import { Request, Response } from "express";
import { getBooksByTitle } from "../utils/apiHelper";

export const getBook = async (req: Request, res: Response) => {
  console.log('here')
  const title = req.params.title;
  try {
    const response: any = await getBooksByTitle(title);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error ocurred while fetching book data")
  }
}

