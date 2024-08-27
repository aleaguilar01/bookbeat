import { useEffect, useState } from "react";
import { useApi } from "./useApi";

interface IBook {
  id: string;
  isbn: string;
  title: string;
  author: string;
  publishedYear?: string;
  imageUrl: string;
  isFavorite?: boolean;
  rating?: number;
  firstSentence: string;
  readingStatus: string;
  numberOfPages?: number;
  myRating?: number;
  comments?: number;
}

export const useMyBooks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Array<IBook>>([]);
  const api = useApi();
  const fetchData = async () => {
    api
      .get("/book")
      .then((res) => {
        setData(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  const updateRating = (myRating: number, id: string) => {
    setIsLoading(true);
    api
      .put("/book", { id, myRating })
      .then(() => refetch())
      .catch(() => {
        setIsLoading(false);
      });
  };
  const updateIsFavorite = (isFavorite: boolean, id: string) => {
    setIsLoading(true);
    api
      .put("/book", { id, isFavorite })
      .then(() => refetch())
      .catch(() => {
        setIsLoading(false);
      });
  };
  const updateReadingStatus = (readingStatus: string, id: string) => {
    setIsLoading(true);
    api
      .put("/book", { id, readingStatus })
      .then(() => refetch())
      .catch(() => {
        setIsLoading(false);
      });
  };

  return {
    data,
    isLoading,
    updateRating,
    updateIsFavorite,
    updateReadingStatus,
  };
};
