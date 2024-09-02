import { FC, useState } from "react";
import { Empty, Flex, Typography } from "antd";
import Loading from "./Loading";
import { useRecommendedBooks } from "../hooks/useRecommendedBooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
const emptyStateUrl = new URL("../../empty-state-v3.jpg", import.meta.url).href;

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import { IBook } from "../context/books-context";
import BookModal from "./BookModal";

const { Title } = Typography;
interface BookRecommendationsProps {}

const BOOK_SIZE = 200;
const BookRecommendations: FC<BookRecommendationsProps> = () => {
  const { recommendedBooks, isLoading } = useRecommendedBooks();
  const [selectedBook, setSelectedBook] = useState<IBook>(undefined);

  return (
    <Flex
      vertical
      style={{
        borderRadius: 20,
        marginTop: 80,
        minHeight: 300,
        position: "relative",
      }}
    >
      <Title level={3}>Book Recommendations</Title>
      {isLoading && <Loading />}
      {recommendedBooks.length > 0 ? (
        <Swiper
          effect={"cards"}
          key="recommended-swiper"
          grabCursor={true}
          modules={[EffectCards]}
          style={{
            height: BOOK_SIZE,
            width: 140,
            paddingTop: 25,
            paddingBottom: 25,
          }}
        >
          {recommendedBooks?.map((book) => (
            <SwiperSlide style={{ height: BOOK_SIZE }} key={book.id}>
              <img
                key={`image-${book.id}`}
                src={book.imageUrl}
                height={BOOK_SIZE}
                onClick={() => {
                  console.log("adding", book.title);
                  setSelectedBook(book);
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Empty
          image={emptyStateUrl}
          description="Please add more books to get a recommendation"
        />
      )}
      <BookModal
        book={selectedBook}
        onClose={() => {
          setSelectedBook(undefined);
        }}
      />
    </Flex>
  );
};

export default BookRecommendations;
