import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Error from './Error';
import Success from './Success';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    brand: '',
    thumbnail: '',
    images: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validació
    if (!form.title.trim()) {
      setError('El títol és obligatori');
      return;
    }
    if (!form.price || isNaN(form.price) || parseFloat(form.price) <= 0) {
      setError('El preu ha de ser un número positiu');
      return;
    }

    try {
      const newProduct = {
        title: form.title,
        description: form.description,
        category: form.category,
        price: parseFloat(form.price),
        brand: form.brand,
        thumbnail: form.thumbnail || 'https://via.placeholder.com/150',
        images: form.images ? form.images.split(',').map(img => img.trim()) : []
      };

      const res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });

      if (res.ok) {
        const product = await res.json();
        setSuccess('Producte afegit correctament!');
        setTimeout(() => {
        navigate('/');
        }, 1000);
      } else {
        setError('Error al afegir el producte');
      }
    } catch (err) {
      setError('Error al afegir el producte');
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-header bg-success text-white">
        <h5 className="mb-0">Afegir Producte</h5>
      </div>
      <div className="card-body">
        {error && <Error>{error}</Error>}
        {success && <Success>{success}</Success>}

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Títol *</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={form.title}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Brand</label>
              <input
                type="text"
                className="form-control"
                name="brand"
                value={form.brand}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Categoria</label>
              <input
                type="text"
                className="form-control"
                name="category"
                value={form.category}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Preu *</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                name="price"
                value={form.price}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Descripció</label>
            <textarea
              className="form-control"
              name="description"
              rows="3"
              value={form.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Thumbnail URL</label>
            <input
              type="text"
              className="form-control"
              name="thumbnail"
              value={form.thumbnail}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Images (separades per comes)</label>
            <input
              type="text"
              className="form-control"
              name="images"
              value={form.images}
              onChange={handleChange}
              placeholder="url1, url2, url3"
            />
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-success">
              Afegir Producte
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
              Cancel·lar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
