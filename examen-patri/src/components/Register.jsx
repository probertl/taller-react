// components/Register.jsx
import { useState, useContext } from 'react';
import { UserContext } from '../App';

const API_URL = import.meta.env.VITE_API_URL + '/users'; // json-server --watch db.json --port 3000

const INITIAL_FORM = {
  username: '',
  password: ''
};

export default function Register({ setMessage, clearMessage }) {
  const { setUser } = useContext(UserContext);

  const [form, setForm] = useState(INITIAL_FORM);
  const { username, password } = form;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessage();

    if (!username || !password) {
      setMessage({ type: 'warning', text: 'Cal usuari i contrasenya per registrar-se.' });
      return;
    }

    if (password !== '1234') {
      setMessage({ type: 'warning', text: 'La contrasenya per al registre ha de ser 1234.' });
      return;
    }

    try {
      // Comprovar si ja existeix
      const resCheck = await fetch(`${API_URL}?username=${username}`);
      const user = await resCheck.json();

      if (user.length > 0) {
        setMessage({ type: 'warning', text: 'Aquest usuari ja existeix.' });
        return;
      }

      // Crear nou usuari al servidor json-server
      const resCreate = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });

      if (!resCreate.ok) {
        setMessage({ type: 'error', text: 'No s’ha pogut crear l’usuari.' });
        return;
      }

      const newUser = await resCreate.json();

      // Com si haguera fet login perque aixi es dispara al App.jsx
      setUser(newUser.username);
      setMessage({ type: 'success', text: 'Usuari creat i sessió iniciada.' });

      // Resetejar formulari
      setForm(INITIAL_FORM);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Error de connexió amb el servidor.' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nou usuari</label>
        <input
          type="text" name="username" className="form-control" placeholder="Nom d'usuari nou" 
          value={username} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label className="form-label">Contrasenya</label>
        <input
          type="password" name="password" className="form-control" placeholder="1234"
          value={password} onChange={handleChange} />
      </div>

      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-success">
          Registrar
        </button>
      </div>
    </form>
  );
}
