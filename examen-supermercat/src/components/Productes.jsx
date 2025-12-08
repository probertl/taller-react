// components/Productes.jsx
import { useEffect, useState } from "react";
import Producte from "./Producte";
import Error from "./Error";
import Success from "./Success";

const API_URL = import.meta.env.VITE_API_URL + '/productes';

export default function Productes() {
  const [productes, setProductes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Formulari per afegir nou producte
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: ""
  });

  useEffect(() => {
    loadProductes();
  }, []);

  const loadProductes = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setProductes(data);
    } catch (err) {
      console.error(err);
      setError("Error carregant productes");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!form.name || !form.price || !form.category) {
      setError("Cal omplir nom, preu i categoria");
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price)
        })
      });

      if (!res.ok) throw new Error("Error creant producte");

      const newProducte = await res.json();
      setProductes([...productes, newProducte]);
      setSuccess("Producte afegit correctament");
      setForm({ name: "", description: "", price: "", category: "" });
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error(err);
      setError("No s'ha pogut crear el producte");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error esborrant producte");

      setProductes(productes.filter((p) => p.id !== id));
      setSuccess("Producte esborrat");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error(err);
      setError("No s'ha pogut esborrar el producte");
    }
  };

  const handleUpdate = (updatedProducte) => {
    setProductes(productes.map((p) => 
      p.id === updatedProducte.id ? updatedProducte : p
    ));
    setSuccess("Producte actualitzat correctament");
    setTimeout(() => setSuccess(null), 3000);
  };

  return (
    <div className="container-fluid px-4">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Gestió de Productes</h5>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Tancar" : "Afegir producte"}
          </button>
        </div>

        <div className="card-body">
        {error && <Error textToShow={error} />}
        {success && <Success textToShow={success} />}

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-3 p-3 border rounded bg-light">
            <div className="row g-2">
              <div className="col-md-3">
                <input
                  type="text"
                  name="name"
                  className="form-control form-control-sm"
                  placeholder="Nom"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  name="category"
                  className="form-control form-control-sm"
                  placeholder="Categoria"
                  value={form.category}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-2">
                <input
                  type="number"
                  name="price"
                  className="form-control form-control-sm"
                  placeholder="Preu"
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  name="description"
                  className="form-control form-control-sm"
                  placeholder="Descripció"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-1">
                <button type="submit" className="btn btn-success btn-sm w-100">
                  Afegir
                </button>
              </div>
            </div>
          </form>
        )}

        {loading && <p>Carregant productes...</p>}

        {!loading && productes.length === 0 && (
          <p className="text-muted">No hi ha productes</p>
        )}

        {!loading && productes.length > 0 && (
          <div className="list-group">
            {productes.map((producte) => (
              <Producte
                key={producte.id}
                producte={producte}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
