// components/EditSupermercat.jsx
import { useState, useEffect } from "react";
import Error from "./Error";
import Success from "./Success";

const API_URL = import.meta.env.VITE_API_URL + '/supermercats';
const USERS_URL = import.meta.env.VITE_API_URL + '/users';
 
// Li arriba del pare supermercat a editar i funció per notificar actualització
export default function EditSupermercat({ supermercat, onSupermercatUpdated, onCancel }) {
  const INITIAL_FORM = {
    nom: supermercat.nom,
    descripcio: supermercat.descripcio || "",
    tipus: supermercat.tipus,
    responsableId: supermercat.responsableId
  };

  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  // Carregar usuaris per al desplegable de responsables
  // Per si vol editar el responsable
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetch(USERS_URL);
        if (!res.ok) {
          setError("Error carregant usuaris");
        }
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error carregant usuaris:", err);
        setError("No s'han pogut carregar els usuaris per seleccionar el responsable.");
      }
    };
    loadUsers();
  }, []);

  // Actualitzar l'estat del formulari quan canvia el supermercat
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Actualitzar formulari
    setForm((prev) => (
      { ...prev, [name]: value }
    ));

    // Netejar errors i missatges d'èxit antics
    setError(null);
    setSuccess(null);

  };

  // Validació bàsica
  const isFormValid =
    form.nom.trim() !== "" &&
    form.tipus !== "" &&
    form.responsableId !== "";

  // Enviar dades
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
      responsableId: form.responsableId
    };

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/${supermercat.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        setError("Error actualitzant el supermercat");
        return;
      }

      const updated = await res.json();
      onSupermercatUpdated(updated);
      
      // Mostrar missatge d'èxit sense tancar el formulari
      setSuccess("Supermercat actualitzat correctament!");

    } catch (err) {
      console.error("Error PUT supermercat:", err);
      setError("No s'ha pogut actualitzar el supermercat.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div >
      <h6 className="mb-2">Editar supermercat</h6>

      {error && <Error>{error}</Error>}
      {success && <Success>{success}</Success>}

      <form className="row g-2" onSubmit={handleSubmit}>
        <div className="col-md-4">
          <label className="form-label">Nom *</label>
          <input type="text" name="nom" className="form-control form-control-sm"
            value={form.nom} onChange={handleChange} required />
        </div>

        <div className="col-md-3">
          <label className="form-label">Tipus *</label>
          <select name="tipus" className="form-select form-select-sm"
            value={form.tipus} onChange={handleChange} required >
            <option value="">Selecciona tipus</option>
            <option value="urbà">Urbà</option>
            <option value="hipermercat">Hipermercat</option>
            <option value="costaner">Costaner</option>
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label">Responsable *</label>
          <select name="responsableId" className="form-select form-select-sm"
            value={form.responsableId} onChange={handleChange} required >
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
          <input type="text" name="descripcio" className="form-control form-control-sm"
            value={form.descripcio} onChange={handleChange} />
        </div>

        <div className="col-12 mt-2 d-flex gap-2">
          <button type="submit" className="btn btn-sm btn-success"
            disabled={!isFormValid || loading}
          >
            {loading ? "Guardant..." : "Guardar canvis"}
          </button>

          {onCancel && (
            <button type="button" className="btn btn-sm btn-outline-secondary"
              onClick={onCancel} disabled={loading}
            >
              Cancel·lar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
