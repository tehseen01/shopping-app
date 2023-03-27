import { createSlice } from "@reduxjs/toolkit";

const localStorageData = () => {
  let localData = localStorage.getItem("myCart");

  const parsedData = JSON.parse(localData);
  if (!Array.isArray(parsedData)) return [];

  return parsedData;
};

const initialState = {
  cart: localStorageData(),
  totalPrice: "",
  totalQuantity: "",
  shippingFee: 99,
  inc: 0,
  dec: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { _id, quantity } = action.payload;
      let existingCart = state.cart.find((elm) => elm._id === _id);

      if (existingCart) {
        existingCart.quantity += quantity;
      } else {
        state.cart.push(action.payload);
        localStorage.setItem("myCart", JSON.stringify(state.cart));
      }
    },

    total: (state, action) => {
      const { totalPrice, totalQuantity } = state.cart.reduce(
        (sum, elm) => {
          let { price, quantity } = elm;
          sum.totalPrice += price * +quantity;
          sum.totalQuantity += +quantity;

          return sum;
        },
        { totalPrice: 0, totalQuantity: 0 }
      );
      state.totalPrice = totalPrice;
      state.totalQuantity = totalQuantity;
    },

    remove: (state, action) => {
      let updateFilter = state.cart.filter((elm) => elm._id !== action.payload);
      state.cart = updateFilter;

      localStorage.setItem("myCart", JSON.stringify(updateFilter));
    },

    inc: (state, action) => {
      let updateCart = state.cart.map((item) => {
        if (item._id === action.payload) {
          let quantity = item.quantity + 1;

          if (quantity >= item.stock) {
            quantity = item.stock;
          }

          return {
            ...item,
            quantity: quantity,
          };
        } else {
          return item;
        }
      });

      state.cart = updateCart;

      localStorage.setItem("myCart", JSON.stringify(updateCart));
    },

    dec: (state, action) => {
      let updateCart = state.cart.map((item) => {
        if (item._id === action.payload) {
          let quantity = item.quantity - 1;

          if (quantity <= 1) {
            quantity = 1;
          }

          return {
            ...item,
            quantity: quantity,
          };
        } else {
          return item;
        }
      });

      state.cart = updateCart;

      localStorage.setItem("myCart", JSON.stringify(updateCart));
    },
  },
});

export const { addToCart, remove, total, inc, dec } = cartSlice.actions;

export default cartSlice.reducer;
