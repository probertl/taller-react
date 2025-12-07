// components/AddProduct.jsx
import { useState } from "react";
import Error from "./Error";
import Success from "./Success";

const API_URL = import.meta.env.VITE_API_URL + "/productes";

const INITIAL_FORM = {
  name: "",
  price: 0,
  category: "",
  brand: "",
  stock: 0,
  origin: "",
  sku: "",
  description: ""
};
// onProductAdded és una funció que ens pot passar el component pare per
// avisar-lo quan s'ha afegit un producte nou
export default function AddProduct({ onProductAdded }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // canviar inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));

    // si l'usuari escriu, netegem missatges vells
    setError(null);
    setSuccess(null);
  };

  // netejar formulari
  const handleClear = () => {
    setForm(INITIAL_FORM);
    setError(null);
    setSuccess(null);
  };

  // condició per activar el botó "Afegir"
  const isFormValid =
    form.name.trim() !== "" &&
    form.category.trim() !== "" &&
    form.price !== "" &&
    !Number.isNaN(Number(form.price)) &&
    Number(form.price) > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // per si de cas, tornem a validar
    if (!isFormValid) {
      setError("Cal omplir nom, preu positiu i categoria.");
      return;
    }

    const formData = {
      name: form.name,
      price: Number(form.price),
      category: form.category,
      brand: form.brand || null,
      origin: form.origin || null,
      sku: form.sku || null,
      description: form.description || null,
      stock: Number(form.stock) || 0
    };

    try {
      setLoading(true);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error("Error creant el producte");
      }

      const saved = await res.json();

      // avisem el pare
      if (onProductAdded) {
        onProductAdded(saved);
      }

      setSuccess("Producte creat correctament.");
      setForm(INITIAL_FORM);
    } catch (err) {
      console.error("Error POST producte:", err);
      setError("No s'ha pogut crear el producte.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        {/* Botó per obrir/tancar formulari */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h2 className="h5 mb-0">Afegir nou producte</h2>
          <button
            type="button"
            className="btn btn-sm btn-outline-primary"
            onClick={() => setShowForm((prev) => !prev)}
          >
            {showForm ? "Tancar formulari" : "Nou producte +"}
          </button>
        </div>

        {error && <Error textToShow={error} />}
        {success && <Success textToShow={success} />}

        {showForm && (
          <form onSubmit={handleSubmit} className="row g-2 mt-2">
            {/* NAME (obligatori) */}
            <div className="col-md-4">
              <label className="form-label">Nom *</label>
              <input type="text" name="name" className="form-control" placeholder="Nom del producte"
                value={form.name} onChange={handleChange} required />
            </div>

            {/* PRICE (obligatori) */}
            <div className="col-md-2">
              <label className="form-label">Preu (€) *</label>
              <input type="number" name="price" className="form-control" placeholder="Ex: 19.99"
                value={form.price} onChange={handleChange}
                min="1" required />
            </div>

            {/* CATEGORY (obligatori) */}
            <div className="col-md-3">
              <label className="form-label">Categoria *</label>
              <input type="text" name="category" className="form-control" placeholder="perifèrics, àudio..."
                value={form.category} onChange={handleChange} required />
            </div>

            {/* BRAND (opcional) */}
            <div className="col-md-3">
              <label className="form-label">Marca (opcional)</label>
              <input type="text" name="brand" className="form-control" placeholder="Logitech, Sony..."
                value={form.brand} onChange={handleChange} />
            </div>

            {/* STOCK (opcional) */}
            <div className="col-md-2">
              <label className="form-label">Stock (opcional)</label>
              <input type="number" name="stock" className="form-control" placeholder="Ex: 10"
                value={form.stock} onChange={handleChange}/>
            </div>

            {/* ORIGIN (opcional) */}
            <div className="col-md-3">
              <label className="form-label">Procedència (opcional)</label>
              <input type="text" name="origin" className="form-control" placeholder="Alemanya, Japó..."
                value={form.origin} onChange={handleChange} />
            </div>

            {/* SKU (opcional) */}
            <div className="col-md-3">
              <label className="form-label">SKU (opcional)</label>
              <input type="text" name="sku" className="form-control" placeholder="Codi intern"
                value={form.sku} onChange={handleChange} />
            </div>

            {/* DESCRIPTION (opcional) */}
            <div className="col-12">
              <label className="form-label">Descripció (opcional)</label>
              <textarea name="description" className="form-control" rows="2" placeholder="Breu descripció del producte"
                value={form.description} onChange={handleChange} />
            </div>

            {/* BOTONS */}
            <div className="col-12 mt-2 d-flex gap-2">
              <button type="submit" className="btn btn-success"
                disabled={!isFormValid || loading}
              >
                {loading ? "Guardant..." : "Afegir producte"}
              </button>
              <button type="button" className="btn btn-outline-secondary" 
                onClick={handleClear} disabled={loading}>
                Netejar
              </button>
            </div>

            <div className="col-12 mt-1">
              <small className="text-muted">Els camps amb * són obligatoris.</small>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
