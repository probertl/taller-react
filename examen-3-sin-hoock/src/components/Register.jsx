import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function Register({ onRegister, onMessage }) {
  const [form, setForm] = useState({ username: '', role: 'user' });

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
      // Comprovar si l'usuari ja existeix
      const checkRes = await fetch(`${API_URL}/users?username=${form.username}`);
      const existingUsers = await checkRes.json();

      if (existingUsers.length > 0) {
        onMessage({ type: 'error', text: 'Aquest usuari ja existeix' });
        return;
      }

      // Crear nou usuari
      const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          role: form.role
        })
      });

      if (res.ok) {
        const newUser = await res.json();
        onRegister(newUser.username);
      } else {
        onMessage({ type: 'error', text: 'Error al crear l\'usuari' });
      }
    } catch (error) {
      onMessage({ type: 'error', text: 'Error al registrar-se' });
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
      <div className="mb-3">
        <label htmlFor="role" className="form-label">Rol</label>
        <select
          className="form-select"
          id="role"
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="user">Usuari</option>
          <option value="admin">Administrador</option>
        </select>
      </div>
      <button type="submit" className="btn btn-success w-100">
        Registrar-se
      </button>
    </form>
  );
}
