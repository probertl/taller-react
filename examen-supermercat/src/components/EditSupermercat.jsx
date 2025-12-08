// components/EditSupermercat.jsx
import { useState, useEffect } from "react";
import Error from "./Error";

const API_URL = import.meta.env.VITE_API_URL + '/supermercats';
const USERS_URL = import.meta.env.VITE_API_URL + '/users';

export default function EditSupermercat({ supermercat, onSupermercatUpdated, onCancel }) {
  const INITIAL_FORM = {
    nom: supermercat.nom,
    descripcio: supermercat.descripcio || "",
    tipus: supermercat.tipus,
    responsableId: supermercat.responsableId
  };

  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetch(USERS_URL);
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error carregant usuaris:", err);
      }
    };
    loadUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const isFormValid =
    form.nom.trim() !== "" &&
    form.tipus !== "" &&
    form.responsableId !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!isFormValid) {
      setError("Cal omplir nom, tipus i responsable.");
      return;
    }

    const formData = {
      id: supermercat.id,
      nom: form.nom,
      descripcio: form.descripcio,
      tipus: form.tipus,
      responsableId: Number(form.responsableId)
    };

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/${supermercat.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error("Error actualitzant el supermercat");
      }

      const updated = await res.json();
      onSupermercatUpdated(updated);
    } catch (err) {
      console.error("Error PUT supermercat:", err);
      setError("No s'ha pogut actualitzar el supermercat.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-top pt-3">
      <h6 className="mb-2">Editar supermercat</h6>

      {error && <Error textToShow={error} />}

      <form className="row g-2" onSubmit={handleSubmit}>
        <div className="col-md-4">
          <label className="form-label">Nom *</label>
          <input
            type="text"
            name="nom"
            className="form-control form-control-sm"
            value={form.nom}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Tipus *</label>
          <select
            name="tipus"
            className="form-select form-select-sm"
            value={form.tipus}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona tipus</option>
            <option value="urbà">Urbà</option>
            <option value="hipermercat">Hipermercat</option>
            <option value="costaner">Costaner</option>
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label">Responsable *</label>
          <select
            name="responsableId"
            className="form-select form-select-sm"
            value={form.responsableId}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona responsable</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username} ({user.role})
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-12">
          <label className="form-label">Descripció</label>
          <input
            type="text"
            name="descripcio"
            className="form-control form-control-sm"
            value={form.descripcio}
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

          {onCancel && (
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel·lar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
