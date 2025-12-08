// components/Login.jsx
import { useState, useContext } from 'react';
import { UserContext } from '../App';

const API_URL = import.meta.env.VITE_API_URL + '/users';



export default function Login({setMessage, clearMessage }) {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessage();

    if (!username || !password) {
      setMessage({ type: 'warning', text: 'Cal usuari i contrasenya.' });
      return;
    }

    try {
      // Busquem l'usuari al json-server
      const res = await fetch(`${API_URL}?username=${username}`);
      const user = await res.json();

      if (user.length === 0) {
        setMessage({ type: 'error', text: 'L’usuari no existeix.' });
        return;
      }

      // Comprovem la contrasenya FICTÍCIA
      if (password !== '1234') {
        setMessage({ type: 'error', text: 'Contrasenya incorrecta.' });
        return;
      }

      // Si a la peticio d'usuari ha trobat un usuari, l'agafem que es la posicio 0
      const foundUser = user[0];
      // Login correcte, guardem el user al context i es dispara al App.jsx
      setUser(foundUser.username);
      setMessage({ type: 'success', text: 'Login correcte. Benvingut/da!' });
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Error de connexió amb el servidor.' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Usuari</label>
        <input type="text" className="form-control" placeholder="Nom d'usuari (patri, patricia...)"
          value={username} onChange={(e) => setUsername(e.target.value)}/>
      </div>

      <div className="mb-3">
        <label className="form-label">Contrasenya</label>
        <input
          type="password" className="form-control" placeholder="1234" 
          value={password} onChange={(e) => setPassword(e.target.value)}/>
      </div>

      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-primary">
          Entrar
        </button>
      </div>
    </form>
  );
}
