import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui.slice";

const INITIAL_CART_STATE = {
  items: [],
  totalQuantity: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_CART_STATE,
  reducers: {
    addItemToCart(state, action) {
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

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending",
        message: "Sending item to Cart",
      })
    );
    const sendRequest = async () => {
      const url =
        "https://task-form-project-default-rtdb.firebaseio.com/cart.json";
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(cart),
      });
      if (!response.ok) {
        throw new Error("Attempt to add item to cart failed!");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Item added to cart successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Attempt Failed",
          message: "Attempt to add item to cart Failed!",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice;
