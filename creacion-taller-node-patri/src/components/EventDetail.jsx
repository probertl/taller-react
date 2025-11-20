import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const API_URL = `${import.meta.env.VITE_API_URL}/events`;

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Esdeveniment no trobat');
        }
        return res.json();
      })
      .then(data => setEvent(data))
      .catch(err => setError(err.message));
  }, [id]);

  if (error) return (
        <div className="container text-center py-5">
            <h1 className="display-4 fw-bold">No s'ha trobat</h1>
            <p className="lead">L'esdeveniment sol·licitat no existeix.</p>
            <div className="mt-4 d-flex justify-content-center gap-2">
                <Link to="/" className="btn btn-primary">Inici</Link>
                <Link to="/events" className="btn btn-outline-secondary">Tornar al llistat</Link>
            </div>
        </div>
    );
  if (!event) return <p>Carregant...</p>;

  return (
    <div>
      <h2>{event.title}</h2>
      <p><strong>Data:</strong> {event.date}</p>
      <p><strong>Ciutat:</strong> {event.city}</p>
      <p><strong>Descripció:</strong> {event.description}</p>
    </div>
  );
}
