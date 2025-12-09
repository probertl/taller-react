import { Link } from "react-router-dom";

export default function AppMenu() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container">
        <div className="navbar-nav">
          <Link to="/productes" className="nav-link">
            Productes
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          <Link to="/noexisteix" className="nav-link">
            Noexisteix
          </Link>
        </div>
      </div>
    </nav>
  );
}
