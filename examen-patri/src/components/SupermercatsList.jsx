// components/SupermercatsList.jsx
import { useEffect, useState } from "react";
import Error from "./Error";
import Supermercat from "./Supermercat";

const API_URL = import.meta.env.VITE_API_URL + "/supermercats";

export default function SupermercatsList() {
  const [supermercats, setSupermercats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // GET inicial de tots els supermercats
  useEffect(() => {
    const loadSupermercats = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error("Error carregant supermercats");
        }

        const data = await res.json();
        setSupermercats(data);
      } catch (err) {
        console.error("Error llistant supermercats: ", err);
        setError("No s'han pogut carregar els supermercats.");
      } finally {
        setLoading(false);
      }
    };

    loadSupermercats();
  }, []);

  return (
    <div>
      <h1 className="h3 mb-3">Llista de supermercats</h1>

      {loading && <p>Carregant supermercats...</p>}
      {error && <Error textToShow={error} />}

      {!loading && !error && (
        <div className="mt-3">
          {supermercats.length === 0 ? (
            <p className="text-muted">No hi ha supermercats.</p>
          ) : (
            <div className="list-group">
              {supermercats.map((sup) => (
                <Supermercat key={sup.id} supermarket={sup} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
