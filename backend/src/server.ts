import express, { Express, Request, Response, json } from "express";
import dotenv from "dotenv";
import { getBooksByTitle } from "./utils/apiHelper";
import bookRoutes from "./routes/booksRoutes";
import userRoutes from "./routes/userRoutes";
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(json())

app.use(userRoutes)
/// after the middleware is authenticated
app.use("/book", bookRoutes)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});