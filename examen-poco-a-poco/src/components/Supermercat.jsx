import { useState, useEffect } from "react";
import Comanda from "./Comanda";
import EditSupermercat from "./EditSupermercat";
import AddComanda from "./AddComanda";
import Error from "./Error";

const API_URL = import.meta.env.VITE_API_URL + '/supermercats';
const COMANDES_URL = import.meta.env.VITE_API_URL + '/comandes';
const USERS_URL = import.meta.env.VITE_API_URL + '/users';

// Li arriba del pare el supermercat a mostrar i els handlers per CRUD
export default function Supermercat({
  supermercat,
  onSupermercatUpdated,
  onSupermercatDeleted
}) {

  // Estats per controlar la vista
  const [isEditing, setIsEditing] = useState(false); // si estem editant el supermercat
  const [showComandes, setShowComandes] = useState(false); // si mostrem les comandes (desplegable)
  const [showAddComanda, setShowAddComanda] = useState(false); // si mostrem el formulari d'afegir comanda
  const [comandes, setComandes] = useState([]); // llista de comandes
  const [loadingComandes, setLoadingComandes] = useState(false); // si estem carregant comandes
  const [errorComandes, setErrorComandes] = useState(null); // si hi ha hagut un error carregant comandes
  const [responsableName, setResponsableName] = useState(""); // nom del responsable

  // Carregar nom del responsable
  useEffect(() => {
    const loadResponsable = async () => {
      try {                                     // Es guarda aixi al db.json
        const res = await fetch(`${USERS_URL}/${supermercat.responsableId}`);

        if (!res.ok) {
          setResponsableName("Desconegut");
          return;
        }

        if (res.ok) {
          const user = await res.json();
          setResponsableName(user.username);
        }
      } catch (err) {
        console.error("Error carregant responsable:", err);
      }
    };

    // Carregar nom del responsable només si hi ha responsableId
    if (supermercat.responsableId) {
      loadResponsable();
    }
  }, [supermercat.responsableId]);

  // Carregar comandes quan s'expandeix
  useEffect(() => {
    // Si showComandes és true (s'ha obert)
    if (showComandes) {
      loadComandes();
    }
  }, [showComandes]);

  // Funció per carregar les comandes, es dispara el seu component
  // i s'envien les comandes al component Comanda
  const loadComandes = async () => {
    try {
      setLoadingComandes(true);
      setErrorComandes(null); // Resetejem l'error abans de carregar
      
      const res = await fetch(`${COMANDES_URL}?supermercatId=${supermercat.id}`);
      
      // Si la petició no va bé, marquem error
      if (!res.ok) {
        setErrorComandes(true);
        return;
      }

      const data = await res.json();
      // Guardem les comandes que tenen el id del supermercat actual
      // comanda = [
      //   {
      //     id: 1,
      //     producteId: 2,
      //     supermercatId: supermercat.id,
      //     quantitat: 5,
      //     status: "pendent"
      //   }
      // ]
      setComandes(data);
    } catch (err) {
      console.error("Error:", err);
      setErrorComandes(true); // Si hi ha qualsevol error, el marquem
    } finally {
      setLoadingComandes(false);
    }
  };

  // Handler per eliminar el supermercat (DELETE)
  const handleDelete = async () => {
    if (!window.confirm(`Segur que vols eliminar ${supermercat.nom}?`)) {
      return;
    }

    try {
      const res = await fetch(`${API_URL}/${supermercat.id}`, {
        method: "DELETE"
      });

      if (!res.ok) {
        setErrorComandes("Error eliminant supermercat");
        return;
      }
      
      onSupermercatDeleted(supermercat.id);
    } catch (err) {
      console.error("Error:", err);
      setErrorComandes("No s'ha pogut eliminar el supermercat");
    }
  };

  // Handler per afegir una nova comanda (CREATE)
  const handleComandaAdded = (newComanda) => {
    setComandes((prev) => [...prev, newComanda]);
    setShowAddComanda(false); // Tanquem el formulari després d'afegir
  };

  // Handler per actualitzar una comanda (UPDATE)
  const handleComandaUpdated = (updatedComanda) => {
    setComandes((prev) =>
      prev.map((c) => (c.id === updatedComanda.id ? updatedComanda : c))
    );
  };

  // Handler per eliminar una comanda (DELETE)
  const handleComandaDeleted = (deletedId) => {
    setComandes((prev) => prev.filter((c) => c.id !== deletedId));
  };

  // Handler per eliminar totes les comandes finalitzades
  const handleDeleteAllFinalitzades = async () => {
    const finalitzades = comandes.filter((c) => c.status === "finalitzat");
    
    if (finalitzades.length === 0) return;

    if (!window.confirm(`Eliminar totes les ${finalitzades.length} comandes finalitzades?`)) {
      return;
    }

    try {
      // Eliminar totes les comandes finalitzades en paral·lel
      const deletePromises = finalitzades.map((c) =>
        fetch(`${COMANDES_URL}/${c.id}`, { method: "DELETE" })
      );

      await Promise.all(deletePromises);

      // Actualitzar l'estat eliminant totes les finalitzades
      setComandes((prev) => prev.filter((c) => c.status !== "finalitzat"));
    } catch (err) {
      console.error("Error:", err);
      alert("No s'han pogut eliminar totes les comandes");
    }
  };

  // Comprovar si totes les comandes estan finalitzades
  const allFinalitzades = comandes.length > 0 && comandes.every((c) => c.status === "finalitzat");

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

        {/* Botons d'acció: SHOW/HIDE, EDITAR i DELETE */}
        <div className="btn-group btn-group-sm" role="group">
          {/* Botó SHOW/HIDE comandes */}
          <button type="button" className="btn btn-outline-primary"
            onClick={() => {
              if (showComandes) {
                setShowComandes(false); // Si està obert, el tanquem
              } else {
                // Si obrim SHOW, tanquem EDIT
                setIsEditing(false);
                setShowComandes(true);
              }
            }}
          >
            {showComandes ? "HIDE" : "SHOW"}
          </button>

          {/* Botó EDITAR/CANCEL·LAR */}
          <button type="button" className="btn btn-outline-secondary"
            onClick={() => {
              if (isEditing) {
                setIsEditing(false); // Si està editant, cancel·lem
              } else {
                // Si obrim EDIT, tanquem SHOW
                setShowComandes(false);
                setIsEditing(true);
              }
            }}
          >
            {isEditing ? "CANCEL·LAR" : "EDITAR"}
          </button>

          {/* Botó DELETE */}
          <button type="button" className="btn btn-outline-danger"
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
            onSupermercatUpdated={onSupermercatUpdated}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      )}

      {/* Bloc de comandes (AddComanda + llistat) quan SHOW està obert */}
      {showComandes && (
        <div className="mt-3 border-top pt-2">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="mb-0">Comandes ({comandes.length})</h6>
            {/* Botó per obrir/tancar el formulari d'afegir comanda */}
            <button
              type="button"
              className="btn btn-sm btn-success"
              onClick={() => {
                if (showAddComanda) {
                  setShowAddComanda(false); // Si està obert, el tanquem
                } else {
                  setShowAddComanda(true); // Si està tancat, l'obrim
                }
              }}
            >
              {showAddComanda ? "TANCAR" : "AFEGIR COMANDA"}
            </button>
          </div>

          {/* Formulari per afegir nova comanda (CREATE) */}
          {showAddComanda && (
            <AddComanda 
              supermercatId={supermercat.id} 
              onComandaAdded={handleComandaAdded}
            />
          )}

          {/* Si estem carregant */}
          {loadingComandes && <p>Carregant comandes...</p>}

          {/* Si hi ha hagut un error */}
          {errorComandes && (
            <Error>No s'han pogut carregar les comandes. Torna-ho a intentar.</Error>
          )}

          {/* Si NO hi ha comandes i no hi ha error */}
          {!loadingComandes && !errorComandes && comandes.length === 0 && (
            <p className="text-muted">No hi ha comandes</p>
          )}

          {/* Si hi ha comandes i no hi ha error */}
          {!loadingComandes && !errorComandes && comandes.length > 0 && (
            <>
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

              {/* Botó per esborrar totes les comandes finalitzades */}
              {allFinalitzades && (
                <div className="mt-3 text-center">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDeleteAllFinalitzades}
                  >
                    ESBORRAR TOTES LES COMANDES FINALITZADES
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
