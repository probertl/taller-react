import { useState, useEffect } from 'react';

// Estat inicial del formulari
const INITIAL_FORM = {
  word: '',
  translation: ''
};
 
export default function ParolaEdit({ onCancel, onUpdate, parola }) {
  
  const [form, setForm] = useState(parola || INITIAL_FORM);

  // Carregar dades quan canvia la paraula
  // useEffect(() => {
  //   if (parola) {
  //     setForm(parola);
  //   }
  // }, [parola]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.word || !form.translation) return;
    // Passar dades actualitzades al pare (sense l'id, només word i translation)
    const { word, translation } = form;
    onUpdate && onUpdate({ word, translation });
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center bg-warning">
        <span className="fw-bold">Editar paraula</span>
        <button type="button" className="btn-close" onClick={onCancel}></button>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Paraula</label>
            <input
              type="text"
              name="word"
              className="form-control"
              value={form.word}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Traducció</label>
            <input
              type="text"
              name="translation"
              className="form-control"
              value={form.translation}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-flex gap-2">
            <button type="button" className="btn btn-secondary" onClick={() => setForm(parola)}>
              Restaurar
            </button>
            <button type="submit" className="btn btn-success">
              Actualitzar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
