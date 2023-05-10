import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  sortIndex: 0,
  categoryIndex: 0,
  pagination: {
    itemsPerPage: 6,
    pageCount: 0,
    itemOffset: 0,
  },
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchQuery = action.payload;
      state.pagination.itemOffset = 0;
    },
    setSortIndex: (state, action) => {
      state.sortIndex = action.payload;
      state.pagination.itemOffset = 0;
    },
    setCategoryIndex: (state, action) => {
      state.categoryIndex = action.payload;
      state.pagination.itemOffset = 0;
    },
    setItemOffset: (state, action) => {
      state.pagination.itemOffset = action.payload;
    },
    setPageCount: (state, action) => {
      state.pagination.pageCount = action.payload;
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
  setItemOffset,
  setPageCount,
} = filtersSlice.actions;

export default filtersSlice.reducer;
