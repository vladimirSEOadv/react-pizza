import { configureStore, Store } from "@reduxjs/toolkit";
import filters from "./slices/filtersSlice";
import pagination from "./slices/paginationSlice";
import cart from "./slices/cartSlice";
import pizzas from "./slices/pizzasSlice";

const store: Store = configureStore({
  reducer: {
    filters,
    pagination,
    cart,
    pizzas,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

export default store;
