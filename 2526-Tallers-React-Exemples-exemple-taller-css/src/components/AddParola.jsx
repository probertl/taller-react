import { useState } from 'react';

// Estat inicial del formulari
const INITIAL_FORM = {
  word: '',
  translation: ''
};
 
export default function AddParola({ onCancel, onAdd }) {
  
  const [form, setForm] = useState(INITIAL_FORM);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.word || !form.translation) return;
    // Passar dades al pare
    onAdd && onAdd(form);
    // Netejar formulari
    setForm(INITIAL_FORM);
  };

  return (
    <div className="card mb-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <span className="fw-bold">Afegir paraula nova</span>
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
              placeholder="Escriu la paraula..."
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
              placeholder="Escriu la traducció..."
              required
            />
          </div>
          <div className="d-flex gap-2">
            <button type="button" className="btn btn-secondary" onClick={() => setForm(INITIAL_FORM)}>
              Netejar
            </button>
            <button type="submit" className="btn btn-primary">
              Afegir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
