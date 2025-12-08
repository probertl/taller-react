// components/Register.jsx
import { useState, useContext } from 'react';
import { UserContext } from '../App';

const API_URL = import.meta.env.VITE_API_URL + '/users';

const INITIAL_FORM = {
  username: '',
  password: '',
  role: 'empleat'
};

export default function Register({ setMessage, clearMessage }) {
  const { setUser } = useContext(UserContext);

  const [form, setForm] = useState(INITIAL_FORM);
  const { username, password, role } = form;

  // gestionar canvis als inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    // actualitzar l'state del formulari
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // gestionar enviament del formulari
  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessage();

    if (!username || !password) {
      setMessage({ type: 'warning', text: 'Cal usuari i contrasenya per registrar-se.' });
      return;
    }

    // Comprovem que posa 1234 com a contrasenya
    if (password !== '1234') {
      setMessage({ type: 'warning', text: 'La contrasenya per al registre ha de ser 1234.' });
      return;
    }

    try {
      // Comprovar si ja existeix
      const resCheck = await fetch(`${API_URL}?username=${username}`);
      const users = await resCheck.json();

      if (users.length > 0) {
        setMessage({ type: 'warning', text: 'Aquest usuari ja existeix.' });
        return;
      }

      // Crear nou usuari
      const resCreate = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, role })
      });

      if (!resCreate.ok) {
        setMessage({ type: 'error', text: 'No s\'ha pogut crear l\'usuari.' });
        return;
      }

      const newUser = await resCreate.json();
      
      // Login automàticperque aixo dispara el canvi de user al App.jsx
      setUser(newUser.username);
      setMessage({ type: 'success', text: 'Usuari creat i sessió iniciada.' });
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Error de connexió amb el servidor.' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Usuari</label>
        <input type="text" name="username" className="form-control" placeholder="Nom d'usuari"
          value={username} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label className="form-label">Contrasenya</label>
        <input type="password" name="password" className="form-control" placeholder="1234" 
          value={password} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label className="form-label">Role</label>
        <select name="role" className="form-select"
          value={role} onChange={handleChange}>
            {/* opcions */}
          <option value="empleat">Empleat</option>
          <option value="manager">Manager</option>
        </select>
      </div>

      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-success">
          Registrar
        </button>
      </div>
    </form>
  );
}
