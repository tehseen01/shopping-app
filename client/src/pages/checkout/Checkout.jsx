import { useDispatch, useSelector } from "react-redux";
import "./checkout.scss";
import PriceFormat from "../../components/helper/PriceFormat";
import Counter from "../../components/counterBtn/Counter";
import { useState } from "react";
import {
  MdClose,
  MdLocationOn,
  MdOutlineArrowBackIosNew,
} from "react-icons/md";
import { SiPaytm } from "react-icons/si";
import { remove, total } from "../../redux/cartSlice";

const Checkout = () => {
  const { cart, totalPrice, shippingFee } = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(1);
  const [toggleOn, setToggleOn] = useState(false);
  const [toggleOn2, setToggleOn2] = useState(false);

  const dispatch = useDispatch();

  return (
    <div className="checkout">
      <div className="checkoutLeft">
        <h1 className="checkoutTitle">Delivery Information</h1>
        <div className="toggleCheckout" onClick={() => setToggleOn(!toggleOn)}>
          <div className="toggleHide">
            <span className="locationIcon">
              <MdLocationOn />{" "}
            </span>
            <p style={{ visibility: `${toggleOn ? "hidden" : "visible"}` }}>
              Green Park, South Delhi<span>New Delhi, Delhi</span>
            </p>
          </div>
          <button
            className={`toggleBtnCheckout ${toggleOn ? "rotate" : ""}`}
            onClick={() => setToggleOn(!toggleOn)}
          >
            <MdOutlineArrowBackIosNew />
          </button>
        </div>
        <div className={`deliveryInformation ${toggleOn ? "show" : ""}`}>
          <form action="#" autoComplete="off">
            <label htmlFor="name">
              <p>Name</p>
              <input type="text" id="name" placeholder="John" />
            </label>
            <label htmlFor="email">
              <p>Email</p>
              <input type="text" placeholder="hello@gmail.com" id="email" />
            </label>
            <label htmlFor="mobile">
              <p>Mobile Number</p>
              <input type="text" id="mobile" placeholder="+919876543210" />
            </label>
            <label htmlFor="zip">
              <p>ZIP</p>
              <input type="text" name="zip" id="zip" placeholder="200101" />
            </label>
            <label htmlFor="state">
              <p>State</p>
              <input type="text" name="state" id="state" placeholder="Delhi" />
            </label>
            <label htmlFor="dist">
              <p>Dist</p>
              <input
                type="text"
                name="dist"
                id="dist"
                placeholder="New Delhi"
              />
            </label>
            <label htmlFor="address">
              <p>Address</p>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="2432 Xyz street"
              />
            </label>
          </form>
        </div>
        <h2 className="checkoutTitle">Payment Method</h2>
        <div
          className="toggleCheckout"
          onClick={() => setToggleOn2(!toggleOn2)}
        >
          <div className="toggleHide">
            <span className="locationIcon">
              <SiPaytm />{" "}
            </span>
            <p style={{ visibility: `${toggleOn2 ? "hidden" : "visible"}` }}>
              Master Card<span>******9876</span>
            </p>
          </div>
          <button
            className={`toggleBtnCheckout ${toggleOn2 ? "rotate" : ""}`}
            onClick={() => setToggleOn2(!toggleOn2)}
          >
            <MdOutlineArrowBackIosNew />
          </button>
        </div>
        <div className={`paymentMethod ${toggleOn2 ? "showPayment" : ""}`}>
          <label htmlFor="payment">
            <input type="radio" name="payment" id="payment" />
            Online Payment
          </label>
          <label htmlFor="payment">
            <input type="radio" name="payment" id="payment" />
            Cash On Delivery
          </label>
        </div>
      </div>
      <div className="checkoutRight">
        <div className="checkoutItem">
          {cart.map((elm) => (
            <div key={elm._id} className="item">
              <div className="itemLeft">
                <figure>
                  <img src={elm.img} alt={elm.title} />
                </figure>
                <div className="itemInfo">
                  <p className="title">{elm.title}</p>
                  <p className="itemBrand">{elm?.brand}</p>
                  <span>x{elm.quantity}</span>
                </div>
              </div>
              <div className="itemRight">
                <p className="price">
                  <PriceFormat price={elm.price} />
                </p>
                <button
                  className="removeBtn"
                  onClick={() => {
                    dispatch(remove(elm?._id)), dispatch(total());
                  }}
                >
                  <MdClose />
                </button>
              </div>
            </div>
          ))}

          <ul className="priceSummery">
            <li>
              <span>Subtotal </span>
              <span>
                <PriceFormat price={totalPrice} />
              </span>
            </li>
            <li>
              <span>Shipping </span>
              <span>
                <PriceFormat price={shippingFee} />
              </span>
            </li>
            <li>
              <p>Total </p>
              <p>
                <PriceFormat price={totalPrice + shippingFee} />
              </p>
            </li>
            <button className="confirmOrder">Confirm Order</button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
