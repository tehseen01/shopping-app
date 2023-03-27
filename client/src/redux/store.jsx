import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import filterReducer from "./filterSlice";
import productReducer from "./productsSlice";
import wishlistReducer from "./wishlistSlice";
import homeSlice from "./homeSlice";

const reducers = combineReducers({
  cart: cartReducer,
  filter: filterReducer,
  products: productReducer,
  wishlist: wishlistReducer,
  home: homeSlice,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
