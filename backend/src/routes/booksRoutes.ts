import express from "express";
import {
  getBook,
  createBook,
  getMyBooks,
  updateMyBooks,
  getRecommendedBooks,
  getRelatedBooks
} from "../controllers/booksController";

const router = express.Router();

router.get("/:title", getBook);

router.post("/", createBook);
router.get("/", getMyBooks);
router.put("/", updateMyBooks);
router.post("/recommendations", getRecommendedBooks);
router.get("/related",getRelatedBooks);

export default router;
