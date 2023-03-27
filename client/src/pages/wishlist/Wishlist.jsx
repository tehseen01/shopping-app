import "./wishlist.scss";
import { useSelector } from "react-redux";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeWishlist } from "../../redux/wishlistSlice";
import PriceFormat from "../../components/helper/PriceFormat";

const Wishlist = () => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  if (Object.keys(wishlist).length === 0) {
    return <div className="wishlistEmpty">Your wishlist is empty</div>;
  }

  return (
    <div className="wishlistContainer">
      {wishlist.map((item) => (
        <div key={item._id} className="wishlistItem">
          <div className="wishlistContent">
            <figure>
              <img src={item?.thumbnail} alt="" />
            </figure>
            <p>{item.title.slice(0, 30)}...</p>
            <div className="wishlistPrice">
              <p>
                <PriceFormat price={item.price} />
              </p>
              <del>
                <PriceFormat price={item.price} />
              </del>
            </div>
          </div>
          <div className="removeWishlist">
            <button onClick={() => dispatch(removeWishlist(item._id))}>
              <MdOutlineClose />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
