// components/EditProduct.jsx
import { useState } from "react";
import Error from "./Error";
import Success from "./Success";



const API_URL = import.meta.env.VITE_API_URL + "/productes"; // canvia VITE_API_URL per apuntar al teu backend


export default function EditProduct({ product, onProductUpdated }) { // rep el producte seleccionat i el callback del pare
  // inicialitzem el formulari amb les dades actuals que se li ha pasat per props
  const INITIAL_EDIT_FORM = {
    name: product.name,
    price: product.price,
    category: product.category,
    brand: product.brand || "",
    stock: product.stock || 0,
    origin: product.origin || "",
    sku: product.sku || "",
    description: product.description || ""
    };

  const [form, setForm] = useState(INITIAL_EDIT_FORM); // stat local amb els camps del formulari
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => { // actualitza el camp editat i neteja missatges
    const { name, value } = e.target;
    
    // actualitzem el formulari
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
    
    setError(null);
    setSuccess(null);
  };

  // validació bàsica
  const isFormValid =
    form.name.trim() !== "" &&
    form.category.trim() !== "" &&
    form.price !== "" &&
    !Number.isNaN(Number(form.price)) &&
    Number(form.price) > 0; // validació mínima: nom, categoria i preu > 0

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!isFormValid) {
      setError("Cal un nom, una categoria i un preu positiu.");
      return;
    }

    // agafem TOT el producte original i sobreescrivim només camps editats
    const formData = {
      id: product.id, // cal l'id per al PUT i l'agefem de product perque es algo que no canvia
      name: form.name,
      price: Number(form.price),
      category: form.category,
      brand: form.brand || null,
      origin: form.origin || null,
      sku: form.sku || null,
      description: form.description || null,
      stock: Number(form.stock) || 0
    };
    console.log("DADES A ENVIAR EDIT:", formData);

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error("Error actualitzant el producte");
      }

      const updatedProduct = await res.json();

      // avisem el pare
      if (onProductUpdated) {
        onProductUpdated(updatedProduct); // li passem el producte actualitzat al pare per a que es dispare el canvi a la llista
        // es dispara el handleProductUpdated del avi ProductsList
    }

      setSuccess("Producte actualitzat correctament.");
    } catch (err) {
      console.error("Error PUT producte:", err);
      setError("No s'ha pogut actualitzar el producte.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h6 className="mb-2">Editar producte</h6>

      {error && <Error textToShow={error} />}
      {success && <Success textToShow={success} />}

      <form className="row g-2" onSubmit={handleSubmit}>
        {/* OBLIGATORIS */}
        <div className="col-md-4">
          <label className="form-label">Nom *</label>
          <input type="text" name="name" className="form-control"
            value={form.name} onChange={handleChange} required/>
        </div>

        <div className="col-md-2">
          <label className="form-label">Preu (€) *</label>
          <input type="number" name="price" className="form-control"
            value={form.price} onChange={handleChange} required />
        </div>

        <div className="col-md-3">
          <label className="form-label">Categoria *</label>
          <input type="text" name="category" className="form-control"
            value={form.category} onChange={handleChange} required/>
        </div>

        {/* OPCIONALS */}
        <div className="col-md-3">
          <label className="form-label">Marca (opcional)</label>
          <input type="text" name="brand" className="form-control"
            value={form.brand} onChange={handleChange} />
        </div>

        <div className="col-md-2">
          <label className="form-label">Stock (opcional)</label>
          <input type="number" name="stock" className="form-control"
            value={form.stock} onChange={handleChange} />
        </div>

        <div className="col-md-3">
          <label className="form-label">Procedència (opcional)</label>
          <input type="text" name="origin" className="form-control"
            value={form.origin} onChange={handleChange} />
        </div>

        <div className="col-md-3">
          <label className="form-label">SKU (opcional)</label>
          <input type="text" name="sku" className="form-control"
            value={form.sku} onChange={handleChange} />
        </div>

        <div className="col-12">
          <label className="form-label">Descripció (opcional)</label>
          <textarea name="description" className="form-control" rows="2" 
            value={form.description} onChange={handleChange} />
        </div>

        <div className="col-12 mt-2 d-flex gap-2">
          <button type="submit" className="btn btn-sm btn-success"
            disabled={!isFormValid || loading}
          >
            {loading ? "Guardant..." : "Guardar canvis"}
          </button>
        </div>

        <div className="col-12 mt-1">
          <small className="text-muted">Els camps amb * són obligatoris.</small>
        </div>
      </form>
    </div>
  );
}