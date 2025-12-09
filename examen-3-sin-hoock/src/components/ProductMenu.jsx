import { useState } from 'react';
import { Link } from 'react-router-dom';
import Error from './Error';

export default function ProductMenu({ onLoad }) {
  const [limit, setLimit] = useState('0');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // Validació manual
    if (!limit.trim()) {
      setError('El camp és requerit');
      return;
    }

    const limitNum = parseInt(limit);
    if (isNaN(limitNum) || limitNum <= 0 || !Number.isInteger(limitNum)) {
      setError('Ha de ser un número enter positiu');
      return;
    }

    onLoad(limitNum);
  };

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <form onSubmit={handleSubmit} className="d-flex gap-2 align-items-start">
          <div>
            <label htmlFor="limit" className="form-label">Límit de productes:</label>
            <input type="text" id="limit" 
                className={`form-control ${error ? 'is-invalid' : ''}`}
              value={limit} onChange={(e) => setLimit(e.target.value)}
            />
            {error && (
              <div className="invalid-feedback d-block">
                {error}
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Load
          </button>
        </form>

        <Link to="/add-product" className="btn btn-success">
          <i className="bi bi-plus-circle me-1"></i>
          Afegir Producte
        </Link>
      </div>
    </div>
  );
}
