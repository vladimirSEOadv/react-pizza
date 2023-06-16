import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CartVariant {
  size: number;
  type: string;
  count: number;
  price: number;
}

interface CartItem {
  name: string;
  imageUrl: string;
  variants: CartVariant[];
}

interface CartState {
  items: { [key: string]: CartItem };
  totalPrice: number;
  itemsCountInCart: number;
}

export type AddedToCartVariantTypes = Pick<
  CartVariant,
  "size" | "type" | "price"
>;

export interface AddItemPayload {
  id: number;
  name: string;
  imageUrl: string;
  variant: AddedToCartVariantTypes;
}

interface DeleteItemPayload {
  id: string;
  size: number;
  type: string;
}

export interface ChangeCountPayload {
  id: string;
  size: number;
  type: string;
  changeType: string;
}

const initialState: CartState = {
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
    addItem: (state: CartState, action: PayloadAction<AddItemPayload>) => {
      const { variant: newVariant, id: newVariantId } = action.payload;
      const isProductIdExist = state?.items[newVariantId];
      if (isProductIdExist) {
        const isVariantExist = state.items[newVariantId].variants.findIndex(
          (variant) =>
            variant.size === newVariant.size && variant.type === newVariant.type
        );
        if (isVariantExist === -1) {
          const variantWithCount = { ...newVariant, count: 1 };
          state.items[newVariantId].variants.push(variantWithCount);
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
    clearCart: (state: CartState) => {
      state.items = {};
      state.totalPrice = 0;
      state.itemsCountInCart = 0;
    },
    changeCountOfItemInCart: (
      state: CartState,
      action: PayloadAction<ChangeCountPayload>
    ) => {
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
    deleteItemInCart: (
      state: CartState,
      action: PayloadAction<DeleteItemPayload>
    ) => {
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

export const cartItems = (state: RootState) => state.cart.items;
export const totalPrice = (state: RootState) => state.cart.totalPrice;
export const numberOfItemsInCart = (state: RootState) =>
  state.cart.itemsCountInCart;

export const { addItem, clearCart, changeCountOfItemInCart, deleteItemInCart } =
  cartSlice.actions;

export default cartSlice.reducer;
