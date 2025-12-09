import { setProductes, startLoading, removeProducte } from "./productesSlice";

const API_URL = "http://localhost:3000/products";

export const getProductes = () => {
  return async (dispatch, getState) => {
    dispatch(startLoading());
    
    const { limit } = getState().productes;
    const url = `${API_URL}?_limit=${limit}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch(setProductes(data));
    } catch (error) {
      console.error("Error fetching products:", error);
      dispatch(setProductes([]));
    }
  };
};

export const delProducte = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        dispatch(removeProducte(id));
      } else if (response.status === 404) {
        // El producte ja no existeix, l'eliminem de l'estat igualment
        dispatch(removeProducte(id));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
};
