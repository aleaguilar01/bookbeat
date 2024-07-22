import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getBooksByTitle } from "./utils/apiHelper";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", async (req: Request, res: Response) => {
  try {
    const response: any = await getBooksByTitle("A court of thorns and roses")
  res.send(response)
  } catch (error) {console.log(error)}
  
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});