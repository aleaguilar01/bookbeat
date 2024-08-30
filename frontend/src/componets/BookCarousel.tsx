// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Image } from "antd"

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

const BookCarousel = () => {
  const { favoriteBooks, isLoading, selectCurrentBook } = useBook();

  if (isLoading) {
    return <Loading />
  }
  if (!favoriteBooks || favoriteBooks.length === 0) {
    return <BookCarouselEmpty />;
  }
  return (
    <>
      <Swiper
        height={80}
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
      >
        {favoriteBooks.map((book) => (
          <SwiperSlide
            onClick={() => selectCurrentBook(book.id)}
            key={book.id}
          >
            <img src={book.imageUrl} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default BookCarousel;
