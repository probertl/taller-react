// components/DeleteProduct.jsx
import { useState } from "react";
import Error from "./Error";

const API_URL = import.meta.env.VITE_API_URL + "/productes";

export default function DeleteProduct({ productId, productName, onDeleted }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    const confirmat = window.confirm(
      `Segur que vols esborrar el producte "${productName}"?`
    );
    if (!confirmat) return;

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/${productId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        if (onDeleted) {
          onDeleted(productId, { type: 'error', text: "No s'ha pogut esborrar el producte." });
        }
        return;
      }

      // Avisem el pare (ProductsList, via Product) que aquest id ja està esborrat a la BD
      if (onDeleted) {
        onDeleted(productId, { type: 'success', text: "Producte esborrat correctament." });
      }
    } catch (err) {
      console.error("Error DELETE producte:", err);
      // Passem l'error al pare també
      if (onDeleted) {
        onDeleted(productId, { type: 'error', text: "No s'ha pogut esborrar el producte." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-inline-block">
        <button type="button" className="btn btn-outline-danger btn-sm"
            onClick={handleClick} disabled={loading}
        >
            {loading ? "Esborrant..." : "DEL"}
        </button>
    </div>
  );
}
