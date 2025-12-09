import { useEffect, useState } from "react";
import Error from "./Error";


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
// revem els filtres del pare i no els començem aqui perque estan buits al principi
export default function SupermercatFilter({ onFilterChange, filters }) {
  const [error, setError] = useState(null);


  // si hi ha canvis al filtre es crida onFilterChange del pare
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    onFilterChange({ 
        ...filters, category: value });
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    onFilterChange({ 
        ...filters, maxPrice: value });
  };


  // si hi ha cambis al filtre es crida onFilterChange del pare
  const handleClearFilters = () => {
    onFilterChange({ category: "", maxPrice: "" });
  };


  // si hi ha cambis al filtre es crida onFilterChange del pare
  const hasActiveFilters = filters.category || filters.maxPrice;


  if (error) {
    return <Error>{error}</Error>;
  }


  return (
    <div className="card mb-3">
      <div className="card-body">
        <h6 className="card-title mb-3">
          {/* <i className="bi bi-funnel me-2"></i> */}
          Filtres de productes
        </h6>


        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label small">Categoria</label>
            <select className="form-select form-select-sm"
              value={filters.category}
              onChange={handleCategoryChange}
            >
              <option value="">Totes les categories</option>
              <option value="Menjar">Menjar</option>
              <option value="cosmetics">Cosmetics</option>
              <option value="Tecnología">Tecnología</option>
            </select>
          </div>


          <div className="col-md-4">
            <label className="form-label small">Preu</label>
            <input type="number" className="form-control form-control-sm"
              placeholder="Preu màxim"
              value={filters.maxPrice}
              onChange={handleMaxPriceChange}
            />
          </div>

          <div className="col-md-4 d-flex align-items-end">
            {hasActiveFilters && (
              <button className="btn btn-sm btn-outline-warning w-100"
                onClick={handleClearFilters}
              >
                Netejar
              </button>
            )}
          </div>
        </div>


        {/* {hasActiveFilters && (
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
        )} */}
      </div>
    </div>
  );
}
