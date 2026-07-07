import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import cartReducer from "./features/cartSlice";
import navbarReducer from "./features/navbarSlice";
import orderReducer from "./features/orderSlice";
import productsReducer from "./features/productsSlice";
import reviewsReducer from "./features/reviewsSlice";
import userReducer from "./features/userSlice";
import homeReducer from "./features/homeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    navbar: navbarReducer,
    order: orderReducer,
    products: productsReducer,
    reviews: reviewsReducer,
    user: userReducer,
    home: homeReducer,
  },
});
