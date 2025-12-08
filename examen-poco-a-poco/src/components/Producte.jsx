// components/Producte.jsx
import { useState } from "react";
import EditProducte from "./EditProducte";

export default function Producte({ producte, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    if (window.confirm(`Esborrar ${producte.name}?`)) {
      onDelete(producte.id);
    }
  };

  const handleUpdate = (updated) => {
    onUpdate(updated);
    setIsEditing(false);
  };

  return (
    <div className="list-group-item">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <strong>{producte.name}</strong> - {producte.price}€
          <small className="text-muted ms-2">({producte.category})</small>
          {producte.description && (
            <div className="small text-muted">{producte.description}</div>
          )}
        </div>
        <div className="btn-group btn-group-sm">
          <button
            className="btn btn-outline-secondary"
            onClick={() => setIsEditing(!isEditing)}
          >
            <i className="bi bi-pencil"></i>
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={handleDelete}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>

      {isEditing && (
        <EditProducte
          producte={producte}
          onProducteUpdated={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}
