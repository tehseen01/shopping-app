import "./feature.scss";
import { STATUSES } from "../../redux/productsSlice";
import Card from "../card/Card";
import Loader from "../loader";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Navigation } from "swiper";

const Feature = ({ listItem, status, heading }) => {
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

  if (status === STATUSES.LOADING) {
    return <Loader />;
  }

  if (status === STATUSES.ERROR) {
    return <h2>something went wrong!</h2>;
  }

  return (
    <div className="featureProduct">
      <div className="featureContainer">
        <Swiper
          slidesPerView={count}
          navigation={true}
          modules={[Navigation]}
          className="featureSlide"
        >
          <div className="featureHeading heading">{heading}</div>
          {listItem.map((item) => (
            <SwiperSlide key={item._id} className="product">
              <Card item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Feature;
