import { useState } from "react";
import { useBook } from "../context/books-context";
import { useApi } from "./useApi";
import { useNavigate } from "react-router";
import { message } from "antd";

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
  const navigate = useNavigate();
  const updateRating = (myRating: number, id: string) => {
    setIsLoading(true);
    api
      .put("/book", { id, myRating })
      .then(() => refetch())
      .finally(() => setIsLoading(false));
  };
  const updateIsFavorite = (isFavorite: boolean, id: string) => {
    setIsLoading(true);
    api
      .put("/book", { id, isFavorite })
      .then(() => refetch())
      .finally(() => setIsLoading(false));
  };
  const updateReadingStatus = (readingStatus: string, id: string) => {
    setIsLoading(true);
    api
      .put("/book", { id, readingStatus })
      .then(() => refetch())
      .finally(() => setIsLoading(false));
  };

  const createBook = async (args: CreateBookArgs) => {
    setIsLoading(true);
    api
      .post("book", args)
      .then(() => refetch())
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getRelatedBooks = async (isbn: string) => {
    setIsLoading(true);
    return api
      .post("/book/related", { isbn })
      .then((res) => res.data)
      .finally(() => {
        setIsLoading(false);
      });
  };
  const deleteBook = async (id: string) => {
    setIsLoading(true);
    return api
      .delete(`/book/${id}`)
      .then(() => {
        refetch();
        message.success("Book deleted successfully");
        navigate("/books");
      })
      .catch((err) => {
        console.error(err)
        message.error("Something went wrong, please try again later!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    updateIsFavorite,
    updateReadingStatus,
    updateRating,
    createBook,
    getRelatedBooks,
    isLoading,
    deleteBook,
  };
};
