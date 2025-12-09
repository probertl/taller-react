import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Error from './Error';
import Warning from './Warning';
import Succes from './Succes';


export default function Auth() {
  const [mode, setMode] = useState('login'); // 'login' o 'register'
  const [message, setMessage] = useState(null);
  // { type: 'error' | 'warning' | 'success', text: '...' }


  const clearMessage = () => setMessage(null);


  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light p-3">
      {/* Títol */}
      <div className="text-center mb-3">
        <h1 className="fw-bold">
          Examen React
        </h1>
        <p className="text-muted small">
          Inicia sessió o crea el teu compte
        </p>
      </div>


      {/* Targeta */}
      <div className="card shadow p-3" style={{ maxWidth: '400px', width: '100%' }}>
        {/* Botons Login / Register */}
        <div className="d-flex gap-2 mb-3">
          <button
            className={`btn btn-sm w-50 ${mode === 'login' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => { setMode('login'); clearMessage(); }}
          >
            Iniciar sessió
          </button>
          <button
            className={`btn btn-sm w-50 ${mode === 'register' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => { setMode('register'); clearMessage(); }}
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
            {message.type === 'error' && <Error>{message.text}</Error>}
            {message.type === 'warning' && <Warning>{message.text}</Warning>}
            {message.type === 'success' && <Success>{message.text}</Success>}
          </div>
        )}
      </div>
    </div>
  );
}
