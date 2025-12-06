// components/Auth.jsx
import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Error from './Error';
import Warning from './Warning';
import Success from './Success';

export default function Auth() {
  const [mode, setMode] = useState('login'); // 'login' o 'register'
  const [message, setMessage] = useState(null); 
  // { type: 'error' | 'warning' | 'success', text: '...' }

  const clearMessage = () => setMessage(null);

  return (
    <div className="d-flex flex-column align-items-center min-vh-100 bg-light pt-5">
      {/* Títol */}
      <div className="text-center mb-3">
        <h1 className="fw-bold" style={{ fontSize: '3rem', color: '#6f42c1' }}>
          Examen React
        </h1>
        <p className="text-muted">
          Inicia sessió o crea el teu compte
        </p>
      </div>

      {/* Targeta */}
      <div className="card shadow p-4" style={{ maxWidth: '450px', width: '100%' }}>
        {/* Botons Login / Register */}
        <div className="d-flex justify-content-center mb-4">
          <button
            className={`btn me-2 ${mode === 'login' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => { setMode('login'); clearMessage(); }}
            style={{ flex: 1 }}
          >
            Iniciar sessió
          </button>
          <button
            className={`btn ${mode === 'register' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => { setMode('register'); clearMessage(); }}
            style={{ flex: 1 }}
          >
            Registrar-se
          </button>
        </div>

        {/* Formulari segons mode */}
        {mode === 'login' ? (
            // Se pasa el setMessage y clearMessage a Login
            // Perque Login pot voler mostrar missatges
            // igual que Register
            // Le pasa el setMessage y clearMessage a Register 
            // Porque al pasarle el setMessage si da algun error lo pone en ese valor y entonces se muestra el mensaje con lo de {message && ...}
          <Login setMessage={setMessage} clearMessage={clearMessage} />
        ) : (
          <Register setMessage={setMessage} clearMessage={clearMessage} />
        )}

        {/* Missatges */}
        {message && (
          <div className="mt-3">
            {message.type === 'error' && <Error textToShow={message.text} />}
            {message.type === 'warning' && <Warning textToShow={message.text} />}
            {message.type === 'success' && <Success textToShow={message.text} />}
          </div>
        )}
      </div>
    </div>
  );
}
