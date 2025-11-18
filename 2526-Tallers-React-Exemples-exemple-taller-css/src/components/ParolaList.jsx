import { useState, useEffect } from 'react';
import Parola from './Parola';
import AddParola from './AddParola';

const INITIAL_PAROLE = [
  { id: 1, word: 'ciao', translation: 'hola' },
  { id: 2, word: 'a domani', translation: 'Fins demà' },
  { id: 3, word: 'grazie', translation: 'gràcies' },
  { id: 4, word: 'per favore', translation: 'si us plau' },
  { id: 5, word: 'acqua', translation: 'aigua' },
  { id: 6, word: 'vino', translation: 'vi' },
  { id: 7, word: 'birra', translation: 'cervesa' },
  { id: 8, word: 'pane', translation: 'pa' },
  { id: 9, word: 'formaggio', translation: 'formatge' },
  { id: 10, word: 'prosciutto', translation: 'pernil' } 
];

// const STORAGE_KEY = 'vocabulari-parole';
const API_URL = `${import.meta.env.VITE_API_URL}/parole`;

export default function ParolaList() {
  const [parole, setParole] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar dades del servidor amb .then/.catch quan es munta el component
  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error carregant dades del servidor');
        }
        return response.json();
      })
      .then(data => {
        setParole(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setError(err.message);
        setLoading(false);
        // Si falla, mostrem array buit o podries usar INITIAL_PAROLE
        setParole(INITIAL_PAROLE);
      });
  }, []);

  // Elimina una paraula per id (amb async/await)
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error esborrant la paraula');
      }

      // Actualitzem l'estat local
      setParole(prev => prev.filter(p => p.id !== id));
      
      // Guardem al localStorage (opcional)
      // const updatedParole = parole.filter(p => p.id !== id);
      // localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedParole));
    } catch (err) {
      console.error('Error:', err);
      alert('Error esborrant la paraula del servidor');
    }
  };

  // Afegir nova paraula (amb .then/.catch)
  const handleAdd = (data) => {
    // No enviem l'ID, json-server el generarà automàticament
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error afegint la paraula');
        }
        return response.json();
      })
      .then(savedParola => {
        // Actualitzem l'estat amb la paraula guardada (té l'ID del servidor)
        setParole(prev => [...prev, savedParola]);
        
        // Guardem al localStorage (opcional)
        // const updatedParole = [...parole, savedParola];
        // localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedParole));
        
        setShowForm(false);
      })
      .catch(err => {
        console.error('Error:', err);
        alert('Error afegint la paraula al servidor');
      });
  };

  // Actualitzar paraula existent (amb async/await)
  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Error actualitzant la paraula');
      }

      const updatedParola = await response.json();

      // Actualitzem l'estat local
      setParole(prev => prev.map(p => 
        p.id === id ? updatedParola : p
      ));

      // Guardem al localStorage (opcional)
      // const updatedParole = parole.map(p => 
      //   p.id === id ? updatedParola : p
      // );
      // localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedParole));
    } catch (err) {
      console.error('Error:', err);
      alert('Error actualitzant la paraula al servidor');
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Vocabulari</h2>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregant...</span>
          </div>
          <p className="mt-2">Carregant dades del servidor...</p>
        </div>
      ) : (
        <>
          {error && (
            <div className="alert alert-warning" role="alert">
              ⚠️ {error} (Utilitzant dades locals)
            </div>
          )}

          <div className="mb-3">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => setShowForm(v => !v)}
            >
              {showForm ? 'Amagar formulari' : '+ Nova paraula'}
            </button>
          </div>

          {showForm && (
            <AddParola 
              onCancel={() => setShowForm(false)} 
              onAdd={handleAdd}
            />
          )}

          <ul className="list-group">
            {parole.map(p => (
              <li key={p.id} className="list-group-item">
                <Parola 
                  parola={p} 
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}







