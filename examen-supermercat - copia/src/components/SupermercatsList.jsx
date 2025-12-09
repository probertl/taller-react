// components/SupermercatsList.jsx
// Component principal que mostra el llistat de supermercats amb filtres
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Supermercat from "./Supermercat";
import SupermercatFilter from "./SupermercatFilter";
import Error from "./Error";
import Success from "./Success";

const API_URL = import.meta.env.VITE_API_URL + '/supermercats';

export default function SupermercatsList() {
  // Estats principals
  const [supermercats, setSupermercats] = useState([]); // llista de supermercats
  const [loading, setLoading] = useState(true); // si estem carregant
  const [error, setError] = useState(null); // missatge d'error
  const [success, setSuccess] = useState(null); // missatge d'èxit
  
  // Filtres gestionats localment (Lifting State Up des de SupermercatFilter)
  const [filters, setFilters] = useState({
    tipus: "", // filtre per tipus de supermercat
    responsableId: "" // filtre per responsable
  });

  // GET amb filtres - es torna a carregar quan canvien els filtres
  useEffect(() => {
    loadSupermercats();
  }, [filters]);

  const loadSupermercats = async () => {
    try {
      setLoading(true);
      setError(null);

      // Construir query params segons els filtres actius
      const params = new URLSearchParams();
      if (filters.tipus) {
        params.append('tipus', filters.tipus);
      }
      if (filters.responsableId) {
        params.append('responsableId', filters.responsableId);
      }

      const url = params.toString() ? `${API_URL}?${params.toString()}` : API_URL;
      const res = await fetch(url);
      
      if (!res.ok) throw new Error("Error carregant supermercats");

      const data = await res.json();
      setSupermercats(data);
    } catch (err) {
      console.error("Error llistant: ", err);
      setError("No s'han pogut carregar els supermercats.");
    } finally {
      setLoading(false);
    }
  };



  // Handler per actualitzar supermercat
  const handleSupermercatUpdated = (updatedSupermercat) => {
    setSupermercats((prev) =>
      prev.map((s) => (s.id === updatedSupermercat.id ? updatedSupermercat : s))
    );
    setSuccess("Supermercat actualitzat correctament.");
  };

  // Handler per eliminar supermercat
  const handleSupermercatDeleted = (deletedId) => {
    setSupermercats((prev) => prev.filter((s) => s.id !== deletedId));
    setSuccess("Supermercat eliminat correctament.");
  };

  // Handler quan s'esborren totes les comandes d'un supermercat
  const handleAllComandesDeleted = () => {
    setSuccess("Totes les comandes han estat esborrades.");
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="h4 mb-3">Llista de Supermercats</h1>

      {/* Filtres */}
      <SupermercatFilter 
        onFilterChange={handleFilterChange} 
        filters={filters} 
      />

      {/* Botó per anar a la ruta d'afegir supermercat */}
      <Link to="/add-supermercat" className="btn btn-primary btn-sm mb-3">
        Afegir supermercat
      </Link>

      {loading && <p className="text-muted">Carregant supermercats...</p>}
      {error && <Error textToShow={error} />}
      {success && <Success textToShow={success} />}

      {!loading && !error && (
        <div className="mt-3">
          {supermercats.length === 0 ? (
            <p className="text-muted">No hi ha supermercats.</p>
          ) : (
            <div className="list-group">
              {supermercats.map((supermercat) => (
                <Supermercat
                  key={supermercat.id}
                  supermercat={supermercat}
                  onSupermercatUpdated={handleSupermercatUpdated}
                  onSupermercatDeleted={handleSupermercatDeleted}
                  onAllComandesDeleted={handleAllComandesDeleted}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
