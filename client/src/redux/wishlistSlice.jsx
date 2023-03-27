import { createSlice } from "@reduxjs/toolkit";

const localStorageData = () => {
  let localData = localStorage.getItem("wishlist");

  const parsedData = JSON.parse(localData);
  if (!Array.isArray(parsedData)) return [];

  return parsedData;
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: localStorageData(),
  },
  reducers: {
    addToWishlist: (state, action) => {
      state.wishlist.push(action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
    removeWishlist: (state, action) => {
      let updateWishlist = state.wishlist.filter(
        (item) => item._id !== action.payload
      );
      localStorage.setItem("wishlist", JSON.stringify(updateWishlist));
      state.wishlist = updateWishlist;
    },
  },
});

export const { addToWishlist, removeWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
