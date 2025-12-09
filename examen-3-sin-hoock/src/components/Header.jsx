import { Link } from 'react-router-dom';

export default function Header({ user, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Gestió de Productes
        </Link>

        <div className="navbar-nav me-auto">
          <Link to="/" className="nav-link text-white">
            Productes
          </Link>
          <Link to="/about" className="nav-link text-white">
            About
          </Link>
        </div>

        <div className="d-flex align-items-center gap-3">
          <span className="text-white">
            <i className="bi bi-person-circle me-1"></i>
            {user || "Usuari"}
          </span>
          
          <button
            className="btn btn-sm btn-outline-light"
            onClick={onLogout}
          >
            <i className="bi bi-box-arrow-right me-1"></i>
            Tancar sessió
          </button>
        </div>
      </div>
    </nav>
  );
}
