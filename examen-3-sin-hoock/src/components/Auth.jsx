import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Error from './Error';
import Success from './Success';

export default function Auth({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [message, setMessage] = useState(null);

  const clearMessage = () => setMessage(null);

  const handleLogin = (username) => {
    setMessage({ type: 'success', text: `Benvingut, ${username}!` });
    setTimeout(() => {
      onLogin(username);
    }, 1000);
  };

  const handleRegister = (username) => {
    setMessage({ type: 'success', text: `Usuari ${username} registrat correctament!` });
    setTimeout(() => {
      setMode('login');
      clearMessage();
    }, 2000);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light p-3">
      <div className="text-center mb-3">
        <h1 className="fw-bold">Gestió de Productes</h1>
        <p className="text-muted small">Inicia sessió o crea el teu compte</p>
      </div>

      <div className="card shadow p-3" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="btn-group mb-3" role="group">
          <button
            className={`btn ${mode === 'login' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => {
              setMode('login');
              clearMessage();
            }}
          >
            Iniciar sessió
          </button>
          <button
            className={`btn ${mode === 'register' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => {
              setMode('register');
              clearMessage();
            }}
          >
            Registrar-se
          </button>
        </div>

        {message && message.type === 'error' && (
          <Error>{message.text}</Error>
        )}
        {message && message.type === 'success' && (
          <Success>{message.text}</Success>
        )}

        {mode === 'login' ? (
          <Login onLogin={handleLogin} onMessage={setMessage} />
        ) : (
          <Register onRegister={handleRegister} onMessage={setMessage} />
        )}
      </div>
    </div>
  );
}
