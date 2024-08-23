import { Request, Response } from "express";
import { getBooksByTitle } from "../utils/apiHelper";
import { redisClient } from "../lib/redisClient";

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
