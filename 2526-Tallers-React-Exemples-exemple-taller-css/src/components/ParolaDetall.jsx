import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_URL = `${import.meta.env.VITE_API_URL}/parole`;
// const STORAGE_KEY = 'vocabulari-parole';

export default function ParolaDetall() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    setItem(null);
    
    fetch(`${API_URL}/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('No s\'ha pogut carregar la paraula');
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        setItem(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error carregant paraula:', err);
        if (!isMounted) return;
        
        // Fallback a localStorage (opcional)
        // let found = false;
        // try {
        //   const stored = localStorage.getItem(STORAGE_KEY);
        //   if (stored) {
        //     const arr = JSON.parse(stored);
        //     const foundItem = arr.find((p) => String(p.id) === String(id));
        //     if (foundItem) {
        //       setItem(foundItem);
        //       found = true;
        //     }
        //   }
        // } catch (localErr) {
        //   console.error('Error localStorage:', localErr);
        // }
        // if (!found) {
        setError(err.message);
        // }
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <div className="container">
      <div className="mb-4">
        <h2>Detall de la paraula</h2>
        <Link to="/parole" className="btn btn-secondary btn-sm">← Tornar al llistat</Link>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregant...</span>
          </div>
        </div>
      ) : error && !item ? (
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      ) : item ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{item.word}</h5>
            <h6 className="card-subtitle mb-3 text-muted">{item.translation}</h6>
            <hr />
            <p className="card-text">
              <strong>Definició:</strong>{' '}
              Paraula italiana "<em>{item.word}</em>" que significa "<em>{item.translation}</em>".
            </p>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning" role="alert">
          No s'ha trobat la paraula.
        </div>
      )}
    </div>
  );
}
