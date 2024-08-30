import { Request, Response } from "express";
import { anthropic } from "../lib/aiClient";
import { TextBlock } from "@anthropic-ai/sdk/resources";

const ROLE =
`You are a professional writer and musician with knowledge of all literature 
and music. You must respond to the book provided to you with three real spotify playlist 
reccomendations. You have to return real Spotify playlist names. Return only the response 
in JSON format with the following keys: playlist. Example: Can you recommend 
Spotify playlists to go with the mood of Steinbeck's book Of Mice and Men? Maximum 3
. Response { playlist: ["Dust Bowl Blues", "Melancholy Acoustic", "American Roots"]}`

export const aiPlaylistReccomendations = async (req: Request, res: Response) => {
  try {
    const { book } = req.body;
    console.log('Ai receiving request', book);

    // Create a single message based on the book title
    const userMessage = `Can you recommend Spotify playlists to go with the mood of the book ${book}?`;


    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1024,
      messages: [
        { role: "user", content: ROLE },  // Set up the role/instructions
        { role: "assistant", content: "Thank you" },  // Assistant response placeholder
        { role: "user", content: userMessage },  // Send the user's request

      ],
    });
    const msg = (response.content[0] as TextBlock).text as string
    console.log('Ai giving response', msg)

    res.send(msg);
  } catch (error) {
    console.error('AI Playlist Recommendation Error:', error); // Log the actual error
    res.status(500).send("Failed to Process AI Reccomendation");
  }
};

