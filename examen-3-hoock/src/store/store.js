import { configureStore } from "@reduxjs/toolkit";
import productesReducer from "./productesSlice";

export const store = configureStore({
  reducer: {
    productes: productesReducer
  }
});
