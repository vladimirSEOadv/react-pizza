import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { makeInitialStateOfUrlParams } from "../makeInitialStateOfUrlParams";
import { RootState } from "../store";

const haveParams: boolean = Boolean(window.location.search);

export type FiltersSliceTypes = {
  categoryIndex: number;
  sortIndex: number;
  searchQuery: string;
};

const initialState: FiltersSliceTypes = haveParams
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
    setSearchValue: (
      state: FiltersSliceTypes,
      action: PayloadAction<string>
    ) => {
      state.searchQuery = action.payload;
    },
    setSortIndex: (state: FiltersSliceTypes, action: PayloadAction<number>) => {
      state.sortIndex = action.payload;
    },
    setCategoryIndex: (
      state: FiltersSliceTypes,
      action: PayloadAction<number>
    ) => {
      state.categoryIndex = action.payload;
    },
  },
});

export const selectSortIndex = (state: RootState): number =>
  state.filters.sortIndex;
export const selectCategoryIndex = (state: RootState): number =>
  state.filters.categoryIndex;

export const { setSearchValue, setSortIndex, setCategoryIndex } =
  filtersSlice.actions;

export default filtersSlice.reducer;
