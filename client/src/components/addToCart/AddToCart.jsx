import "./addtocart.scss";
import { useEffect, useState } from "react";
import { BsHeart, BsCartPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addToCart, total } from "../../redux/cartSlice";
import Counter from "../counterBtn/Counter";
import { useNavigate } from "react-router-dom";

const AddToCart = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const addCart = () => {
    dispatch(addToCart(obj));
    dispatch(total());
  };

  const buyNow = () => {
    let path = `/checkout`;
    navigate(path);
    dispatch(addToCart(obj));
    dispatch(total());
  };

  const inc = () => {
    setQuantity(quantity + 1);
  };

  const dec = () => {
    setQuantity(quantity - 1);
  };

  let obj = {
    img: product?.thumbnail,
    _id: product._id,
    title: product.title,
    price: product.price,
    stock: product.stock,
    brand: product.company,
    oldPrice: product.oldPrice,
    discount: product.discount,
    quantity,
  };

  return (
    <div>
      {/* ====BTN FOR INC & DEC==== */}
      <div className="setQuantityBox">
        <Counter
          quantity={quantity}
          inc={inc}
          dec={dec}
          stock={product?.stock}
        />
        {product?.stock < 5 && (
          <p className="stock">
            Only <span>{product?.stock} items</span> left don't miss it
          </p>
        )}
      </div>
      {/* ====ADD TO CART & BUY NOW==== */}
      <div className="cartBuy">
        <button className="addToCart" onClick={() => addCart()}>
          <BsCartPlus /> add to cart
        </button>

        <button className="buyNow" onClick={() => buyNow()}>
          buy now
        </button>
      </div>
    </div>
  );
};

export default AddToCart;
