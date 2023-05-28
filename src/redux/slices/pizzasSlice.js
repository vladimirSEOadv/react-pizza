import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  error: null,
  // loading | success | error | empty data in response | no results after filtering
  status: "loading",
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
  // extraReducers: {
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        if (action.payload.length === 0) {
          state.status = "empty data in response";
        } else {
          state.status = "success";
        }
      })
      .addCase(fetchPizzas.rejected, (state, error) => {
        state.items = [];
        const { name, message } = error["error"];
        state.error = {
          name,
          message,
        };
        console.error("fetchPizzas rejected", error);
        state.status = "error";
      });
  },
});

export const { setItems, setStatus } = pizzasSlice.actions;

export default pizzasSlice.reducer;
