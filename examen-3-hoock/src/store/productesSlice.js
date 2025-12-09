import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productes: [],
  isLoading: false,
  limit: 1000
};

const productesSlice = createSlice({
  name: "productes",
  initialState,
  reducers: {
    setProductes: (state, action) => {
      state.productes = action.payload;
      state.isLoading = false;
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    removeProducte: (state, action) => {
      state.productes = state.productes.filter((p) => p.id !== action.payload);
    }
  }
});

export const { setProductes, startLoading, setLimit, removeProducte } = productesSlice.actions;
export default productesSlice.reducer;
