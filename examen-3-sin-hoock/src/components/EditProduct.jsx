import { useState } from 'react';
import Error from './Error';
import Success from './Success';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function EditProduct({ product, onProductUpdated, onCancel }) {
  const [form, setForm] = useState({
    title: product.title || '',
    description: product.description || '',
    category: product.category || '',
    price: product.price || '',
    brand: product.brand || '',
    thumbnail: product.thumbnail || '',
    images: product.images ? product.images.join(', ') : ''
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
      const updatedProduct = {
        ...product,
        title: form.title,
        description: form.description,
        category: form.category,
        price: parseFloat(form.price),
        brand: form.brand,
        thumbnail: form.thumbnail || 'https://via.placeholder.com/150',
        images: form.images ? form.images.split(',').map(img => img.trim()) : []
      };

      const res = await fetch(`${API_URL}/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct)
      });

      if (res.ok) {
        const productData = await res.json();
        setSuccess('Producte actualitzat correctament!');
        setTimeout(() => {
          onProductUpdated(productData);
        }, 1000);
      } else {
        setError('Error al actualitzar el producte');
      }
    } catch (err) {
      setError('Error al actualitzar el producte');
    }
  };

  return (
    <div className="mt-3 border-top pt-3">
      {error && <Error>{error}</Error>}
      {success && <Success>{success}</Success>}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Títol *</label>
            <input
              type="text"
              className="form-control form-control-sm"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Brand</label>
            <input
              type="text"
              className="form-control form-control-sm"
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
              className="form-control form-control-sm"
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
              className="form-control form-control-sm"
              name="price"
              value={form.price}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Descripció</label>
          <textarea
            className="form-control form-control-sm"
            name="description"
            rows="2"
            value={form.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-sm btn-primary">
            Actualitzar
          </button>
          <button type="button" className="btn btn-sm btn-secondary" onClick={onCancel}>
            Cancel·lar
          </button>
        </div>
      </form>
    </div>
  );
}
