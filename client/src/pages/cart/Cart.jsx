import "./cart.scss";
import { MdClose } from "react-icons/md";
import PriceFormat from "../../components/helper/PriceFormat";
import { useDispatch, useSelector } from "react-redux";
import { remove, total, inc, dec } from "../../redux/cartSlice";
import Counter from "../../components/counterBtn/Counter";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, totalPrice, shippingFee } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(total());
  }, [cart]);

  return (
    <div className="cartContainer">
      <div className="myCart">
        {cart.length === 0 ? (
          <div className="empty">your cart is empty</div>
        ) : (
          <div className="cartInfo">
            <section className="cartItems">
              {cart?.map((elm) => (
                <div key={elm?._id} className="item">
                  <figure>
                    <img src={elm?.img} alt={elm?.title} />
                  </figure>
                  <div className="itemInfo">
                    <h3 className="title">
                      <Link to={`/product/${elm?._id}`}>
                        {elm?.title?.slice(0, 42)}
                      </Link>
                    </h3>
                    <p className="cartCompany">{elm?.brand}</p>
                    <div className="itemPriceInfo">
                      <del className="oldPrice">
                        <PriceFormat price={elm?.oldPrice} />
                      </del>
                      <p className="price">
                        <PriceFormat price={elm?.price} />
                      </p>
                      <p className="cartDiscount">{elm?.discount}% off</p>
                    </div>
                    <div>
                      <Counter
                        dec={() => dispatch(dec(elm._id))}
                        inc={() => dispatch(inc(elm._id))}
                        quantity={elm?.quantity}
                        stock={cart?.stock}
                      />
                    </div>
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
            </section>
            <section className="cartSummary">
              <h2 className="summaryTitle">Cart Summary</h2>
              <dl>
                <div>
                  <dt>sub-total</dt>
                  <dd>
                    <PriceFormat price={totalPrice} />
                  </dd>
                </div>
                <div>
                  <dt>shipping-fee</dt>
                  <dd>
                    <PriceFormat price={shippingFee} />
                  </dd>
                </div>
                <div className="cartTotal">
                  <dt>total</dt>
                  <dd>
                    <PriceFormat price={totalPrice + shippingFee} />
                  </dd>
                </div>
              </dl>
              <div className="cartBtn">
                <Link to={"/checkout"} className="cartCheckoutBtn">
                  checkout
                </Link>
                <Link to={"/products"} className="continueBtn">
                  continue shopping
                </Link>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
