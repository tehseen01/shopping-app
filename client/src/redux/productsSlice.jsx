import { createSlice } from "@reduxjs/toolkit";
import { fetchData, singleFetch } from "../hooks/useFetch";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    product: {},
    products: [],
    status: STATUSES.IDLE,
    recommended: [],
  },
  reducers: {
    handelCompany: (state, action) => {
      let value = action.payload;

      state.company = state.products;

      if (value) {
        state.company = state.products.filter((item) => item.company === value);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });

    builder
      .addCase(singleFetch.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(singleFetch.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.product = action.payload;

        state.recommended = state.products.filter(
          (item) => item.company === action.payload.company
        );
      })
      .addCase(singleFetch.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { handelCompany } = productsSlice.actions;
export default productsSlice.reducer;
