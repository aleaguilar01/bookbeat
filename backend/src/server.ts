import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getBooksByTitle } from "./utils/apiHelper";
import bookRoutes from "./routes/booksRoutes"
import musicRoutes from "./routes/musicRoutes"  // Assuming your routes are defined in a separate file


dotenv.config();


const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Add this if you need to handle JSON requests


app.use("/book", bookRoutes)
app.use('/music', musicRoutes);



app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});