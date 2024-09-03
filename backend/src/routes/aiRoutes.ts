import express from "express";
import { aiChat } from "../controllers/aiController";
import { aiPlaylistReccomendations } from "../controllers/musicAiController";

const router = express.Router();


router.post("/chat", aiChat)
router.post("/music-reccomendations", aiPlaylistReccomendations)

export default router