import { MdHomeFilled } from "react-icons/md";
import { NavLink } from "react-router-dom";
import "./mobilenav.scss";
import { BsPerson, BsUiRadiosGrid, BsCart2, BsHeart } from "react-icons/bs";
import { useSelector } from "react-redux";

const MobileNav = () => {
  const { totalQuantity } = useSelector((state) => state.cart);

  return (
    <div className="mobileNav">
      <div>
        <NavLink to={"/"}>
          <MdHomeFilled />
        </NavLink>
      </div>
      <div>
        <NavLink to={"/products"}>
          <BsUiRadiosGrid />
        </NavLink>
      </div>
      <div className="cartIcon">
        <NavLink to={"/cart"}>
          <BsCart2 />
          {totalQuantity > 0 && <div>{totalQuantity}</div>}
        </NavLink>
      </div>
      <div>
        <NavLink to={"/wishlist"}>
          <BsHeart />
        </NavLink>
      </div>
      <div>
        <NavLink to={"/login"}>
          <BsPerson />
        </NavLink>
      </div>
    </div>
  );
};

export default MobileNav;
