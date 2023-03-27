import "./categories.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Categories = () => {
  const { categories } = useSelector((state) => state.home);

  const groupBy = (arr, property) => {
    return arr.reduce((acc, cur) => {
      acc[cur[property]] = [...(acc[cur[property]] || []), cur];
      return acc;
    }, {});
  };

  const catList = Object.entries(groupBy(categories, "category"));

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
    <div className="homeCatContainer">
      <div className="categoryHeading heading">Top categories</div>
      <Swiper
        slidesPerView={count}
        spaceBetween={25}
        className="categorySwiper"
      >
        {catList?.map((item) => (
          <SwiperSlide key={item[0]} className="categorySlide">
            <Link to={`/products/${item[0]}`} className="categoryGrid">
              <figure>
                <img src={item[1][0]?.thumbnail} alt={item[1][0].title} />
              </figure>
              <p>{item[0]}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Categories;
