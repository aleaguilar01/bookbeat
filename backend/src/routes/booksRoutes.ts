import express from "express";
import { getBook } from "../controllers/booksController";

const router = express.Router();

router.get("/:title", getBook);

export default router