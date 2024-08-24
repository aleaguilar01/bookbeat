import express, { Express, Request, Response } from "express";
import session from 'express-session';
import dotenv from "dotenv";
import cors from 'cors';
import { getBooksByTitle } from "./utils/apiHelper";
import bookRoutes from "./routes/booksRoutes"
import musicRoutes from "./routes/musicRoutes" 
 


dotenv.config();


const app: Express = express();
const port = process.env.PORT || 3000;

// handle JSON requests
app.use(express.json()); 

// cors
app.use(cors({
  origin: 'http://localhost:5173',  // Your frontend URL
  credentials: true  // Allow credentials (cookies)
}));

// Retrieve the session secret from environment variables or use an empty string if not available
const SESSION_SECRET: any = process.env.SESSION_SECRET || '';

// Initialize session middleware with the specified configuration
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));


app.use("/book", bookRoutes);
app.use("/music", musicRoutes);



app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});