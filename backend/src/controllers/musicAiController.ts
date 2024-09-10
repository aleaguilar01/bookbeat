import { Request, Response } from "express";
import { getPlaylistsRecommendations } from "../utils/aiHelper";


export const aiPlaylistReccomendations = async (req: Request, res: Response) => {
  try {
    const { book } = req.body;
    const msg = getPlaylistsRecommendations(book)
    res.send(msg);

  } catch (error) {
    console.error('AI Playlist Recommendation Error:', error); // Log the actual error
    res.status(500).send("Failed to Process AI Reccomendation");
  }
};

