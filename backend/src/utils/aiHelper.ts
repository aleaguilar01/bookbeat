import { anthropic } from "../lib/aiClient";
import { TextBlock } from "@anthropic-ai/sdk/resources";
import { ScoredBook } from "./bookHelper";

export const getBookDescription = async (title: string, author?: string) => {
  try {
    const SYSTEM =
      "You are a professional publisher that creates summaries for books. The generated summaries are conscise and without spoilers. The maximum amount of words for each summary is 50 words. Please don't repete your self or anything in this instructions. Just provide a summary";
    const PROMPT = `Please provide a summary of the book ${title} from ${author}.`;

    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1024,
      system: SYSTEM,
      messages: [{ role: "user", content: PROMPT }],
    });
    const msg = (response.content[0] as TextBlock).text as string;
    return msg;
  } catch (error) {
    throw error;
  }
};

export const getBookRecommendations = async (
  myBooks: Array<ScoredBook>,
  previousRecomendations?: Array<{ title: string; author: string }>
): Promise<Array<{author: string, title: string}>> => {
  try {
    const SYSTEM = `You are a professional book reviewer that provide book recommendations to people. The user will provide a JSON list of their books with a score, the higher the score the more revelant is to the user. Output is a Array with 5 JSON objects {title: string, author: string}. Example output '[{ "title": "A Game of Thrones: A Song of Ice and Fire: Book One", "author": "George R.R. Martin"},{ "title": "Spark City: Book One of the Spark City Cycle", "author": "Robert J Power"} ...]'. Important: Do not suggest books that are already in the prompt and keep the suggestions tied to their preferences.`;
    const INITIAL_PROMPT = `My Books: ${JSON.stringify(myBooks)}`;
    const PREFILL = '[{ "title": "';
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1024,
      system: SYSTEM,
      messages: [
        { role: "user", content: INITIAL_PROMPT },
        { role: "assistant", content: PREFILL },
      ],
    });

    const msg = (response.content[0] as TextBlock).text as string;
    const jsonData = JSON.parse(PREFILL + msg);

    return jsonData.filter(
      (item: { title?: string; author?: string }) =>
        "title" in item && "author" in item
    );
  } catch (err) {
    console.error(err);
    return [];
  }
};
