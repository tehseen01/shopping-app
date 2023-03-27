import "./sort.scss";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Sort = ({ setOpenSort, openSort, setProductList }) => {
  const { allProducts } = useSelector((state) => state.filter);
  const handelParentClose = (e) => {
    if (e.target === e.currentTarget) {
      setOpenSort(!openSort);
    }
  };

  const handelSort = (e) => {
    let value = e.target.value;
    let newSortValue;
    let sortValue = [...allProducts];

    const updateSort = (a, b) => {
      if (value === "low") {
        return a.price - b.price;
      }

      if (value === "high") {
        return b.price - a.price;
      }

      if (value === "az") {
        return a.title.localeCompare(b.title);
      }

      if (value === "za") {
        return b.title.localeCompare(a.title);
      }
    };

    newSortValue = sortValue.sort(updateSort);

    setProductList(newSortValue);
  };

  return (
    <div className="sortContainer" onClick={handelParentClose}>
      <div className="sortItem">
        <div className="sortTitle">
          <span>Sort by</span>
          <button onClick={() => setOpenSort(!openSort)}>
            <IoMdClose />
          </button>
        </div>
        <div className="sorts">
          <div>
            <label htmlFor="low">Price -- Low to Hight</label>
            <input
              type="radio"
              name="sort"
              id="low"
              value="low"
              onChange={handelSort}
            />
          </div>
          <div>
            <label htmlFor="high">Price -- Hight to Low</label>
            <input
              type="radio"
              name="sort"
              id="high"
              value="high"
              onChange={handelSort}
            />
          </div>
          <div>
            <label htmlFor="az">Product -- A to Z</label>
            <input
              type="radio"
              name="sort"
              id="az"
              value="az"
              onChange={handelSort}
            />
          </div>
          <div>
            <label htmlFor="za">Product -- Z to A</label>
            <input
              type="radio"
              name="sort"
              id="za"
              value="za"
              onChange={handelSort}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sort;
