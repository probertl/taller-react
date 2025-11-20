// src/components/NotFound.jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container text-center py-5">
      <h1 className="display-4 fw-bold">No s'ha trobat</h1>
      <p className="lead">El recurs sol·licitat no existeix o s'ha mogut.</p>
      <div className="mt-4 d-flex justify-content-center gap-2">
        <Link to="/" className="btn btn-primary">Inici</Link>
        <Link to="/events" className="btn btn-outline-secondary">Tornar al llistat</Link>
      </div>
    </div>
  );
}
