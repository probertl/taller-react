// components/EditProducte.jsx
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL + '/productes';

export default function EditProducte({ producte, onProducteUpdated, onCancel }) {
  const [form, setForm] = useState({
    name: producte.name,
    description: producte.description || "",
    price: producte.price,
    category: producte.category
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const isFormValid =
    form.name.trim() !== "" &&
    form.price !== "" &&
    form.category.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!isFormValid) {
      setError("Cal omplir nom, preu i categoria.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/${producte.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: producte.id,
          name: form.name,
          description: form.description,
          price: Number(form.price),
          category: form.category
        })
      });

      if (!res.ok) {
        throw new Error("Error actualitzant el producte");
      }

      const updated = await res.json();
      onProducteUpdated(updated);
    } catch (err) {
      console.error("Error PUT producte:", err);
      setError("No s'ha pogut actualitzar el producte.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-top pt-3 mt-2">
      <h6 className="mb-2">Editar producte</h6>

      {error && (
        <div className="alert alert-danger alert-sm" role="alert">
          {error}
        </div>
      )}

      <form className="row g-2" onSubmit={handleSubmit}>
        <div className="col-md-3">
          <label className="form-label small">Nom *</label>
          <input
            type="text"
            name="name"
            className="form-control form-control-sm"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3">
          <label className="form-label small">Categoria *</label>
          <input
            type="text"
            name="category"
            className="form-control form-control-sm"
            value={form.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-2">
          <label className="form-label small">Preu *</label>
          <input
            type="number"
            name="price"
            className="form-control form-control-sm"
            value={form.price}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label small">Descripció</label>
          <input
            type="text"
            name="description"
            className="form-control form-control-sm"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="col-12 mt-2 d-flex gap-2">
          <button
            type="submit"
            className="btn btn-sm btn-success"
            disabled={!isFormValid || loading}
          >
            {loading ? "Guardant..." : "Guardar canvis"}
          </button>

          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel·lar
          </button>
        </div>
      </form>
    </div>
  );
}
