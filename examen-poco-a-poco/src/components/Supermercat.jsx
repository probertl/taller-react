import { useState, useEffect } from "react";
import Comanda from "./Comanda";
import Error from "./Error";

const COMANDES_URL = import.meta.env.VITE_API_URL + '/comandes';
const USERS_URL = import.meta.env.VITE_API_URL + '/users';

// Li arriba del pare el supermercat a mostrar
export default function Supermercat({ supermercat }) {

  // Estats per controlar la vista
  const [showComandes, setShowComandes] = useState(false); // si mostrem les comandes (desplegable)
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

        {/* Botons d'acció: només SHOW/HIDE comandes */}
        <div className="btn-group btn-group-sm" role="group">
          {/* Si showComandes és false (tancat), mostrem SHOW */}
          {/* Si showComandes és true (obert), mostrem HIDE */}
          <button type="button" className="btn btn-outline-primary"
            onClick={() => {
              if (showComandes) {
                setShowComandes(false); // Si està obert, el tanquem
              } else {
                setShowComandes(true); // Si està tancat, l'obrim
              }
            }}
          >
            {showComandes ? "HIDE" : "SHOW"}
          </button>
        </div>
      </div>

      {/* Bloc de comandes (AddComanda + llistat) quan SHOW està obert */}
      {showComandes && (
        <div className="mt-3 border-top pt-2">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="mb-0">Comandes ({comandes.length})</h6>
          </div>

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
            <div className="list-group list-group-flush">
              {comandes.map((comanda) => (
                <Comanda
                // Li enviem la comanda per a que aixi despres faci
                // la petició per carregar el producte
                  key={comanda.id}
                  comanda={comanda}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}


// // components/Supermercat.jsx
// // Component individual per mostrar un supermercat amb les seves comandes
// import { useState, useEffect } from "react";
// import EditSupermercat from "./EditSupermercat";
// import Comanda from "./Comanda";
// import AddComanda from "./AddComanda";

// const API_URL = import.meta.env.VITE_API_URL + '/supermercats';
// const COMANDES_URL = import.meta.env.VITE_API_URL + '/comandes';
// const USERS_URL = import.meta.env.VITE_API_URL + '/users';

// export default function Supermercat({
//   supermercat,
//   onSupermercatUpdated,
//   onSupermercatDeleted,
//   onAllComandesDeleted
// }) {
//   // Estats per controlar la vista
//   const [isEditing, setIsEditing] = useState(false); // si estem editant el supermercat
//   const [showComandes, setShowComandes] = useState(false); // si mostrem les comandes (desplegable)
//   const [comandes, setComandes] = useState([]); // llista de comandes
//   const [loadingComandes, setLoadingComandes] = useState(false); // si estem carregant comandes
//   const [responsableName, setResponsableName] = useState(""); // nom del responsable

//   // Carregar nom del responsable
//   useEffect(() => {
//     const loadResponsable = async () => {
//       try {
//         const res = await fetch(`${USERS_URL}/${supermercat.responsableId}`);
//         if (res.ok) {
//           const user = await res.json();
//           setResponsableName(user.username);
//         }
//       } catch (err) {
//         console.error("Error carregant responsable:", err);
//       }
//     };

//     if (supermercat.responsableId) {
//       loadResponsable();
//     }
//   }, [supermercat.responsableId]);

//   // Carregar comandes quan s'expandeix
//   useEffect(() => {
//     if (showComandes) {
//       loadComandes();
//     }
//   }, [showComandes]);

//   const loadComandes = async () => {
//     try {
//       setLoadingComandes(true);
//       const res = await fetch(`${COMANDES_URL}?supermercatId=${supermercat.id}`);
//       if (!res.ok) throw new Error("Error carregant comandes");

//       const data = await res.json();
//       setComandes(data);
//     } catch (err) {
//       console.error("Error:", err);
//     } finally {
//       setLoadingComandes(false);
//     }
//   };

//   // Handler per eliminar el supermercat (DELETE) - COMENTAT
//   // const handleDelete = async () => {
//   //   if (!window.confirm(`Segur que vols eliminar ${supermercat.nom}?`)) return;

//   //   try {
//   //     const res = await fetch(`${API_URL}/${supermercat.id}`, {
//   //       method: "DELETE"
//   //     });

//   //     if (!res.ok) throw new Error("Error eliminant supermercat");
//   //     onSupermercatDeleted(supermercat.id);
//   //   } catch (err) {
//   //     console.error("Error:", err);
//   //     alert("No s'ha pogut eliminar el supermercat");
//   //   }
//   // };

//   // Handler per actualitzar una comanda existent (quan canvia l'estat) - COMENTAT
//   // const handleComandaUpdated = (updatedComanda) => {
//   //   setComandes((prev) =>
//   //     prev.map((c) => (c.id === updatedComanda.id ? updatedComanda : c))
//   //   );
//   // };

//   // Handler per eliminar una comanda individual - COMENTAT
//   // const handleComandaDeleted = (deletedId) => {
//   //   setComandes((prev) => prev.filter((c) => c.id !== deletedId));
//   // };

//   // Handler per afegir una nova comanda (des d'AddComanda) - COMENTAT
//   // const handleComandaAdded = (newComanda) => {
//   //   setComandes((prev) => [...prev, newComanda]);
//   // };

//   // Handler per esborrar TOTES les comandes (només si totes estan finalitzades) - COMENTAT
//   // const handleDeleteAllComandes = async () => {
//   //   const allFinalitzat = comandes.every((c) => c.status === "finalitzat");

//   //   // Validació: totes les comandes han d'estar finalitzades
//   //   if (!allFinalitzat) {
//   //     alert("No es poden esborrar. Algunes comandes no estan finalitzades.");
//   //     return;
//   //   }

//   //   if (!window.confirm("Esborrar TOTES les comandes finalitzades?")) return;

//   //   try {
//   //     // Esborrar cada comanda
//   //     await Promise.all(
//   //       comandes.map((c) =>
//   //         fetch(`${COMANDES_URL}/${c.id}`, { method: "DELETE" })
//   //       )
//   //     );

//   //     setComandes([]);
//   //     onAllComandesDeleted();
//   //   } catch (err) {
//   //     console.error("Error esborrant comandes:", err);
//   //     alert("Error esborrant comandes");
//   //   }
//   // };

//   return (
//     <div className="list-group-item">
//       <div className="d-flex justify-content-between align-items-start">
//         <div className="flex-grow-1">
//           <h5 className="mb-1">
//             {supermercat.nom}
//             <span className="badge bg-info ms-2">{supermercat.tipus}</span>
//           </h5>
//           <p className="mb-1 text-muted">{supermercat.descripcio}</p>
//           <small className="text-muted">
//             Responsable: <strong>{responsableName || "Carregant..."}</strong>
//           </small>
//         </div>

//         {/* Botons d'acció: només SHOW/HIDE comandes */}
//         <div className="btn-group btn-group-sm" role="group">
//           <button
//             type="button"
//             className="btn btn-outline-primary"
//             onClick={() => setShowComandes(!showComandes)}
//           >
//             {showComandes ? "HIDE" : "SHOW"}
//           </button>
//           {/* EDITAR - COMENTAT */}
//           {/* <button
//             type="button"
//             className="btn btn-outline-secondary"
//             onClick={() => {
//               if (!isEditing) {
//                 setShowComandes(false);
//               }
//               setIsEditing(!isEditing);
//             }}
//           >
//             {isEditing ? "CANCEL·LAR" : "EDITAR"}
//           </button> */}
//           {/* DELETE - COMENTAT */}
//           {/* <button
//             type="button"
//             className="btn btn-outline-danger"
//             onClick={handleDelete}
//           >
//             DELETE
//           </button> */}
//         </div>
//       </div>

//       {/* Formulari d'edició quan EDIT està obert - COMENTAT */}
//       {/* {isEditing && (
//         <div className="mt-3 border-top pt-2">
//           <EditSupermercat
//             supermercat={supermercat}
//             onSupermercatUpdated={(updated) => {
//               onSupermercatUpdated(updated);
//               setIsEditing(false);
//             }}
//             onCancel={() => setIsEditing(false)}
//           />
//         </div>
//       )} */}

//       {/* Bloc de comandes (AddComanda + llistat) quan SHOW està obert */}
//       {showComandes && (
//         <div className="mt-3 border-top pt-2">
//           <div className="d-flex justify-content-between align-items-center mb-2">
//             <h6 className="mb-0">Comandes ({comandes.length})</h6>
//             {/* Botó per esborrar totes les comandes - COMENTAT */}
//             {/* {comandes.length > 0 &&
//               comandes.every((c) => c.status === "finalitzat") && (
//                 <button
//                   type="button"
//                   className="btn btn-sm btn-danger"
//                   onClick={handleDeleteAllComandes}
//                 >
//                   Esborrar totes
//                 </button>
//               )} */}
//           </div>

//           {/* Formulari per afegir nova comanda - COMENTAT */}
//           {/* <AddComanda 
//             supermercatId={supermercat.id} 
//             onComandaAdded={handleComandaAdded}
//           /> */}

//           {loadingComandes && <p>Carregant comandes...</p>}

//           {!loadingComandes && comandes.length === 0 && (
//             <p className="text-muted">No hi ha comandes</p>
//           )}

//           {!loadingComandes && comandes.length > 0 && (
//             <div className="list-group list-group-flush">
//               {comandes.map((comanda) => (
//                 <Comanda
//                   key={comanda.id}
//                   comanda={comanda}
//                   // Handlers comentats - només visualització
//                   // onComandaUpdated={handleComandaUpdated}
//                   // onComandaDeleted={handleComandaDeleted}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
