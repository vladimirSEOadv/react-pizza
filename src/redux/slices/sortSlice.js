import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const sortSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setPizza: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const pizzaValue = (state) => state.search.value;

export const { setPizza } = sortSlice.actions;

export default sortSlice.reducer;
