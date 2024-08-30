import express from "express";
import {
  getBook,
  createBook,
  getMyBooks,
  updateMyBooks,
  getRecommendedBooks
} from "../controllers/booksController";

const router = express.Router();

router.get("/:title", getBook);

router.post("/", createBook);
router.get("/", getMyBooks);
router.put("/", updateMyBooks);
router.post("/recommendations", getRecommendedBooks)

export default router;
