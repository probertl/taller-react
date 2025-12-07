import { useState } from "react";
import Error from "./Error";
import EditProduct from "./EditProduct";

const API_URL = import.meta.env.VITE_API_URL + "/productes";

// ara rep onProductUpdated per avisar el pare quan s'actualitza un producte
export default function Product({ product, onProductUpdated }) {
  const { id, name, brand, price, category } = product;

  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);

  // estat per controlar si estem en mode edició
  const [isEditing, setIsEditing] = useState(false);

  const handleToggle = async () => {
    // Si anem a obrir SHOW, tanquem EDIT
    if (!showDetails) {
      setIsEditing(false);

      // Carreguem detalls només la primera vegada
      if (!details) {
        try {
          setLoadingDetails(true);
          setErrorDetails(null);

          const res = await fetch(`${API_URL}/${id}`);
          if (!res.ok) {
            setErrorDetails("No s'han pogut carregar els detalls del producte.");
            return;
          }

          const data = await res.json();
          setDetails(data);
        } catch (err) {
          console.error("Ha donat un error buscant: ", err);
          setErrorDetails(err.message);
        } finally {
          setLoadingDetails(false);
        }
      }
    }

    // Fem toggle de SHOW
    setShowDetails((prev) => !prev);
  };

  // Quan obrim EDIT, tanquem SHOW
  const handleToggleEdit = () => {
    setIsEditing((prev) => {
      // el valor de next es el contrari de l'actual
      const next = !prev;

      if (next) {
        // Si obrim EDIT, tanquem la vista de detalls perquè no es solapen
        setShowDetails(false);
      } 
      return next;
    });
  };

  // dades del producte a editar
  const productForEdit = details || product;

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
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleToggle}
          >
            {showDetails ? "HIDE" : "SHOW"}
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleToggleEdit}
          >
            {isEditing ? "CANCEL·LAR" : "EDITAR"}
          </button>
        </div>
      </div>

      {/* Detalls només quan SHOW està obert i no estem editant */}
      {showDetails && !isEditing && (
        <div className="mt-3 border-top pt-2">
          {loadingDetails && (
            <div className="small text-muted">Carregant detalls...</div>
          )}

          {errorDetails && <Error textToShow={errorDetails} />}

          {!loadingDetails && !errorDetails && details && (
            <>
              <div className="small">
                <strong>Stock:</strong>
                {details.stock || "(sense stock)"} unitats
              </div>
              <div className="small">
                <strong>Procedència:</strong>
                {details.origin || "(sense procedència)"}
              </div>
              <div className="small">
                <strong>SKU:</strong> {details.sku || "(sense SKU)"}
              </div>
              <div className="small mt-1">
                <strong>Descripció:</strong>
                {details.description || "(sense descripció)"}
              </div>
            </>
          )}
        </div>
      )}

      {/* Formulari d'edició quan EDIT està obert */}
      {isEditing && (
        <div className="mt-3 border-top pt-2">
          <EditProduct
            product={productForEdit}
            onProductUpdated={onProductUpdated} // passem el handler del avi, que li hem pasat aquest pare, i ara al fill
          />
        </div>
      )}
    </div>
  );
}
