import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  error: null,
  status: "loading", // loading | success | error | empty data in response | no results after filtering
};

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzasStatus",
  async (url) => {
    const { data } = await axios.get(url);
    return data;
  }
);

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      if (action.payload.length === 0) {
        state.status = "empty data in response";
      } else {
        state.status = "success";
      }
    },
    [fetchPizzas.rejected]: (state, error) => {
      state.items = [];
      state.error = { name: error.error.name, message: error.error.message };
      console.error("fetchPizzas rejected", error);
      state.status = "error";
    },
  },
});

export const { setItems, setStatus } = pizzasSlice.actions;

export default pizzasSlice.reducer;
