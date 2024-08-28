// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./BookCarousel.styles.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
import { useMyBooks } from "../hooks/useMyBooks";
import { useMemo } from "react";
import BookCarouselEmpty from "./BookCarouselEmpty";

const BookCarousel = () => {
  const { data } = useMyBooks();

  const filteredData = useMemo(() => {
    return data.filter((book) => book.isFavorite && !!book.imageUrl);
  }, [data]);

  if (!filteredData || filteredData.length === 0) {
    return <BookCarouselEmpty />
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
      >
        {filteredData.map((book) => (
          <SwiperSlide onClick={()=> console.log("BOOK", book.id)} key={book.id}>
            <img src={book.imageUrl} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default BookCarousel;
