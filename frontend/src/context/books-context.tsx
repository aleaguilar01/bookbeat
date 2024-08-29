import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useApi } from "../hooks/useApi";

export interface IBook {
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

interface IBookContext {
  myBooks: Array<IBook>;
  favoriteBooks: Array<IBook>;
  isLoading: boolean;
  refetch: VoidFunction;
  currentBook?: IBook;
  selectCurrentBook: (bookId?: string) => void;
}

const BookContext = createContext<IBookContext>({
  myBooks: [],
  isLoading: false,
  refetch: () => {},
  favoriteBooks: [],
  currentBook: undefined,
  selectCurrentBook: () => {},
});

const BookProvider = ({ children }) => {
  const [currentBookId, setCurrentBookId] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [myBooks, setData] = useState<Array<IBook>>([]);

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

  const favoriteBooks = useMemo(() => {
    return myBooks.filter((book) => book.isFavorite && !!book.imageUrl);
  }, [myBooks]);

  const currentBook = useMemo(() => {
    if (!currentBookId) return undefined;
    return myBooks.find((book) => book.id === currentBookId);
  }, [currentBookId, myBooks])

  return (
    <BookContext.Provider
      value={{
        isLoading,
        myBooks,
        refetch,
        favoriteBooks,
        selectCurrentBook: (bookId?: string) => setCurrentBookId(bookId),
        currentBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
export const useBook = () => {
  return useContext(BookContext);
};

export default BookProvider;
