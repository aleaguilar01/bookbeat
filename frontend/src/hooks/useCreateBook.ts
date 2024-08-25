import axios from "axios";

interface CreateBookArgs {
  readingStatus: string
  isbn: string
  title: string
  author: string
  rating?: number
  publishedYear?: number
  numberOfPages?: number
  firstSentence?: string
}
export const useCreateBook = () => {
  const createBook = async (args: CreateBookArgs) => {
    return axios.post("book", args, { baseURL: "http://localhost:3000" });
  };

  return { createBook };
};
