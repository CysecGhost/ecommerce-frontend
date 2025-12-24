import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage
const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {},
  paymentMethod: localStorage.getItem("paymentMethod")
    ? localStorage.getItem("paymentMethod")
    : "PayPal",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { _id, qty, mode } = action.payload;

      const existItem = state.cartItems.find((x) => x._id === _id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === _id
            ? { ...x, qty: mode === "increment" ? x.qty + qty : qty }
            : x
        );
      } else {
        state.cartItems.push({ ...action.payload });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state, action) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("paymentMethod", action.payload);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  saveShippingAddress,
  savePaymentMethod,
} = cartSlice.actions;
export default cartSlice.reducer;
