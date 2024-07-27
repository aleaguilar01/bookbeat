import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getBooksByTitle } from "./utils/apiHelper";
import bookRoutes from "./routes/booksRoutes"

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use("/book", bookRoutes)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});