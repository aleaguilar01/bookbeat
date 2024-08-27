import express from "express";
import { aiChat } from "../controllers/aiController";

const router = express.Router();


router.post("/chat", aiChat)

export default router