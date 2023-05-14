import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemsPerPage: 3,
  pageCount: 0,
  itemOffset: 0,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setItemOffset: (state, action) => {
      state.itemOffset = action.payload;
    },
    setPageCount: (state, action) => {
      state.pageCount = action.payload;
    },
  },
});

export const { setItemOffset, setPageCount } = paginationSlice.actions;

export default paginationSlice.reducer;
