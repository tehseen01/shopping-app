import { useDispatch, useSelector } from "react-redux";
import "./search.scss";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useEffect, Suspense } from "react";
import { searchFilter, setSearchText } from "../../redux/filterSlice";
import { MdOutlineArrowBackIosNew, MdClose } from "react-icons/md";
import Loader from "../loader";

const Search = ({ showSearch, setShowSearch, inputRef }) => {
  const dispatch = useDispatch();
  const { searchItems, searchText } = useSelector((state) => state.filter);

  const handelSearchInput = (e) => {
    dispatch(setSearchText(e.target.value));
  };

  const handelClear = () => {
    dispatch(setSearchText(""));
  };

  useEffect(() => {
    dispatch(searchFilter(searchText));
  }, [searchText, dispatch]);

  return (
    <>
      <div
        className={`searchModal ${showSearch ? "showSearchBase" : ""}`}
        role="button"
        onClick={() => setShowSearch(!showSearch)}
      >
        <div className="searchBase" onClick={(e) => e.stopPropagation()}>
          <div className="searchBaseContainer">
            <div className="searchBar">
              <div
                className="searchBackButton"
                onClick={() => setShowSearch(!showSearch)}
              >
                <MdOutlineArrowBackIosNew />
              </div>
              <div className="searchInput">
                <span>
                  <BsSearch />
                </span>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchText}
                  onChange={handelSearchInput}
                  ref={inputRef}
                />
                {searchText.length > 0 && (
                  <button onClick={handelClear}>
                    <MdClose />
                  </button>
                )}
              </div>
            </div>
            {searchText.length > 0 && (
              <div className="searchItems">
                <Suspense fallback={<Loader />}>
                  {searchItems.map((item) => (
                    <div key={item._id}>
                      <Link
                        to={`/product/${item._id}`}
                        onClick={() => setShowSearch(!showSearch)}
                      >
                        <p>{item.title}</p>
                      </Link>
                    </div>
                  ))}
                </Suspense>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
