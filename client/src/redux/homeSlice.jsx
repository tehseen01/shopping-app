import { createSlice } from "@reduxjs/toolkit";
import { featureData } from "../hooks/useFetch";
import { STATUSES } from "./productsSlice";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    feature: [],
    status: STATUSES.IDLE,
    discount: [],
    categories: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(featureData.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(featureData.fulfilled, (state, action) => {
        state.discount = action.payload.filter((item) => item.discount >= 15);
        state.feature = action.payload.filter((item) => item.feature === true);
        state.categories = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(featureData.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default homeSlice.reducer;
