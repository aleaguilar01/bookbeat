// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./BookCarousel.styles.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
import BookCarouselEmpty from "./BookCarouselEmpty";
import { useBook } from "../context/books-context";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const BOOK_SIZE = 300;
const BookCarousel = () => {
  const { favoriteBooks, isLoading } = useBook();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />
  }
  if (!favoriteBooks || favoriteBooks.length === 0) {
    return <BookCarouselEmpty />;
  }
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
        style={{
          height: BOOK_SIZE+20,
          width: "100%",
          paddingTop: 25,
          paddingBottom: 25,
        }}
      >
        {favoriteBooks.map((book) => (
          <SwiperSlide
            onClick={() => navigate(`/books/${book.id}`)}
            key={book.id}
            style={{ height: BOOK_SIZE }}
          >
            <img src={book.imageUrl} style={{ height: BOOK_SIZE }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default BookCarousel;
