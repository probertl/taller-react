import { useContext } from "react";
import { Link} from "react-router-dom";
import { UserContext } from "../App";

export default function Header({ onLogout }) {
  const { user } = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Examen Productes
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Productes
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              {/* Ruta que no existeix per forçar NotFound */}
              <Link className="nav-link" to="/noexisteix">
                No existeix
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            <span className="text-light">
              <i className="bi bi-person-circle me-1" />
              {user}
            </span>
            {/* Aquest botó crida la funció de logout que ve de App.
            Quan hi fas clic, es borra l’usuari i tornes a la pantalla de login. */}
            <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
