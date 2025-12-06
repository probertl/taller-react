import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center">
      <h1 className="display-6 mb-3">404 - Pàgina no trobada</h1>
      <p className="mb-4">
        La ruta que has demanat no existeix.
      </p>
      <Link className="btn btn-primary" to="/">
        Tornar a Productes
      </Link>
    </div>
  );
}
