import { configureStore } from "@reduxjs/toolkit";
import filters from "./slices/filtersSlice";
import pagination from "./slices/paginationSlice";
import cart from "./slices/cartSlice";
import pizzas from "./slices/pizzasSlice";

export const store = configureStore({
  reducer: {
    filters,
    pagination,
    cart,
    pizzas,
  },
});
