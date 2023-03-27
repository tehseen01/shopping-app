import { createSlice } from "@reduxjs/toolkit";
import { featureData } from "../hooks/useFetch";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    allProducts: [],
    searchItems: [],
    searchText: "",
  },
  reducers: {
    searchFilter: (state, action) => {
      state.searchItems = state.allProducts.filter((item) => {
        return item.title.toLowerCase().includes(state.searchText);
      });
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(featureData.fulfilled, (state, action) => {
      state.allProducts = action.payload;
      state.filterProducts = action.payload;
    });
  },
});

export const { searchFilter, setSearchText } = filterSlice.actions;
export default filterSlice.reducer;
