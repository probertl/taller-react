import { useEffect, useState } from "react";
import Product from "./Product";
import Error from "./Error";
import AddProduct from "./AddProduct";
import ProductsMenu from "./ProductsMenu";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL + "/products";


export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtres gestionats localment
  const [filters, setFilters] = useState({
    category: "",
    maxPrice: ""
  });


  // GET inicial amb filtres
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Construir query params
        const params = new URLSearchParams();
        if (filters.category) {
          params.append('category', filters.category);
        }
        if (filters.maxPrice) {
          params.append('price_lte', filters.maxPrice);
        }

        const url = `http://localhost:3000/products${params.toString() ? '?' + params.toString() : ''}`;
        const res = await fetch(url);
        if (!res.ok) {
          setError("Error carregant productes");
        }

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error llistant: ",err);
        setError("No s'han pogut carregar els productes.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [filters]);

  // Handler per canvis de filtre
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Handler per eliminar supermercat (DELETE)
  const handleProductDeleted = (deletedId) => {
    setProducts((prev) => prev.filter((s) => s.id !== deletedId));
  };


  return (
    <div>
      <h1 className="h3 mb-3">Llista de productes</h1>

      <Link to="/add-product" className="btn btn-primary mb-3">
        Afegir producte
      </Link>

      <ProductsMenu 
        onFilterChange={handleFilterChange}
        filters={filters}
      />

      {loading && <p>Carregant productes...</p>}
      {error && <Error textToShow={error} />}


      {!loading && !error && (
        <div className="mt-3">
          {products.length === 0 ? (
            <p className="text-muted">No hi ha productes.</p>
          ) : (
            <div className="list-group">
              {products.map((product) => (
                <Product key={product.id} 
                  product={product}
                  onProductDeleted={handleProductDeleted}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
