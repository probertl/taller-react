// components/SupermercatFilter.jsx
import { useEffect, useState } from "react";

const API_URL_USERS = import.meta.env.VITE_API_URL + '/users';

/**
 * Component SupermercatFilter
 * 
 * ESTRATÈGIA DE COMPARTICIÓ DE DADES: Lifting State Up
 * 
 * Justificació:
 * - Els filtres (tipus i responsableId) s'emmagatzemen a SupermercatsList (component pare)
 * - Aquest component rep una funció callback (onFilterChange) del pare
 * - Quan l'usuari canvia els filtres, es crida onFilterChange passant els nous valors
 * - SupermercatsList actualitza el seu estat i torna a fer la petició GET amb els nous filtres
 * - Els filtres es passen com props per mantenir sincronització entre UI i dades
 * 
 * Avantatges:
 * - Single source of truth: els filtres estan en un sol lloc (SupermercatsList)
 * - Encapsulació: tota la lògica de supermercats està en un mateix lloc
 * - Fàcil de depurar i mantenir
 * - El filtre i la llista estan cohesionats en el mateix context
 * 
 * Exemple de peticions amb query params:
 * - Filtrar per tipus: GET /supermercats?tipus=urbà
 * - Filtrar per responsable: GET /supermercats?responsableId=2
 * - Filtrat combinat: GET /supermercats?tipus=urbà&responsableId=2
 */
export default function SupermercatFilter({ onFilterChange, filters }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Carregar llista d'usuaris per al filtre de responsables
    const loadUsers = async () => {
      try {
        const res = await fetch(API_URL_USERS);
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error carregant usuaris:", err);
      }
    };
    loadUsers();
  }, []);

  const handleTipusChange = (e) => {
    const value = e.target.value;
    onFilterChange({ tipus: value, responsableId: filters.responsableId });
  };

  const handleResponsableChange = (e) => {
    const value = e.target.value;
    onFilterChange({ tipus: filters.tipus, responsableId: value });
  };

  const handleClearFilters = () => {
    onFilterChange({ tipus: "", responsableId: "" });
  };

  const hasActiveFilters = filters.tipus !== '' || filters.responsableId !== '';

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h6 className="card-title mb-3">
          <i className="bi bi-funnel me-2"></i>
          Filtres de supermercats
        </h6>

        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label small">Tipus de supermercat</label>
            <select
              className="form-select form-select-sm"
              value={filters.tipus}
              onChange={handleTipusChange}
            >
              <option value="">Tots els tipus</option>
              <option value="urbà">Urbà</option>
              <option value="hipermercat">Hipermercat</option>
              <option value="costaner">Costaner</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label small">Responsable</label>
            <select
              className="form-select form-select-sm"
              value={filters.responsableId}
              onChange={handleResponsableChange}
            >
              <option value="">Tots els responsables</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username} ({user.role})
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4 d-flex align-items-end">
            {hasActiveFilters && (
              <button
                className="btn btn-sm btn-outline-secondary w-100"
                onClick={handleClearFilters}
              >
                <i className="bi bi-x-circle me-1"></i>
                Netejar filtres
              </button>
            )}
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mt-2">
            <small className="text-muted">
              <i className="bi bi-info-circle me-1"></i>
              Filtres actius:
              {filters.tipus && <span className="badge bg-primary ms-1 me-1">{filters.tipus}</span>}
              {filters.responsableId && (
                <span className="badge bg-secondary">
                  {users.find(u => u.id === filters.responsableId)?.username}
                </span>
              )}
            </small>
          </div>
        )}
      </div>
    </div>
  );
}
