import { useContext } from "react";
import { UserContext } from "../App";
export default function About() {
  const { user } = useContext(UserContext);


  return (
    <div>
      <h1 className="h3 mb-3">About</h1>
      <p className="lead">
        L'examen de la Patri et dona la benvinguda:{" "}
        <strong>{user}</strong>
      </p>
      <p className="text-muted">
        Aquesta és una pàgina d'exemple per complir l'enunciat (ruta About).
      </p>
    </div>
  );
}
