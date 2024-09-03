import { anthropic } from "../lib/aiClient";
import { TextBlock } from "@anthropic-ai/sdk/resources";
import { ScoredBook } from "./bookHelper";

export const getBookDescription = async (title: string, author?: string) => {
  try {
    const SYSTEM =
      "You are a professional publisher that creates summaries for books. The generated summaries are conscise and without spoilers. The maximum amount of words for each summary is 50 words. Important: Answer only with the summary, no other comments. If you don't have information on the book just say: 'No Summary Available'";
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

export const getBookGenres = async (
  activeGenres: Array<{ id: string; name: string }>,
  title: string,
  author?: string
): Promise<Array<string>> => {
  try {
    const SYSTEM = `You are a professional book categorizer that matches different books to Genres. The available genres to map are ${activeGenres
      .map(({ name }) => name)
      .join(
        ", "
      )}. When a book is provided you have to match the most relevant genres that match the book. The return is an Array in the format of string[]. For example, when user provides "X" book return: ["Genre X", "Genre Y"]. Important: Keep the matches limited to the available genres and just return the answer without any other words so you can JSON.parse the response`;
    const PREFILL = "[";
    const INITIAL_PROMPT = `Provide the genres of the book ${title} from ${author}.`;
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
    const suggestedGenres = JSON.parse(PREFILL+msg);
    if (!Array.isArray(suggestedGenres)) {
      // do something else
      throw new Error(`Message is not an array: ${PREFILL+msg}`);
    }

    return activeGenres
      .filter(({ name }) => suggestedGenres.includes(name))
      .map(({ id }) => id);
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getAiRelatedBooks = async (title: string, author?: string)=>{
  try {
    const SYSTEM = `You are a professional book publisher that can associate different books. When provided a title and the author, you can provide the top 5 books that has de greatest relation with the input. Limit your self to give only one suggestion from the same author. The response has to be in an Array of JSON objects with the keys title and author. Keep you anwser limited just to the JSON object. Example output: [{ title: "Book A", author: "Same Author" }, {title: "New Book", author: "Another Author" ...}]`;
    const PREFILL = '[{ "title": "';
    const INITIAL_PROMPT = `Provide the related books for "${title}" by "${author}".`;
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
    console.log(msg)
    const relatedBooks = JSON.parse(PREFILL+msg);
    if (!Array.isArray(relatedBooks)) {
      // do something else
      throw new Error(`Message is not an array: ${relatedBooks}`);
    }

    return relatedBooks
  } catch (err) {
    console.log(err);
    return [];
  }
}

export const getBookRecommendations = async (
  myBooks: Array<ScoredBook>,
  previousRecomendations?: Array<{ title: string; author: string }>
): Promise<Array<{ author: string; title: string }>> => {
  try {
    const SYSTEM = `You are a professional book reviewer that provide book recommendations to people. The user will provide a JSON list of their books with a score, the higher the score the more revelant is to the user. Output is an Array with 5 JSON objects {title: string, author: string}. Example output '[{ "title": "A Game of Thrones: A Song of Ice and Fire: Book One", "author": "George R.R. Martin"},{ "title": "Spark City: Book One of the Spark City Cycle", "author": "Robert J Power"} ...]'. Important: Do not suggest any books that the user already has in the input of "My Books" and keep the suggestions tied to the user preferrence preferences.`;
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
