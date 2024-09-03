import { useEffect, useState } from "react";
import { useApi } from "./useApi";
import { IBook } from "../context/books-context";

export const useRecommendedBooks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedBooks, setRecommendedBooks] = useState<Array<IBook>>([]);
  const api = useApi();
  const fetchMoreRecommendations = () => {
    setIsLoading(true);
    api
      .post("book/recommendations", [...recommendedBooks])
      .then((res) => {
        if (res.data) {
          setRecommendedBooks(res.data);
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
