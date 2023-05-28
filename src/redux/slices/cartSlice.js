import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // items: {
  //   7: {
  //     name: "Маргарита",
  //     imageUrl:
  //       "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg",
  //     variants: [
  //       { size: 26, type: 'тонкое', count: 1 price: 450 },
  //       { size: 30, type: 'тонкое', count: 1 rice: 450 },
  //       { size: 30, type: 'традиционное', count: 1 rice: 450 },
  //     ],
  //   },
  // },
  items: {},
  totalPrice: 0,
  itemsCountInCart: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newVariant = action.payload.variant;
      const newVariantId = action.payload.id;
      const isProductIdExist = state?.items[newVariantId];
      if (isProductIdExist) {
        const isVariantExist = state.items[newVariantId].variants.findIndex(
          (variant) =>
            variant.size === newVariant.size && variant.type === newVariant.type
        );
        if (isVariantExist === -1) {
          newVariant.count = 1;
          state.items[newVariantId].variants.push(newVariant);
        } else {
          state.items[newVariantId].variants[isVariantExist].count += 1;
        }
      } else {
        state.items[newVariantId] = {
          name: action.payload.name,
          imageUrl: action.payload.imageUrl,
          variants: [{ ...newVariant, count: 1 }],
        };
      }
      state.totalPrice += newVariant.price;
      state.itemsCountInCart += 1;
    },
    clearCart: (state) => {
      state.items = {};
      state.totalPrice = 0;
      state.itemsCountInCart = 0;
    },
    changeCountOfItemInCart: (state, action) => {
      const { id, size, type, changeType } = action.payload;
      const index = state.items[id].variants.findIndex((variant) => {
        return variant["size"] === size && variant["type"] === type;
      });
      if (index === -1) {
        throw new Error("id in changeCountOfItemInCart action now found");
      }

      switch (changeType) {
        case "increment":
          state.items[id].variants[index].count++;
          state.itemsCountInCart++;
          state.totalPrice += state.items[id].variants[index].price;
          break;
        case "decrement":
          state.items[id].variants[index].count--;
          state.itemsCountInCart--;
          state.totalPrice -= state.items[id].variants[index].price;
          break;
        default:
          console.log("unknown changeType in changeCountOfItemInCart action");
          break;
      }
    },
    deleteItemInCart: (state, action) => {
      const { id, size, type } = action.payload;
      const index = state.items[id].variants.findIndex((variant) => {
        return variant["size"] === size && variant["type"] === type;
      });
      if (index === -1) {
        throw new Error("id in deleteItemInCart action now found");
      }
      const { price, count } = state.items[id].variants[index];
      state.items[id].variants.splice(index, 1);
      state.itemsCountInCart -= count;
      state.totalPrice -= price * count;
    },
  },
});

export const cartItems = (state) => state.cart.items;
export const totalPrice = (state) => state.cart.totalPrice;
export const numberOfItemsInCart = (state) => state.cart.itemsCountInCart;

export const { addItem, clearCart, changeCountOfItemInCart, deleteItemInCart } =
  cartSlice.actions;

export default cartSlice.reducer;
