import { FC, useState } from "react";
import { Empty, Flex, Tooltip, Button } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import Loading from "./Loading";
import { useRecommendedBooks } from "../hooks/useRecommendedBooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import { IBook, useBook } from "../context/books-context";
import BookModal from "./BookModal";
import { Colors } from "../constants";

const emptyStateUrl = new URL("../../empty-state-v3.jpg", import.meta.url).href;

interface BookRecommendationsProps {}

const BOOK_SIZE = 200;

const BookRecommendations: FC<BookRecommendationsProps> = () => {
  const { recommendedBooks, isLoading, fetchMoreRecommendations } = useRecommendedBooks();
  const { myBooks } = useBook();
  const [selectedBook, setSelectedBook] = useState<IBook | undefined>(
    undefined
  );
  return (
    <Flex
      vertical
      style={{
        borderRadius: 20,
        minHeight: 300,
        position: "relative",
      }}
    >
      {!isLoading && myBooks.length > 5 && (
        <Flex
          justify="space-between"
          align="center"
          style={{ marginBottom: 16, position: "absolute", top: 20, right: 25 }}
        >
          <Tooltip title="Refresh Recommendations">
            <Button
              icon={<SyncOutlined />}
              onClick={fetchMoreRecommendations}
              type="text"
              style={{ color: Colors.primary }}
            />
          </Tooltip>
        </Flex>
      )}
      {isLoading ? (
        <Loading />
      ) : recommendedBooks.length > 0 ? (
        <Swiper
          effect={"cards"}
          key="recommended-swiper"
          grabCursor={true}
          modules={[EffectCards]}
          style={{
            height: BOOK_SIZE,
            width: 140,
            paddingBottom: 25,
          }}
        >
          {recommendedBooks?.reverse().map((book) => (
            <SwiperSlide style={{ height: BOOK_SIZE }} key={book.id}>
              <img
                key={`image-${book.id}`}
                src={book.imageUrl}
                height={BOOK_SIZE}
                onClick={() => {
                  console.log("adding", book.title);
                  setSelectedBook(book);
                }}
                style={{ cursor: "pointer" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Empty
          image={emptyStateUrl}
          description={
            myBooks.length < 5
              ? "Please add more books to get a recommendation"
              : "Please refresh to get more recommendations"
          }
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
