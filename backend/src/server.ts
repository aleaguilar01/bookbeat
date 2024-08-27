import express, { Express, json } from "express";
import session from 'express-session';
import dotenv from "dotenv";
import cors from 'cors';
import bookRoutes from "./routes/booksRoutes"
import musicRoutes from "./routes/musicRoutes" 
import aiRoutes from "./routes/aiRoutes" 
import userRoutes from "./routes/userRoutes";
import { redisClient } from "./lib/redisClient";
import { authMiddleware } from "./middleware/authMiddleware";

dotenv.config();


const app: Express = express();
const port = process.env.PORT || 3000;

if(!process.env.JWT_SIGN){
  throw new Error("Please ensure having JWT_SIGN in your environment variables")
}

if(!process.env.SPOTIFY_CLIENT_SECRET){
  throw new 
  Error("Please ensure having SPOTIFY_CLIENT_SECRET in your environment variables")
}

if(!process.env.SPOTIFY_CLIENT_ID){
  throw new Error("Please ensure having SPOTIFY_CLIENT_ID in your environment variables")
}

// cors
app.use(cors());

app.use(json())

// Retrieve the session secret from environment variables or use an empty string if not available
const SESSION_SECRET: any = process.env.SESSION_SECRET || '';

// Initialize session middleware with the specified configuration
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));


redisClient.connect();

app.use(userRoutes)
/// after the middleware is authenticated
app.use("/book", authMiddleware, bookRoutes)
app.use("/ai", authMiddleware, aiRoutes)
app.use("/music", musicRoutes);



app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});