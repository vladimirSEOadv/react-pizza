import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  sortIndex: 0,
  categoryIndex: 0,
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    resetSearchValue: (state) => {
      state.searchQuery = "";
    },
    setSearchValue: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortIndex: (state, action) => {
      state.sortIndex = action.payload;
    },
    setCategoryIndex: (state, action) => {
      state.categoryIndex = action.payload;
    },
  },
});

export const currentSearchValue = (state) => state.filters.searchQuery;
export const sortIndex = (state) => state.filters.sortIndex;
export const categoryIndex = (state) => state.filters.categoryIndex;

export const {
  resetSearchValue,
  setSearchValue,
  setSortIndex,
  setCategoryIndex,
} = filtersSlice.actions;

export default filtersSlice.reducer;
