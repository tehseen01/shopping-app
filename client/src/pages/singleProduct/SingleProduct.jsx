import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./singleProduct.scss";
import ProductImage from "../../components/productImage/ProductImage";
import PriceFormat from "../../components/helper/PriceFormat";
import AddToCart from "../../components/addToCart/addToCart";
import { singleFetch } from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import Recommended from "../../components/recommended/Recommended";
import { STATUSES } from "../../redux/productsSlice";
import { AiOutlineStar } from "react-icons/ai";
import { MdLocalOffer } from "react-icons/md";
import Loader from "../../components/loader";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, recommended, status } = useSelector(
    (state) => state.products
  );

  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    dispatch(singleFetch(`/${id}`));
  }, [dispatch]);

  if (status === STATUSES.LOADING) {
    return <Loader />;
  }

  if (status === STATUSES.ERROR) {
    return <h2>something went wrong!</h2>;
  }

  return (
    <div className="singleProduct">
      <div className="productInfo">
        <div className="productImage">
          <ProductImage image={product} />
        </div>

        {/* =====PRODUCT INFO====== */}

        <div className="productDetails">
          <h1 className="title">{product?.title}</h1>

          {product?.stars && (
            <p className="rating">
              <span>
                {product?.stars} <AiOutlineStar />
              </span>
              {product?.ratings} Ratings & reviews
            </p>
          )}

          <div className="price">
            <span className="mainPrice">
              <PriceFormat price={product?.price} />
            </span>
            <del>
              <PriceFormat price={product?.oldPrice} />
            </del>
          </div>
          <div className="discount">
            <span> You save: </span>{" "}
            <PriceFormat price={product?.oldPrice - product?.price} /> (
            {product?.discount}%)
          </div>

          <p className="company">
            <span>Brand:</span> {product?.company}
          </p>
          <p className="category">
            <span>Category:</span> {product?.category}
          </p>

          <p className="description">
            {!readMore ? product?.desc?.slice(0, 220) : product?.desc}
            <button onClick={() => setReadMore(!readMore)}>
              {!readMore ? "More..." : "Less..."}
            </button>
          </p>

          <hr />

          <AddToCart product={product} />
          <div className="offers">
            <p>Available offers</p>
            <ul>
              <li>
                <MdLocalOffer /> Bank OfferPay with UPI and Get ₹15 discountT&C
              </li>
              <li>
                <MdLocalOffer /> Bank Offer₹1500 Off On SBI Credit Card
                TransactionsT&C
              </li>
              <li>
                <MdLocalOffer /> Partner OfferBuy this product and get upto ₹500
                offKnow More
              </li>
              <li>
                <MdLocalOffer /> FreebieGet 200% Welcome Bonus upto ₹10000*T&C
              </li>
              <li>
                <MdLocalOffer /> Bank Offer5% Cashback on Flipkart Axis Bank
                CardT&C
              </li>
              <li>
                <MdLocalOffer />
                Partner OfferSign up for codezon and get codezon Gift Card worth
                up to ₹500*Know More
              </li>
            </ul>
          </div>
        </div>
      </div>

      {recommended.length && <Recommended />}
    </div>
  );
};

export default SingleProduct;
