import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type paginationSliceTypes = {
  itemsPerPage: number;
  pageCount: number;
  itemOffset: number;
};

const initialState: paginationSliceTypes = {
  itemsPerPage: 3,
  pageCount: 0,
  itemOffset: 0,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setItemOffset: (state: RootState, action: PayloadAction<number>) => {
      state.itemOffset = action.payload;
    },
    setPageCount: (state: RootState, action: PayloadAction<number>) => {
      state.pageCount = action.payload;
    },
  },
});

export const { setItemOffset, setPageCount } = paginationSlice.actions;

export default paginationSlice.reducer;
