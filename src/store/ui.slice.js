import { createSlice } from "@reduxjs/toolkit";

const INITIAL_UI_STATE = {
  cartIsVisible: false,
};
const uiSlice = createSlice({
  name: "ui",
  initialState: INITIAL_UI_STATE,
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
  },
});
export const uiActions = uiSlice.actions;
export default uiSlice;
