import { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './BookCarousel.styles.css';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

const BookCarousel = () => {
  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
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
        <SwiperSlide>
          <img src="https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_568,c_scale/jackets/9781408857878.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://writerinwhite.com/wp-content/uploads/2022/03/81zevnhdbdl.jpg?w=702" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://www.phantasiabooks.co.uk/cdn/shop/products/Untitled_1000x652px_1_1200x1200.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.ctfassets.net/usf1vwtuqyxm/6S51pK7uwnyhkS9Io9DsAn/320c162c5150f853b8d8568c4715dcef/English_Harry_Potter_7_Epub_9781781100264.jpg?w=914&q=70&fm=jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://assets.mycast.io/posters/iron-flame-fan-casting-poster-414682-large.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://m.media-amazon.com/images/I/81c9zivzkDL._AC_UF1000,1000_QL80_.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1673566810i/76707900.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1676979605i/76713323.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.booksense.com/images/101/636/9781619636101.jpg" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}


/* import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Card } from 'antd';

const { Meta } = Card;

const cardStyle = {
  width: 160
}
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 10
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 0 },
    items: 2
  },
};

const BookCarousel = () => {
  return <Carousel  responsive={responsive}>
    <Card
    hoverable
    style={cardStyle}
    cover={<img alt="example" src="https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_568,c_scale/jackets/9781408857878.jpg" />}
  >
    <Meta title="A court of thornes and roses" description="www.instagram.com" />
  </Card>
  <Card
    hoverable
    style={cardStyle}
    cover={<img alt="example" src="https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_568,c_scale/jackets/9781408857878.jpg" />}
  >
    <Meta title="A court of thornes and roses" description="www.instagram.com" />
  </Card>
  <Card
    hoverable
    style={cardStyle}
    cover={<img alt="example" src="https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_568,c_scale/jackets/9781408857878.jpg" />}
  >
    <Meta title="A court of thornes and roses" description="www.instagram.com" />
  </Card>
  <Card
    hoverable
    style={cardStyle}
    cover={<img alt="example" src="https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_568,c_scale/jackets/9781408857878.jpg" />}
  >
    <Meta title="A court of thornes and roses" description="www.instagram.com" />
  </Card>
  <Card
    hoverable
    style={cardStyle}
    cover={<img alt="example" src="https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_568,c_scale/jackets/9781408857878.jpg" />}
  >
    <Meta title="A court of thornes and roses" description="www.instagram.com" />
  </Card>
  <Card
    hoverable
    style={cardStyle}
    cover={<img alt="example" src="https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_568,c_scale/jackets/9781408857878.jpg" />}
  >
    <Meta title="A court of thornes and roses" description="www.instagram.com" />
  </Card>
  <Card
    hoverable
    style={cardStyle}
    cover={<img alt="example" src="https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_568,c_scale/jackets/9781408857878.jpg" />}
  >
    <Meta title="A court of thornes and roses" description="www.instagram.com" />
  </Card>
  <Card
    hoverable
    style={cardStyle}
    cover={<img alt="example" src="https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_568,c_scale/jackets/9781408857878.jpg" />}
  >
    <Meta title="A court of thornes and roses" description="www.instagram.com" />
  </Card>
  </Carousel>
} */

export default BookCarousel;