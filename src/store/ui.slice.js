import { createSlice } from "@reduxjs/toolkit";

const INITIAL_UI_STATE = {
  cartIsVisible: false,
  notification: null,
};
const uiSlice = createSlice({
  name: "ui",
  initialState: INITIAL_UI_STATE,
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    showNotification(state, action) {
      state.notification = {
        title: action.payload.title,
        message: action.payload.message,
        status: action.payload.status,
      };
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
