import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../App';

export default function Header() {
  const { usuari, setUsuari } = useContext(UserContext);

  const handleLogout = () => {
    setUsuari(null);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container-fluid">
        <span className="navbar-brand">Diccionari Italià</span>
        <div className="navbar-nav me-auto">
          <NavLink
            to="/"
            className={({ isActive }) => 
              isActive ? 'nav-link active fw-bold' : 'nav-link'
            }
            end
          >
            Inici
          </NavLink>
          <NavLink
            to="/parole"
            className={({ isActive }) => 
              isActive ? 'nav-link active fw-bold' : 'nav-link'
            }
          >
            Vocabulari
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => 
              isActive ? 'nav-link active fw-bold' : 'nav-link'
            }
          >
            About
          </NavLink>
        </div>
        <div className="d-flex align-items-center gap-3">
          {usuari && (
            <span className="text-secondary">
              👤 {usuari.username}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="btn btn-outline-danger btn-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
