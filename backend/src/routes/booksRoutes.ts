import express from "express";
import { getBook, createBook } from "../controllers/booksController";

const router = express.Router();

router.get("/:title", getBook);

router.post("/", createBook)

export default router