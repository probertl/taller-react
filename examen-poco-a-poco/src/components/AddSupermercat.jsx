// components/AddSupermercat.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Error from "./Error";
import Success from "./Success";

const API_URL = import.meta.env.VITE_API_URL + '/supermercats';
const USERS_URL = import.meta.env.VITE_API_URL + '/users';

const INITIAL_FORM = {
  nom: "",
  descripcio: "",
  tipus: "",
  responsableId: ""
};

export default function AddSupermercat() {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
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
    setSuccess(null);
  };

  const handleClear = () => {
    setForm(INITIAL_FORM);
    setError(null);
    setSuccess(null);
  };

  const isFormValid =
    form.nom.trim() !== "" &&
    form.tipus !== "" &&
    form.responsableId !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!isFormValid) {
      setError("Cal omplir nom, tipus i responsable.");
      return;
    }

    const formData = {
      nom: form.nom,
      descripcio: form.descripcio,
      tipus: form.tipus,
      responsableId: Number(form.responsableId)
    };

    try {
      setLoading(true);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error("Error creant el supermercat");
      }

      const saved = await res.json();

      setSuccess("Supermercat creat correctament. Redirigint...");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      console.error("Error POST supermercat:", err);
      setError("No s'ha pogut crear el supermercat.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid px-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h4 mb-0">Afegir nou supermercat</h1>
        <button className="btn btn-sm btn-outline-secondary" onClick={() => navigate("/")}>
          <i className="bi bi-arrow-left"></i> Tornar
        </button>
      </div>

      <div className="card mb-3">
        <div className="card-body">
          {error && <Error>{error}</Error>}
          {success && <Success>{success}</Success>}

        <form onSubmit={handleSubmit} className="row g-2">
          <div className="col-md-4">
            <label className="form-label">Nom *</label>
            <input
              type="text"
              name="nom"
              className="form-control"
              placeholder="Nom del supermercat"
              value={form.nom}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Tipus *</label>
            <select
              name="tipus"
              className="form-select"
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
              className="form-select"
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
              className="form-control"
              placeholder="Descripció opcional"
              value={form.descripcio}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 mt-2 d-flex gap-2">
            <button
              type="submit"
              className="btn btn-success"
              disabled={!isFormValid || loading}
            >
              {loading ? "Guardant..." : "Afegir supermercat"}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleClear}
              disabled={loading}
            >
              Netejar
            </button>
          </div>

          <div className="col-12 mt-1">
            <small className="text-muted">* Camps obligatoris</small>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}
