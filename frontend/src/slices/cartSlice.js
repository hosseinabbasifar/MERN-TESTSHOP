import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // The item to add to the cart
      const item = action.payload;

      // Check if the item is already in the cart
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        // If exists, update quantity
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? { ...x, qty: x.qty + item.qty } : x
        );
      } else {
        // If not exists, add new item to cartItems
        state.cartItems = [...state.cartItems, item];
      }
      // Update the cart state using the updateCart function
      return updateCart(state, item);
    },
    removeFromCart: (state, action) => {
      // Remove the item from cartItems
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
    resetCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
