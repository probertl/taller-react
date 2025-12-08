import { useState, useEffect } from "react";
import Warning from "./Warning";

const PRODUCTES_URL = import.meta.env.VITE_API_URL + '/productes';

// Li arriba comanda amb producteId, quantitat i estat (només visualització)
export default function Comanda({ comanda }) {
  const [producte, setProducte] = useState(null);
  const [warning, setWarning] = useState(null);

  // Carregar dades del producte
  useEffect(() => {
    const loadProducte = async () => {
      try {
        const res = await fetch(`${PRODUCTES_URL}/${comanda.producteId}`);
        
        // Si no existeix el producte (404 o resposta no ok)
        if (!res.ok) {
          setWarning(true);
          return;
        }
        
        const data = await res.json();
        setProducte(data);
      } catch (err) {
        console.error("Error:", err);
        setWarning(true);
      }
    };
    loadProducte();
  }, [comanda.producteId]);

  // Si hi ha error carregant el producte
  if (warning) {
    return (
      <div className="list-group-item">
        <Warning>El producte amb ID {comanda.producteId} no existeix o ha estat esborrat.</Warning>
      </div>
    );
  }

  // Si encara està carregant
  if (!producte) {
    return <div className="list-group-item">Carregant...</div>;
  }

  return (
    <div className="list-group-item">
      <div className="fw-semibold">{producte.name}</div>
      <div className="text-muted small">
        Quantitat: {comanda.quantitat} · Preu: {producte.price}€
      </div>
      <div className="mt-2">
        <span className="badge bg-secondary">Estat: {comanda.status}</span>
      </div>
    </div>
  );
}



// // components/Comanda.jsx
// // Component individual per mostrar una comanda amb els seus 5 estats i botons d'acció
// import { useState, useEffect } from "react";

// const COMANDES_URL = import.meta.env.VITE_API_URL + '/comandes';
// const PRODUCTES_URL = import.meta.env.VITE_API_URL + '/productes';

// // Configuració dels 5 estats possibles amb icones i colors Bootstrap
// const STATUS_CONFIG = {
//   demanat: { icon: "cart-plus", color: "secondary", label: "Demanat" },
//   a_magatzem: { icon: "box-seam", color: "primary", label: "A magatzem" },
//   preparat: { icon: "check2-square", color: "info", label: "Preparat" },
//   servit: { icon: "truck", color: "warning", label: "Servit" },
//   finalitzat: { icon: "check-circle-fill", color: "success", label: "Finalitzat" }
// };

// // Ordre sequèncial dels estats (es pot avançar o retrocedir, excepte des de finalitzat)
// const STATUS_ORDER = ["demanat", "a_magatzem", "preparat", "servit", "finalitzat"];

// export default function Comanda({ comanda, onComandaUpdated, onComandaDeleted }) {
//   const [producte, setProducte] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadProducte = async () => {
//       try {
//         const res = await fetch(`${PRODUCTES_URL}/${comanda.producteId}`);
//         if (res.ok) {
//           const data = await res.json();
//           setProducte(data);
//         }
//       } catch (err) {
//         console.error("Error carregant producte:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProducte();
//   }, [comanda.producteId]);

//   // Handler per canviar l'estat de la comanda (PATCH) - COMENTAT
//   // const handleStatusClick = async (newStatus) => {
//   //   // Restricció: no es pot canviar des de finalitzat
//   //   if (comanda.status === "finalitzat") return;

//   //   try {
//   //     const res = await fetch(`${COMANDES_URL}/${comanda.id}`, {
//   //       method: "PATCH",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify({ status: newStatus })
//   //     });

//   //     if (!res.ok) throw new Error("Error actualitzant estat");

//   //     const data = await res.json();
//   //     onComandaUpdated(data);
//   //   } catch (err) {
//   //     console.error("Error:", err);
//   //     alert("No s'ha pogut actualitzar l'estat");
//   //   }
//   // };

//   // Handler per esborrar comanda - COMENTAT
//   // const handleDelete = async () => {
//   //   if (!window.confirm("Esborrar aquesta comanda?")) return;

//   //   try {
//   //     const res = await fetch(`${COMANDES_URL}/${comanda.id}`, {
//   //       method: "DELETE"
//   //     });

//   //     if (!res.ok) throw new Error("Error esborrant comanda");
//   //     onComandaDeleted(comanda.id);
//   //   } catch (err) {
//   //     console.error("Error:", err);
//   //     alert("No s'ha pogut esborrar la comanda");
//   //   }
//   // };

//   if (loading) {
//     return <div className="list-group-item">Carregant...</div>;
//   }

//   // const isFinalitzat = comanda.status === "finalitzat"; // COMENTAT - no necessari sense interacció

//   return (
//     <div className="list-group-item">
//       <div className="d-flex justify-content-between align-items-start">
//         <div className="flex-grow-1 me-3">
//           <div className="fw-semibold mb-1">
//             {producte?.name || "Producte desconegut"}
//           </div>
//           <small className="text-muted">
//             Quantitat: {comanda.quantitat} · Preu: {producte?.price}€
//           </small>
//         </div>

//         <div className="d-flex flex-column gap-1" style={{ minWidth: "280px" }}>
//           {/* Fila d'estats - només visualització (estàtics) */}
//           <div className="btn-group btn-group-sm" role="group" style={{ flexWrap: "nowrap" }}>
//             {STATUS_ORDER.map((statusKey) => {
//               const config = STATUS_CONFIG[statusKey];
//               const isActive = comanda.status === statusKey;
              
//               return (
//                 <button
//                   key={statusKey}
//                   className={`btn btn-${isActive ? config.color : 'outline-' + config.color}`}
//                   disabled
//                   title={config.label}
//                   style={{ fontSize: "0.7rem", padding: "0.2rem 0.3rem" }}
//                 >
//                   <i className={`bi bi-${config.icon}`}></i>
//                 </button>
//               );
//             })}
//           </div>
          
//           {/* Botó per esborrar comanda individual - COMENTAT */}
//           {/* <button
//             type="button"
//             className="btn btn-sm btn-outline-danger"
//             onClick={handleDelete}
//           >
//             DELETE
//           </button> */}
//         </div>
//       </div>
//     </div>
//   );
// }
