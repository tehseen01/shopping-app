import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./navbar.scss";
import MobileNav from "../mobileNav/MobileNav";
import BackButton from "../helper/BackButton";
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineSearch,
  AiOutlineHeart,
} from "react-icons/ai";
import { MdOutlineArrowBackIosNew, MdOutlineGridView } from "react-icons/md";
import { useRef, useState } from "react";
import useUnique from "../../hooks/useUnique";
import Search from "../searchItem/Search";

const Navbar = () => {
  const { category } = useUnique();
  const [catDropdown, setCatDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef(null);

  const { totalQuantity } = useSelector((state) => state.cart);

  const handelSearch = () => {
    setShowSearch(!showSearch);
    inputRef.current.focus();
  };

  return (
    <header>
      <nav className="nav-container">
        <BackButton />
        <div className="logo">
          <NavLink to={"/"}>
            <h1>codezon.</h1>
          </NavLink>
        </div>

        <div className="navCenter">
          <ul>
            <li className="categoryLi">
              <button onClick={() => setCatDropdown(!catDropdown)}>
                <MdOutlineGridView /> Categories
                <MdOutlineArrowBackIosNew
                  className="rotateArrow"
                  style={{
                    transform: `${
                      catDropdown ? "rotate(90deg)" : "rotate(-90deg)"
                    }`,
                  }}
                />
              </button>
              <div
                className="categoryDropdown"
                style={{ display: `${catDropdown ? "block" : "none"}` }}
              >
                {category.map((item, index) => (
                  <NavLink key={index} to={`/products/${item}`}>
                    <button onClick={() => setCatDropdown(!catDropdown)}>
                      {item}
                    </button>
                  </NavLink>
                ))}
              </div>
            </li>
            <li>
              <NavLink to={"/"}>home</NavLink>
            </li>
            <li>
              <NavLink to={"/products"}>store</NavLink>
            </li>
            <li>
              <NavLink to={"/contact"}>contact</NavLink>
            </li>
          </ul>
        </div>

        <div className="accountCart">
          <button className="search" onClick={handelSearch}>
            <AiOutlineSearch />
          </button>
          <NavLink to="/wishlist" className="wishlist">
            <AiOutlineHeart />
          </NavLink>
          <NavLink to="/login" className="account">
            <AiOutlineUser />
          </NavLink>
          <NavLink to={"/cart"} className="cart">
            <AiOutlineShoppingCart />
            {totalQuantity > 0 && <span>{totalQuantity}</span>}
          </NavLink>
        </div>
      </nav>

      <MobileNav />
      <Search
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        inputRef={inputRef}
      />
    </header>
  );
};

export default Navbar;
