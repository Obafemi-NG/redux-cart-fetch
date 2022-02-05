import { createSlice } from "@reduxjs/toolkit";

const INITIAL_CART_STATE = {
  items: [],
  totalQuantity: 0,
  changed: false,
};
const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_CART_STATE,
  reducers: {
    replaceCartItems(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
    },
    addItemToCart(state, action) {
      state.changed = true;
      state.totalQuantity++;
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          quantity: 1,
          totalPrice: newItem.price,
          price: newItem.price,
        });
      } else {
        existingItem.quantity = existingItem.quantity + 1;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      state.changed = true;
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
