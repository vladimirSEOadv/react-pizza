import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "../store";

export type Pizza = {
  id: number;
  imageUrl: string;
  name: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

type ErrorTypes = {
  name: string;
  message: string;
};

type PizzasSliceTypes = {
  items: Pizza[];
  error: null | ErrorTypes;
  status: string;
};

const initialState: PizzasSliceTypes = {
  items: [],
  error: null,
  status: "loading",
};

export const fetchPizzas = createAsyncThunk<
  Pizza[],
  string,
  { rejectValue: AxiosError<{ error: ErrorTypes }> }
>("pizzas/fetchPizzasStatus", async (url: string) => {
  const { data } = await axios.get(url);
  return data;
});

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems: (state: PizzasSliceTypes, action: PayloadAction<Pizza[]>) => {
      state.items = action.payload;
    },
    setStatus: (state: PizzasSliceTypes, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state: PizzasSliceTypes) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(
        fetchPizzas.fulfilled,
        (state: PizzasSliceTypes, action: PayloadAction<Pizza[]>) => {
          state.items = action.payload;
          if (action.payload.length === 0) {
            state.status = "empty data in response";
          } else {
            state.status = "success";
          }
        }
      )
      .addCase(
        fetchPizzas.rejected,
        (state: PizzasSliceTypes, action: PayloadAction<any>) => {
          state.status = "error";
          state.items = [];
          const { name, message } = action.payload;
          state.error = {
            name,
            message,
          };
          console.error("fetchPizzas rejected", action);
        }
      );
  },
});

export const filteredByCategory =
  (category: number) =>
  (state: RootState): Pizza[] => {
    if (category === 0) {
      return state.pizzas.items;
    } else {
      return state.pizzas.items.filter(
        (pizza: Pizza) => pizza.category === category
      );
    }
  };

export const { setItems, setStatus } = pizzasSlice.actions;

export default pizzasSlice.reducer;
