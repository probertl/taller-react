// Importem les eines que ens deixen guardar dades i compartir-les entre pantalles
import { useState, useContext } from 'react';
// Importem el lloc on guardem l'usuari que ha entrat
import { UserContext } from '../App';

// Guardem l'adreça de la web on buscarem els usuaris
const API_URL = `${import.meta.env.VITE_API_URL}/users`;
// Imprimim l'adreça per veure si està bé
console.log('API_URL:', API_URL);

// Aquesta és la pantalla d'entrada
export default function Login() {
  // Guardem el nom que escriu l'usuari
  const [username, setUsername] = useState('');
  // Guardem la contrasenya que escriu l'usuari
  const [password, setPassword] = useState('');
  // Guardem si hi ha algun error
  const [error, setError] = useState(null);
  // Guardem si estem esperant resposta del servidor
  const [loading, setLoading] = useState(false);
  // Ens permet guardar l'usuari que ha entrat
  const { setUsuari } = useContext(UserContext);

  // Quan l'usuari prem el botó d'entrar
  const handleSubmit = async (e) => {
    // Evitem que la pàgina es recarregui
    e.preventDefault();
    // Esborrem errors anteriors
    setError(null);
    // Posem que estem esperant resposta
    setLoading(true);

    try {
      // Demanem la llista d'usuaris al servidor
      const res = await fetch(API_URL);
      // Si el servidor no respon bé, mostrem error
      if (!res.ok) throw new Error('No es pot connectar amb el servidor');
      // Convertim la resposta en una llista d'usuaris
      const users = await res.json();

      // Busquem si el nom que ha posat l'usuari existeix
      const found = users.find(u => u.username === username.trim());

      // Si trobem l'usuari
      if (found) {
        // Comprovem si la contrasenya és la correcta
        if (password === "1234") {
          // Guardem l'usuari com a autenticat
          setUsuari({ username: found.username });
          // Imprimim que ha entrat
          console.log('Usuari autenticat:', found.username);
        } else {
          // Si la contrasenya no és correcta, mostrem error
          setError("Contrasenya incorrecta");
        }
      } else {
        // Si no trobem l'usuari, mostrem error
        setError('Usuari no trobat');
      }
    } catch (err) {
      // Si hi ha algun problema, mostrem l'error
      setError(err.message);
    } finally {
      // Ja hem acabat d'esperar resposta
      setLoading(false);
    }
  };

  // Aquí dibuixem la pantalla d'entrada
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-11 col-sm-9 col-md-7 col-lg-5 col-xl-4">
            <div className="card shadow-lg border-0" style={{ minWidth: '320px' }}>
              <div className="card-body p-4">
                <div className="text-center mb-3">
                  {/* Títol de la pantalla */}
                  <h1 className="h3 fw-bold text-primary mb-2">Benvingut/da</h1>
                  {/* Explicació per l'usuari */}
                  <p className="text-muted small mb-0">Introdueix el teu nom d'usuari i contrasenya</p>
                </div>

                {/* Formulari d'entrada */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    {/* Camp per escriure el nom d'usuari */}
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
                    {/* Camp per escriure la contrasenya */}
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

                  {/* Si hi ha error, el mostrem */}
                  {error && (
                    <div className="alert alert-danger py-2 small" role="alert">
                      {error}
                    </div>
                  )}

                  {/* Botó per entrar */}
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        {/* Rodeta de càrrega mentre esperem */}
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
