import PriceFormat from "../helper/PriceFormat";
import "./card.scss";
import { Link } from "react-router-dom";
import { addToWishlist } from "../../redux/wishlistSlice";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { BsStar } from "react-icons/bs";
import { useEffect } from "react";
import StarRating from "../helper/StarRating";

const Card = ({ item }) => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);

  useEffect(() => {}, [dispatch]);

  return (
    <div className="card">
      <Link to={`/product/${item._id}`}>
        <figure>
          <img src={item?.thumbnail} alt={item?.title} />
        </figure>
        {item.discount > 20 && (
          <div className="discount">-{item.discount}%</div>
        )}
        <div className="cardInfo">
          <p className="cardCompany">{item.company}</p>
          <p className="title">{item?.title.slice(0, 25)}</p>
          <div>
            {item?.stars && (
              <p className="cardRating">
                <StarRating stars={item?.stars} />(
                {item?.ratings.toLocaleString()})
              </p>
            )}
          </div>
          <div className="priceFormat">
            <p className="newPrice">
              <PriceFormat price={item?.price} />
            </p>
            <del className="oldPrice">
              {item?.oldPrice && <PriceFormat price={item?.oldPrice} />}
            </del>
          </div>
        </div>
      </Link>
      <div className="wishlist">
        <button onClick={() => dispatch(addToWishlist(item))}>
          {wishlist.find((i) => i._id === item._id) ? (
            <BsHeartFill />
          ) : (
            <BsHeart />
          )}
        </button>
      </div>
    </div>
  );
};

export default Card;
