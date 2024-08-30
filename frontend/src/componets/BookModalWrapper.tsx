import { FC } from "react";
import { useBook } from "../context/books-context";
import BookModal from "./BookModal";

interface BookDisplayModalProps {}
const BookModalWrapper: FC<BookDisplayModalProps> = ({}) => {
  const { currentBook, selectCurrentBook } = useBook();

  return (
    <BookModal
      book={currentBook}
      onClose={() => selectCurrentBook(undefined)}
      isReadOnly
    />
  );
};

export default BookModalWrapper;
