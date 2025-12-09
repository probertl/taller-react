import { useState } from "react";
import Error from "./Error";

// Usar variable de entorno o fallback
const API_URL = "http://localhost:3000";

export default function Product({ product, onProductDeleted }) {
  const { id, title, price, category } = product;

  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);

  // Handler per mostrar/ocultar detalls i carregar-los si cal
  const handleToggle = async () => {
    if (!showDetails && !details) {
      try {
        setLoadingDetails(true);
        setErrorDetails(null);

        const res = await fetch(`${API_URL}/products/${id}`);

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Resposta no OK:", res.status, errorText);

          // Fallback: fem servir el producte que ja tenim
          setDetails(product);
          setErrorDetails(
            "No s'han pogut carregar els detalls del servidor. Mostrem dades locals."
          );
          return;
        }

        const data = await res.json();
        console.log("PETICIO CORRECTA", data);
        setDetails(data);
      } catch (err) {
        console.error("Ha donat un error buscant: ", err);
        setErrorDetails(
          err instanceof Error
            ? err.message
            : "No s'han pogut carregar els detalls del producte."
        );
      } finally {
        setLoadingDetails(false);
      }
    }

    setShowDetails((prev) => !prev);
  };

  // Handler per eliminar el producte (DELETE)
  const handleDelete = async () => {
    setErrorDetails(null);

    if (!window.confirm(`Segur que vols eliminar ${product.title}?`)) {
      return;
    }

    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Error DELETE:", res.status, text);
        setErrorDetails("Error eliminant producte");
        return;
      }

      // Avisem al pare que aquest producte s'ha eliminat
      onProductDeleted(id);
    } catch (err) {
      console.error("Error:", err);
      setErrorDetails("No s'ha pogut eliminar");
    }
  };

  return (
    <div className="list-group-item">
      <div className="d-flex justify-content-between align-items-center">
        {/* Info principal */}
        <div>
          <div className="fw-semibold">
            Producte: {title || "(sense nom)"}
          </div>
          <div className="text-muted small">
            Preu: {price} € · Categoria: {category}
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
            className="btn btn-outline-danger"
            onClick={handleDelete}
          >
            DELETE
          </button>
        </div>
      </div>

      {/* Zona de detalls SHOW/HIDE */}
      {showDetails && (
        <div className="mt-3 border-top pt-2">
          {loadingDetails && (
            <div className="small text-muted">Carregant detalls...</div>
          )}

          {errorDetails && <Error textToShow={errorDetails} />}

          {!loadingDetails && (details || product) && (
            <>
              <div className="small mt-1">
                <strong>Descripció:</strong>{" "}
                {(details?.description || product.description) ||
                  "(sense descripció)"}
              </div>

              {/* Imatges */}
              {(() => {
                const images = details?.images || product.images || [];

                return images.length > 0 ? (
                  <>
                    <h6>Imatges:</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${details?.title || product.title} ${
                            index + 1
                          }`}
                          width="200"
                          className="img-thumbnail"
                        />
                      ))}
                    </div>
                  </>
                ) : null;
              })()}
            </>
          )}
        </div>
      )}
    </div>
  );
}
