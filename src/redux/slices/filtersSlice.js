import { createSlice } from "@reduxjs/toolkit";
import { makeInitialStateOfUrlParams } from "../makeInitialStateOfUrlParams";

const haveParams = Boolean(window.location.search);

const initialState = haveParams
  ? makeInitialStateOfUrlParams(window.location.search)
  : {
      categoryIndex: 0,
      sortIndex: 0,
      searchQuery: "",
    };

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortIndex: (state, action) => {
      state.sortIndex = action.payload;
    },
    setCategoryIndex: (state, action) => {
      state.categoryIndex = action.payload;
    },
    setFilterParams: (state, action) => {
      state.categoryIndex =
        action.payload?.category === "*" || undefined
          ? 0
          : action.payload.category;
      state.sortIndex = action.payload.sortIndex;
      state.searchQuery = action.payload.search || "";
    },
  },
});

export const currentSearchValue = (state) => state.filters.searchQuery;
export const sortIndex = (state) => state.filters.sortIndex;
export const categoryIndex = (state) => state.filters.categoryIndex;

export const {
  setSearchValue,
  setSortIndex,
  setCategoryIndex,
  setFilterParams,
} = filtersSlice.actions;

export default filtersSlice.reducer;
