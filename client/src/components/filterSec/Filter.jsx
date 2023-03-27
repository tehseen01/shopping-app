import { useEffect, useState } from "react";
import "./filter.scss";
import PriceFormat from "../helper/PriceFormat";
import { useSelector } from "react-redux";
import useUnique from "../../hooks/useUnique";

const Filter = ({ setProductList }) => {
  const { products } = useSelector((state) => state.products);
  const { category, brands } = useUnique();

  const [com, setCom] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [price, setPrice] = useState(0);
  const [active, setActive] = useState(null);

  let priceArr = products.map((item) => item?.price);
  let maxPrice = Math.max(...priceArr);

  const updateCategory = (e) => {
    let value = e.target.value;
    setSelectedCategory(value);
    setActive(e.target.value);
  };

  const updateCompany = (e) => {
    let value = e.target.value;
    let checked = e.target.checked;

    setCom(checked ? [...com, value] : com.filter((item) => item !== value));
  };

  const updatePrice = (e) => {
    setPrice(e.target.value);
  };

  const handelUpdate = () => {
    let updatedValue = products;

    if (com.length) {
      updatedValue = updatedValue.filter((item) => com.includes(item.company));
    }

    if (selectedCategory !== "all" && selectedCategory.length) {
      updatedValue = updatedValue.filter(
        (item) => item?.category === selectedCategory
      );
    }

    if (price) {
      updatedValue = updatedValue.filter((item) => item?.price >= price);
    } else {
      updatedValue = updatedValue.filter((item) => item.price !== price);
    }

    setProductList(updatedValue);
  };

  useEffect(() => {
    handelUpdate();
  }, [com, selectedCategory, price]);

  return (
    <div className="filterItem">
      <div className="categoryFilter filter">
        <p className="filterTitle">categories</p>
        {category.map((category, index) => (
          <button
            key={index}
            value={category}
            name={category}
            onClick={updateCategory}
            className={`catBtn ${active === category ? "activeCategory" : ""}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="companyFilter filter">
        <p className="filterTitle">brands</p>
        {brands.map((company, index) => (
          <div className="companyFilterItem">
            <label htmlFor={index}>{company}</label>
            <input
              type="checkbox"
              id={index}
              value={company}
              onChange={updateCompany}
            />
          </div>
        ))}
      </div>
      <div className="priceFilter filter">
        <span className="filterTitle">filter by price</span>
        <p>
          <PriceFormat price={price} />
        </p>
        <input type="range" max={maxPrice} min={0} onInput={updatePrice} />
      </div>
    </div>
  );
};

export default Filter;
