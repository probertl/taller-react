import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../App';
// Metode que li arriba del pare per borrar l’usuari actual
export default function Header({ onLogout }) {
  const { user } = useContext(UserContext);


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        {/* Al app es defineix que es / que de moment es el about */}
        <Link to="/" className="navbar-brand">
          Examen Patri
        </Link>
        <div className="navbar-nav me-auto">
          <Link to="/products" className="nav-link text-white">
            Llistat productes
          </Link>
          <Link to="/add-product" className="nav-link text-white">
            Afegir producte
          </Link>
          <Link to="/about" className="nav-link text-white">
            About
          </Link>
          <Link to="/noexisteix" className="nav-link text-white">
            No existeix
          </Link>

        </div>
        <div className="d-flex align-items-center gap-3">
          <span className="text-white">
            <i className="bi bi-person-circle me-1"></i>
            {user || "Usuari"}
          </span>
          <button className="btn btn-sm btn-outline-light"
            onClick={onLogout} // Metode del pare per borrar l’usuari actual
          >
            <i className="bi bi-box-arrow-right me-1"></i>
            Tancar sessió
          </button>
        </div>
      </div>
    </nav>
  );
}
