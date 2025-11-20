import { useState, useContext } from 'react';
import { UserContext } from '../App';

const API_URL = `${import.meta.env.VITE_API_URL}/users`;

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUsuari } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('No es pot connectar amb el servidor');
      const users = await res.json();

      const found = users.find(u => u.username === username.trim());

      if (found) {
        if (password === "1234") {
          setUsuari({ username: found.username });
        } else {
          setError("Contrasenya incorrecta");
        }
      } else {
        setError('Usuari no trobat');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-11 col-sm-9 col-md-7 col-lg-5 col-xl-4">
            <div className="card shadow-lg border-0" style={{ minWidth: '320px' }}>
              <div className="card-body p-4">
                <div className="text-center mb-3">
                  <h1 className="h3 fw-bold text-primary mb-2">Benvingut/da</h1>
                  <p className="text-muted small mb-0">Introdueix el teu nom d'usuari i contrasenya</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Nom d'usuari</label>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="form-control"
                      placeholder="Introdueix el teu nom"
                      autoComplete="username"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contrasenya</label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="form-control"
                      placeholder="1234"
                      autoComplete="current-password"
                    />
                  </div>

                  {error && (
                    <div className="alert alert-danger py-2 small" role="alert">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Validant...
                      </>
                    ) : (
                      'Entrar'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
