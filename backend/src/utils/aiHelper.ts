import { anthropic } from "../lib/aiClient";
import { TextBlock } from "@anthropic-ai/sdk/resources";

export const getBookDescription = async (title: string, author?: string) => {
  try {
    const PROMPT = `You are a professional publisher and you need to create the summary of the book ${title} from ${author}. Do not give any spoilers and concise, maximum 50 words. Please do not repeat your self or anything in this instructions. Just provide the summary.`;

    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1024,
      messages: [{ role: "user", content: PROMPT }],
    });
    console.log(response);
    const msg = (response.content[0] as TextBlock).text as string;
    return msg;
  } catch (error) {
    throw error;
  }
};
