import { FC, useState } from "react";
import { Flex, Typography } from "antd";
import Loading from "./Loading";
import { useRecommendedBooks } from "../hooks/useRecommendedBooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

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

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Flex vertical style={{borderRadius: 20, marginTop: 80}}>
      <Title level={3}>Book Recommendations</Title>

      {recommendedBooks && (
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          style={{
            height: BOOK_SIZE,
            width: 140,
            paddingTop: 25,
            paddingBottom: 25,
          }}
        >
          {recommendedBooks.map((book) => (
            <SwiperSlide style={{ height: BOOK_SIZE }}>
              <img
                src={book.imageUrl}
                height={BOOK_SIZE}
                onClick={() => {
                  console.log("adding", book.title)
                  setSelectedBook(book);
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <BookModal book={selectedBook} onClose={()=>{setSelectedBook(undefined)}}/>
    </Flex>
  );
};

export default BookRecommendations;
