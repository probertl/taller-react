// components/DeleteSupermercat.jsx
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL + "/supermercats";

export default function DeleteSupermercat({ supermercatId, supermercatNom, onDeleted }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    const confirmat = window.confirm(
      `Segur que vols esborrar el supermercat "${supermercatNom}"?`
    );
    if (!confirmat) return;

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/${supermercatId}`, {
        method: "DELETE"
      });

      if (!res.ok) {
        if (onDeleted) {
          onDeleted(supermercatId, { type: 'error', text: "No s'ha pogut esborrar el supermercat." });
        }
        return;
      }

      if (onDeleted) {
        onDeleted(supermercatId, { type: 'success', text: "Supermercat esborrat correctament." });
      }
    } catch (err) {
      console.error("Error DELETE supermercat:", err);
      if (onDeleted) {
        onDeleted(supermercatId, { type: 'error', text: "No s'ha pogut esborrar el supermercat." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      className="btn btn-outline-danger btn-sm"
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? "Esborrant..." : "DEL"}
    </button>
  );
}
