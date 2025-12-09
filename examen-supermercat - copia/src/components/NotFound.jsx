// components/NotFound.jsx
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-center py-5">
      <h1 className="display-1">404</h1>
      <p className="lead">Pàgina no trobada</p>
      <Link to="/" className="btn btn-primary">
        <i className="bi bi-house-door me-2"></i>
        Tornar a l'inici
      </Link>
    </div>
  );
}
