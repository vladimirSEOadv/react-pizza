import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    resetSearchValue: (state) => {
      state.value = "";
    },
    setSearchValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const searchValue = (state) => state.search.value;

export const { resetSearchValue, setSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
