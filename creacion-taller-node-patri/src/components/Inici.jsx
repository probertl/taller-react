import { Link } from "react-router-dom";

export default function Inici() {
  return (
    <>
      <div className="container py-4 text-center alingn-items-center">
        <h1>Pàgina d'inici</h1>
        <p>Benvingut a l’aplicació d’esdeveniments!</p>
      </div>
      <div className="mt-4 d-flex justify-content-center gap-2">
        <Link to="/events" className="btn btn-primary">Veure esdeveniments</Link>
        <Link to="/contacte" className="btn btn-outline-secondary">Contacte</Link>
      </div>
    </>

  );
}
