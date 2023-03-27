import "./products.scss";
import Card from "../../components/card/Card";
import Filter from "../../components/filterSec/Filter";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BsSortDown } from "react-icons/bs";
import { BiFilterAlt } from "react-icons/bi";
import { BsArrowLeftShort } from "react-icons/bs";
import Sort from "../../components/sortSec/Sort";
import { useParams } from "react-router-dom";
import { fetchData } from "../../hooks/useFetch";
import Loader from "../../components/loader/index";

const Products = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);
  const [productList, setProductList] = useState(products);
  const [openFilter, setOpenFiler] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchData("?page=1"));
  }, []);

  useEffect(() => {
    if (id) {
      let filter = products.filter((item) => item.category === id);
      if (filter) {
        setProductList(filter);
      }
    }

    if (id === "all") {
      setProductList(products);
    }
  }, [id]);

  if (status === "loading") return <Loader />;
  if (status === "error")
    return <div className="centerLoading">something went wrong!</div>;

  return (
    <div className="productsPage">
      <div className={`filterSec ${openFilter ? "openFilter" : ""}`}>
        <div className="filterTop">
          <div className="filterBack">
            <button onClick={() => setOpenFiler(!openFilter)}>
              <BsArrowLeftShort />
            </button>
            Filter
          </div>
          <div className="clearFilter">
            <button>Clear Filter</button>
          </div>
        </div>
        <Filter setProductList={setProductList} />
      </div>
      <div className="sortSection">
        <div className="filterBtn">
          <button onClick={() => setOpenFiler(!openFilter)}>
            <BiFilterAlt /> Filter
          </button>
        </div>
        <div className="sortBtn">
          <button onClick={() => setOpenSort(!openSort)}>
            <BsSortDown /> Sort
          </button>
          {openSort && (
            <Sort
              setProductList={setProductList}
              setOpenSort={setOpenSort}
              openSort={openSort}
            />
          )}
        </div>
        <div className="productsCount"> {products.length}Products</div>
      </div>
      <div>
        <div className="products">
          {productList.map((item) => (
            <div key={item._id} className="product">
              <Card item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
