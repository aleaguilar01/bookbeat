import { useState } from "react";
import { useBook } from "../context/books-context";
import { useApi } from "./useApi";

interface CreateBookArgs {
  readingStatus: string;
  isbn: string;
  title: string;
  author: string;
  rating?: number;
  publishedYear?: number;
  numberOfPages?: number;
  firstSentence?: string;
  imageUrl?: string;
}

export const useHandleBooks = () => {
  const { refetch } = useBook();
  const [isLoading, setIsLoading] = useState(false);
  const api = useApi();
  const updateRating = (myRating: number, id: string) => {
    setIsLoading(true);
    api
      .put("/book", { id, myRating })
      .then(() => {
        refetch();
      })
      .catch(() => {
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  };
  const updateIsFavorite = (isFavorite: boolean, id: string) => {
    setIsLoading(true);
    api
      .put("/book", { id, isFavorite })
      .then(() => refetch())
      .catch(() => {
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  };
  const updateReadingStatus = (readingStatus: string, id: string) => {
    setIsLoading(true);
    api
      .put("/book", { id, readingStatus })
      .then(() => refetch())
      .catch(() => {
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  };

  const createBook = async (args: CreateBookArgs) => {
    setIsLoading(true);
    api
      .post("book", args)
      .then(() => refetch())
      .catch(() => {
        setIsLoading(false);
      });
  };

  return {
    updateIsFavorite,
    updateReadingStatus,
    updateRating,
    createBook,
    isLoading,
  };
};
