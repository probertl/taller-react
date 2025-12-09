import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductes } from "../store/thunks";
import ProductMenu from "./ProductMenu";
import ProductList from "./ProductList";

export default function ProductsList() {
  const dispatch = useDispatch();
  const { productes, isLoading } = useSelector((state) => state.productes);

  useEffect(() => {
    dispatch(getProductes());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <ProductMenu />
      
      {isLoading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregant...</span>
          </div>
          <p className="mt-2">Carregant productes...</p>
        </div>
      )}

      {!isLoading && productes.length === 0 && (
        <p className="text-muted">No hi ha productes</p>
      )}

      {!isLoading && productes.length > 0 && (
        <div>
          {productes.map((producte) => (
            <ProductList key={producte.id} producte={producte} />
          ))}
        </div>
      )}
    </div>
  );
}
