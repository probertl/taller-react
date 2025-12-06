import { useState } from "react";
import Error from "./Error";

const API_URL = import.meta.env.VITE_API_URL + "/productes";

export default function Product({ product }) {
  const { id, name, brand, price, category } = product;

  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);
    
  const handleToggle = async () => {
    // Si encara no estaven oberts i no hem carregat detalls → fem la petició
    if (!showDetails && !details) {
      try {
        setLoadingDetails(true);
        setErrorDetails(null);
        const res = await fetch(`${API_URL}/${id}`);

        if (!res.ok) {
          setErrorDetails("No s'han pogut carregar els detalls del producte.");
        }

        const data = await res.json();
        setDetails(data);
      } catch (err) {
        console.error("Ha donat un error buscant: ",err);
        setErrorDetails(err.message);
      } finally {
        setLoadingDetails(false);
      }
    }

    // Toggle de SHOW/HIDE
    setShowDetails((prev) => !prev);
  };

  return (
    <div className="list-group-item">
      <div className="d-flex justify-content-between align-items-center">
        {/* Info principal */}
        <div>
          <div className="fw-semibold">
            Producte: {name || "(sense nom)"}
          </div>
          <div className="text-muted small">
            Preu: {price} € · Categoria: {category}
          </div>
          <div className="text-muted small">
            Marca: {brand || "(sense marca)"}
          </div>
        </div>

        {/* Botons acció */}
        <div className="btn-group btn-group-sm" role="group">
          <button type="button" className="btn btn-outline-primary"
            onClick={handleToggle} > 
            {showDetails ? "HIDE" : "SHOW"}
          </button>
        </div>
      </div>

      {/* Zona de detalls SHOW/HIDE */}
      {showDetails && (
        <div className="mt-3 border-top pt-2">
          {loadingDetails && (
            <div className="small text-muted">Carregant detalls...</div>
          )}

          {errorDetails && (
            <Error textToShow={errorDetails} />
          )}

          {/*Si NO esta carregant, Si no hi ha error i tenim detalls */}
          {!loadingDetails && !errorDetails && details && (
            <>
              <div className="small">
                <strong>Stock:</strong> {details.stock || "(sense stock)"} unitats  
              </div>
              <div className="small">
                <strong>Procedència:</strong> {details.origin || "(sense procedència)"}
              </div>
              <div className="small">
                <strong>SKU:</strong> {details.sku || "(sense SKU)"}
              </div>
              <div className="small mt-1">
                <strong>Descripció:</strong> {details.description || "(sense descripció)"}</div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
