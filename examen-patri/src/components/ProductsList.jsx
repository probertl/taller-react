import { useEffect, useState } from "react";
import FilterProduct from "./FilterProduct";
import Product from "./Product";
import Error from "./Error";
import AddProduct from "./AddProduct";


const API_URL = import.meta.env.VITE_API_URL + "/productes";


export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // GET inicial
  useEffect(() => {
    // Posas el nom de lo que sigui la app
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);


        const res = await fetch(API_URL);
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
  }, []);

    // Handler que rep el producte nou des d'AddProduct per afegir-lo a la llista
    const handleProductAdded = (newProduct) => {
        setProducts((prev) => [...prev, newProduct]);
    };

    // actualitzar producte existent (UPDATE), pasara de Avi(List) a pare
    const handleProductUpdated = (updatedProduct) => {
      // reemplaça en estat el producte que torna el fill EditProduct
      setProducts((prev) =>
        prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
    };


  return (
    <div>
      <h1 className="h3 mb-3">Llista de productes</h1>


      {/* Menú / filtre de productes (de moment no hi ha) */}
      <FilterProduct />

        {/* Formulari d'alta de producte */}
        <AddProduct onProductAdded={handleProductAdded} />


      {loading && <p>Carregant productes...</p>}
      {error && <Error textToShow={error} />}


      {!loading && !error && (
        <div className="mt-3">
          {products.length === 0 ? (
            <p className="text-muted">No hi ha productes.</p>
          ) : (
            <div className="list-group">
              {products.map((product) => (
                <Product 
                  key={product.id} 
                  product={product} 
                  onProductUpdated={handleProductUpdated} // passarem el handler
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

