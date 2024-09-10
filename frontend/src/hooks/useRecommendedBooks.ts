import { useEffect, useState } from "react";
import { useApi } from "./useApi";
import { IBook, useBook } from "../context/books-context";

export const useRecommendedBooks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { myBooks } = useBook();
  const [recommendedBooks, setRecommendedBooks] = useState<Array<IBook>>([]);
  const api = useApi();
  const fetchMoreRecommendations = () => {
    setIsLoading(true);
    api
      .post<any, {data: Array<IBook>}>("book/recommendations", [...recommendedBooks])
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const recommendations = res.data.filter((book) => !myBooks.find((myBook) => myBook.id === book.id));
          setRecommendedBooks(recommendations);
        }
      })
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    fetchMoreRecommendations();
  }, []);

  return {
    isLoading,
    recommendedBooks,
    fetchMoreRecommendations,
  };
};
