import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function Login({ onLogin, onMessage }) {
  const [form, setForm] = useState({ username: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.username.trim()) {
      onMessage({ type: 'error', text: 'El nom d\'usuari és obligatori' });
      return;
    }

    try {
      const res = await fetch(`${API_URL}/users?username=${form.username}`);
      const users = await res.json();

      if (users.length > 0) {
        onLogin(users[0].username);
      } else {
        onMessage({ type: 'error', text: 'Usuari no trobat' });
      }
    } catch (error) {
      onMessage({ type: 'error', text: 'Error al iniciar sessió' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Nom d'usuari</label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Introdueix el teu usuari"
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Iniciar sessió
      </button>
    </form>
  );
}
