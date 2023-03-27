import "./productimage.scss";
import { useState } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper";

const ProductImage = ({ image }) => {
  const [itemImage, setItemImage] = useState([0]);
  const [showImg, setShowImg] = useState(0);

  const length = image?.img?.length - 6;

  return (
    <>
      <div className="imgSlideBox">
        <div className="imgUp">
          <button
            onClick={() => setShowImg(showImg - 1)}
            disabled={showImg <= 0}
          >
            <RiArrowDownSFill />
          </button>
        </div>
        <div className="imgSlide">
          <div
            className="listImg"
            style={{ transform: `translate3d(0,${-showImg * 80}px, 0)` }}
          >
            {image?.img?.map((image, index) => (
              <figure
                key={index}
                className={`${itemImage == index ? "active" : ""}`}
              >
                <img
                  src={image}
                  alt=""
                  onClick={() => setItemImage(index)}
                  onMouseEnter={() => setItemImage(index)}
                />
              </figure>
            ))}
          </div>
        </div>
        <div className="imgDown">
          <button
            onClick={() => setShowImg(showImg + 1)}
            disabled={showImg >= length}
          >
            <RiArrowDownSFill />
          </button>
        </div>
      </div>
      <div className="singleImg">
        <figure>
          <img src={image?.img?.[itemImage]} alt="" />
        </figure>
      </div>

      <Swiper
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {image?.img?.map((item, index) => (
          <SwiperSlide key={index} className="mySlide">
            <figure>
              <img src={item} alt="" />
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductImage;
