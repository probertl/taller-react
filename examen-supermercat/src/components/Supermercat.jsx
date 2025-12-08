// components/Supermercat.jsx
// Component individual per mostrar un supermercat amb les seves comandes
import { useState, useEffect } from "react";
import EditSupermercat from "./EditSupermercat";
import Comanda from "./Comanda";
import AddComanda from "./AddComanda";

const API_URL = import.meta.env.VITE_API_URL + '/supermercats';
const COMANDES_URL = import.meta.env.VITE_API_URL + '/comandes';
const USERS_URL = import.meta.env.VITE_API_URL + '/users';

export default function Supermercat({
  supermercat,
  onSupermercatUpdated,
  onSupermercatDeleted,
  onAllComandesDeleted
}) {
  // Estats per controlar la vista
  const [isEditing, setIsEditing] = useState(false); // si estem editant el supermercat
  const [showComandes, setShowComandes] = useState(false); // si mostrem les comandes (desplegable)
  const [comandes, setComandes] = useState([]); // llista de comandes
  const [loadingComandes, setLoadingComandes] = useState(false); // si estem carregant comandes
  const [responsableName, setResponsableName] = useState(""); // nom del responsable

  // Carregar nom del responsable
  useEffect(() => {
    const loadResponsable = async () => {
      try {
        const res = await fetch(`${USERS_URL}/${supermercat.responsableId}`);
        if (res.ok) {
          const user = await res.json();
          setResponsableName(user.username);
        }
      } catch (err) {
        console.error("Error carregant responsable:", err);
      }
    };

    if (supermercat.responsableId) {
      loadResponsable();
    }
  }, [supermercat.responsableId]);

  // Carregar comandes quan s'expandeix
  useEffect(() => {
    if (showComandes) {
      loadComandes();
    }
  }, [showComandes]);

  const loadComandes = async () => {
    try {
      setLoadingComandes(true);
      const res = await fetch(`${COMANDES_URL}?supermercatId=${supermercat.id}`);
      if (!res.ok) throw new Error("Error carregant comandes");

      const data = await res.json();
      setComandes(data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoadingComandes(false);
    }
  };

  // Handler per eliminar el supermercat (DELETE)
  const handleDelete = async () => {
    if (!window.confirm(`Segur que vols eliminar ${supermercat.nom}?`)) return;

    try {
      const res = await fetch(`${API_URL}/${supermercat.id}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Error eliminant supermercat");
      onSupermercatDeleted(supermercat.id);
    } catch (err) {
      console.error("Error:", err);
      alert("No s'ha pogut eliminar el supermercat");
    }
  };

  // Handler per actualitzar una comanda existent (quan canvia l'estat)
  const handleComandaUpdated = (updatedComanda) => {
    setComandes((prev) =>
      prev.map((c) => (c.id === updatedComanda.id ? updatedComanda : c))
    );
  };

  // Handler per eliminar una comanda individual
  const handleComandaDeleted = (deletedId) => {
    setComandes((prev) => prev.filter((c) => c.id !== deletedId));
  };

  // Handler per afegir una nova comanda (des d'AddComanda)
  const handleComandaAdded = (newComanda) => {
    setComandes((prev) => [...prev, newComanda]);
  };

  // Handler per esborrar TOTES les comandes (només si totes estan finalitzades)
  const handleDeleteAllComandes = async () => {
    const allFinalitzat = comandes.every((c) => c.status === "finalitzat");

    // Validació: totes les comandes han d'estar finalitzades
    if (!allFinalitzat) {
      alert("No es poden esborrar. Algunes comandes no estan finalitzades.");
      return;
    }

    if (!window.confirm("Esborrar TOTES les comandes finalitzades?")) return;

    try {
      // Esborrar cada comanda
      await Promise.all(
        comandes.map((c) =>
          fetch(`${COMANDES_URL}/${c.id}`, { method: "DELETE" })
        )
      );

      setComandes([]);
      onAllComandesDeleted();
    } catch (err) {
      console.error("Error esborrant comandes:", err);
      alert("Error esborrant comandes");
    }
  };

  return (
    <div className="list-group-item">
      <div className="d-flex justify-content-between align-items-start">
        <div className="flex-grow-1">
          <h5 className="mb-1">
            {supermercat.nom}
            <span className="badge bg-info ms-2">{supermercat.tipus}</span>
          </h5>
          <p className="mb-1 text-muted">{supermercat.descripcio}</p>
          <small className="text-muted">
            Responsable: <strong>{responsableName || "Carregant..."}</strong>
          </small>
        </div>

        {/* Botons d'acció: SHOW/HIDE comandes, EDITAR, DELETE */}
        <div className="btn-group btn-group-sm" role="group">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => {
              // Si obrim SHOW, tanquem EDIT
              if (!showComandes) {
                setIsEditing(false);
              }
              setShowComandes(!showComandes);
            }}
          >
            {showComandes ? "HIDE" : "SHOW"}
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => {
              // Si obrim EDIT, tanquem SHOW
              if (!isEditing) {
                setShowComandes(false);
              }
              setIsEditing(!isEditing);
            }}
          >
            {isEditing ? "CANCEL·LAR" : "EDITAR"}
          </button>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={handleDelete}
          >
            DELETE
          </button>
        </div>
      </div>

      {/* Formulari d'edició quan EDIT està obert */}
      {isEditing && (
        <div className="mt-3 border-top pt-2">
          <EditSupermercat
            supermercat={supermercat}
            onSupermercatUpdated={(updated) => {
              onSupermercatUpdated(updated);
              setIsEditing(false);
            }}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      )}

      {/* Bloc de comandes (AddComanda + llistat) quan SHOW està obert */}
      {showComandes && (
        <div className="mt-3 border-top pt-2">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="mb-0">Comandes ({comandes.length})</h6>
            {/* Botó per esborrar totes les comandes (només si totes estan finalitzades) */}
            {comandes.length > 0 &&
              comandes.every((c) => c.status === "finalitzat") && (
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={handleDeleteAllComandes}
                >
                  Esborrar totes
                </button>
              )}
          </div>

          {/* Formulari per afegir nova comanda - sempre visible amb les comandes */}
          <AddComanda 
            supermercatId={supermercat.id} 
            onComandaAdded={handleComandaAdded}
          />

          {loadingComandes && <p>Carregant comandes...</p>}

          {!loadingComandes && comandes.length === 0 && (
            <p className="text-muted">No hi ha comandes</p>
          )}

          {!loadingComandes && comandes.length > 0 && (
            <div className="list-group list-group-flush">
              {comandes.map((comanda) => (
                <Comanda
                  key={comanda.id}
                  comanda={comanda}
                  onComandaUpdated={handleComandaUpdated}
                  onComandaDeleted={handleComandaDeleted}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
