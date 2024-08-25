import express, { Express, json } from "express";
import dotenv from "dotenv";
import bookRoutes from "./routes/booksRoutes";
import userRoutes from "./routes/userRoutes";
import cors from 'cors';
import { redisClient } from "./lib/redisClient";
import { authMiddleware } from "./middleware/authMiddleware";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

if(!process.env.JWT_SIGN){
  throw new Error("Please ensure having JWT_SIGN in your environment variables")
}
app.use(cors())
app.use(json())

redisClient.connect();

app.use(userRoutes)
/// after the middleware is authenticated
app.use("/book", authMiddleware, bookRoutes)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});