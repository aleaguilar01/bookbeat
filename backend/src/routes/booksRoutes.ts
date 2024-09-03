import express from "express";
import {
  getBook,
  createBook,
  getMyBooks,
  updateMyBooks,
  getRecommendedBooks,
  getRelatedBooks,
  deleteBook,
} from "../controllers/booksController";

const router = express.Router();

router.get("/:title", getBook);

router.post("/", createBook);
router.get("/", getMyBooks);
router.put("/", updateMyBooks);
router.post("/recommendations", getRecommendedBooks);
router.post("/related", getRelatedBooks);
router.delete("/:id", deleteBook)

export default router;
