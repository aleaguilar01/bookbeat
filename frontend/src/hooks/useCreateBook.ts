import { useApi } from "./useApi";

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
  const api = useApi();
  const createBook = async (args: CreateBookArgs) => {
    return api.post("book", args);
  };

  return { createBook };
};
