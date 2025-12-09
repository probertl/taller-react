import { useState, useEffect } from 'react';
import ProductMenu from './ProductMenu';
import ProductList from './ProductList';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(1000);

  useEffect(() => {
    loadProducts();
  }, [limit]);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/products?_limit=${limit}`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error:', error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoad = (newLimit) => {
    setLimit(newLimit);
  };

  const handleProductUpdated = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleProductDeleted = (deletedId) => {
    setProducts((prev) => prev.filter((p) => p.id !== deletedId));
  };

  return (
    <div className="container mt-4">
      <ProductMenu onLoad={handleLoad} />

      {isLoading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregant...</span>
          </div>
          <p className="mt-2">Carregant productes...</p>
        </div>
      )}

      {!isLoading && products.length === 0 && (
        <p className="text-muted">No hi ha productes</p>
      )}

      {!isLoading && products.length > 0 && (
        <div>
          {products.map((product) => (
            <ProductList
              key={product.id}
              product={product}
              onProductUpdated={handleProductUpdated}
              onProductDeleted={handleProductDeleted}
            />
          ))}
        </div>
      )}
    </div>
  );
}
