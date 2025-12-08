import { useEffect, useState } from "react";
import Supermercat from "./Supermercat"; // Component per renderitzar cada supermercat
import SupermercatFilter from "./SupermercatFilter"; // Component per filtrar
import Error from "./Error"; // Component per mostrar errors

const API_URL = import.meta.env.VITE_API_URL + '/supermercats';

export default function SupermercatsList() {
  // Estats principals
  const [supermercats, setSupermercats] = useState([]); // llista de supermercats
  const [loading, setLoading] = useState(true); // si estem carregant
  const [error, setError] = useState(null); // missatge d'error

  // ESTRATÈGIA DE FILTRAT: Lifting State Up
  // Els filtres es gestionen aquí (component pare) perquè:
  // 1. SupermercatFilter només s'encarrega de la UI dels desplegables
  // 2. SupermercatsList gestiona la lògica de filtrat i la crida a l'API
  // 3. Així mantenim la separació de responsabilitats: UI vs Lògica
  const [filters, setFilters] = useState({
    tipus: "", // filtre per tipus de supermercat
    responsableId: "" // filtre per responsable (userId)
  });

  // GET inicial i quan canvien els filtres
  useEffect(() => {
    loadSupermercats();
  }, [filters]); // Es recarrega cada vegada que canvien els filtres

  const loadSupermercats = async () => {
    try {
      setLoading(true);
      setError(null);

      // Construïm la URL amb els filtres (query params)
      // Exemple: /supermercats?tipus=Alimentació&responsableId=1
      let url = API_URL;
      const params = new URLSearchParams();

      // Afegim filtres només si tenen valor
      if (filters.tipus) {
        params.append("tipus", filters.tipus);
      }
      if (filters.responsableId) {
        params.append("responsableId", filters.responsableId);
      }

      // Si hi ha filtres, els afegim a la URL
      if (params.toString()) {
        url += "?" + params.toString();
      }

      const res = await fetch(url);
      
      if (!res.ok) {
        setError("Error carregant supermercats");
        return;
      }

      const data = await res.json();
      setSupermercats(data);
    } catch (err) {
      console.error("Error llistant: ", err);
      setError("No s'han pogut carregar els supermercats.");
    } finally {
      setLoading(false);
    }
  };

  // Handler per canviar filtres (ve del component fill SupermercatFilter)
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };


  return (
    <div className="container-fluid px-4">
      <h1 className="h4 mb-3">Llista de Supermercats</h1>

      {/* Component de filtres */}
      <SupermercatFilter 
        onFilterChange={handleFilterChange} 
        filters={filters} 
      />

      {loading && <p className="text-muted">Carregant supermercats...</p>}
      {error && <Error>{error}</Error>}

      {!loading && !error && (
        <div className="mt-3">
          {supermercats.length === 0 ? (
            <p className="text-muted">No hi ha supermercats.</p>
          ) : (
            <div className="list-group">
              {supermercats.map((supermercat) => (
                // Renderitzem cada supermercat amb el component Supermercat
                <Supermercat
                  key={supermercat.id}
                  supermercat={supermercat}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}


// components/SupermercatsList.jsx
// Component principal que mostra el llistat de supermercats amb filtres
// import { useEffect, useState } from "react";
// // import { Link } from "react-router-dom"; // COMENTAT - no necessari per visualització
// import Supermercat from "./Supermercat";
// // import SupermercatFilter from "./SupermercatFilter"; // COMENTAT - sense filtres
// import Error from "./Error";
// // import Success from "./Success"; // COMENTAT - no necessari per visualització

// const API_URL = import.meta.env.VITE_API_URL + '/supermercats';

// export default function SupermercatsList() {
//   // Estats principals
//   const [supermercats, setSupermercats] = useState([]); // llista de supermercats
//   const [loading, setLoading] = useState(true); // si estem carregant
//   const [error, setError] = useState(null); // missatge d'error
//   // const [success, setSuccess] = useState(null); // missatge d'èxit - COMENTAT
  
//   // Filtres gestionats localment (Lifting State Up des de SupermercatFilter) - COMENTAT
//   // const [filters, setFilters] = useState({
//   //   tipus: "", // filtre per tipus de supermercat
//   //   responsableId: "" // filtre per responsable
//   // });

//   // GET inicial sense filtres
//   useEffect(() => {
//     loadSupermercats();
//   }, []); // Array buit - només es carrega una vegada

//   const loadSupermercats = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       // Sense filtres - càrrega directa
//       const res = await fetch(API_URL);
      
//       if (!res.ok) throw new Error("Error carregant supermercats");

//       const data = await res.json();
//       setSupermercats(data);
//     } catch (err) {
//       console.error("Error llistant: ", err);
//       setError("No s'han pogut carregar els supermercats.");
//     } finally {
//       setLoading(false);
//     }
//   };



//   // Handler per actualitzar supermercat - COMENTAT
//   // const handleSupermercatUpdated = (updatedSupermercat) => {
//   //   setSupermercats((prev) =>
//   //     prev.map((s) => (s.id === updatedSupermercat.id ? updatedSupermercat : s))
//   //   );
//   //   setSuccess("Supermercat actualitzat correctament.");
//   // };

//   // Handler per eliminar supermercat - COMENTAT
//   // const handleSupermercatDeleted = (deletedId) => {
//   //   setSupermercats((prev) => prev.filter((s) => s.id !== deletedId));
//   //   setSuccess("Supermercat eliminat correctament.");
//   // };

//   // Handler quan s'esborren totes les comandes d'un supermercat - COMENTAT
//   // const handleAllComandesDeleted = () => {
//   //   setSuccess("Totes les comandes han estat esborrades.");
//   // };

//   // Handler per canviar filtres - COMENTAT
//   // const handleFilterChange = (newFilters) => {
//   //   setFilters(newFilters);
//   // };

//   return (
//     <div className="container-fluid px-4">
//       <h1 className="h4 mb-3">Llista de Supermercats</h1>

//       {/* Filtres - COMENTAT */}
//       {/* <SupermercatFilter 
//         onFilterChange={handleFilterChange} 
//         filters={filters} 
//       /> */}

//       {/* Botó per anar a la ruta d'afegir supermercat */}
//       {/* <Link to="/add-supermercat" className="btn btn-primary btn-sm mb-3">
//         Afegir supermercat
//       </Link> */}

//       {loading && <p className="text-muted">Carregant supermercats...</p>}
//       {error && <Error>{error}</Error>}
//       {/* {success && <Success>{success}</Success>} */}

//       {!loading && !error && (
//         <div className="mt-3">
//           {supermercats.length === 0 ? (
//             <p className="text-muted">No hi ha supermercats.</p>
//           ) : (
//             <div className="list-group">
//               {supermercats.map((supermercat) => (
//                 <Supermercat
//                   key={supermercat.id}
//                   supermercat={supermercat}
//                   // Handlers comentats - només visualització
//                   // onSupermercatUpdated={handleSupermercatUpdated}
//                   // onSupermercatDeleted={handleSupermercatDeleted}
//                   // onAllComandesDeleted={handleAllComandesDeleted}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
