import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

export default function Header() {
  const { usuari, setUsuari } = useContext(UserContext);

  const handleLogout = () => {
    setUsuari(null);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-info py-4">
      <div className="container-fluid">
        {/* Nom de l'app */}
        <Link to="/" className="navbar-brand fw-bold text-white">
          La App de Patri
        </Link>

        {/* Botó per pantalles petites (hamburguesa) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contingut de la navbar */}
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          {/* Enllaços de navegació */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">Inici</Link>
            </li>
            <li className="nav-item">
              <Link to="/events" className="nav-link text-white">Esdeveniments</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link text-white">Contacte</Link>
            </li>
            {usuari && (
              <li className="nav-item d-flex align-items-center ms-3">
                <span className="text-white me-2">
                  <i className="bi bi-person-fill"></i> <strong>{usuari.username}</strong>
                </span>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-outline-light"
                >
                  <i className="bi bi-box-arrow-right"></i> Sortir
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
