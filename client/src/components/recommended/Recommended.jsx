import Card from "../card/Card";
import { Swiper, SwiperSlide } from "swiper/react";

import "./recommended.scss";
import "swiper/css";
import { useSelector } from "react-redux";

const Recommended = () => {
  const { recommended } = useSelector((state) => state.products);
  let width = window.innerWidth;

  let count =
    width <= 375
      ? 2
      : width <= 425
      ? 2.2
      : width <= 550
      ? 2.5
      : width <= 768
      ? 3.3
      : width <= 900
      ? 4
      : width <= 1200
      ? 4.5
      : 6.5;

  return (
    <div className="recommended">
      <div className="recomTitle">
        <p>Recommended for you</p>
      </div>
      <Swiper slidesPerView={count} spaceBetween={1}>
        {recommended.map((item) => (
          <SwiperSlide key={item._id}>
            <Card item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Recommended;
