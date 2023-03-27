import "./slider.scss";
import { slide1, slide2, slide3 } from "../../assets/images/imgImport";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/pagination";

const Slider = () => {
  // const slides = [slide1, slide2, slide3];

  const slides = [
    {
      id: 1,
      img: slide1,
      title: "xiaomi smart tv x series",
      span: "4k dolby vision",
      price: "From ₹26999.00",
    },
    {
      id: 2,
      img: slide2,
      title: "A great deal to love.",
      span: "watch se",
      price: "From ₹29900.00",
    },
    {
      id: 3,
      img: slide3,
      title: "Treat yourself to superior sound quality",
      span: "explore headphones",
    },
  ];

  return (
    <div className="slider-container">
      <div className="slider">
        <Swiper
          slidesPerView={1}
          navigation={true}
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true }}
          className="mySlide"
        >
          {slides.map((item) => (
            <SwiperSlide key={item.id} className="sliderSlide">
              <figure>
                <img src={item.img} alt={item.title} />
              </figure>
              <div className="slideContent">
                <h2>{item.title}</h2>
                <p className="span">{item.span}</p>
                <p className="price">{item.price}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
