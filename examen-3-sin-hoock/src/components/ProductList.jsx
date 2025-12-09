import { useState } from 'react';
import EditProduct from './EditProduct';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function ProductList({ product, onProductUpdated, onProductDeleted }) {
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleDetails = () => {
    if (showDetails) {
      setShowDetails(false);
    } else {
      setShowDetails(true);
    }
  };

  const toggleEdit = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
      setShowDetails(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Eliminar ${product.title}?`)) return;

    try {
      const res = await fetch(`${API_URL}/products/${product.id}`, {
        method: 'DELETE'
      });

      if (res.ok || res.status === 404) {
        onProductDeleted(product.id);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleProductUpdated = (updatedProduct) => {
    onProductUpdated(updatedProduct);
    setIsEditing(false);
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div className="flex-grow-1">
            <img 
              src={product.thumbnail} 
              alt={product.title}
              className="img-thumbnail me-3"
              style={{ width: "100px", float: "left" }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/100';
              }}
            />
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">
              <strong>Brand:</strong> {product.brand}<br />
              <strong>Category:</strong> {product.category}<br />
              <strong>Price:</strong> {product.price}€
            </p>
          </div>
          
          <div className="d-flex gap-2">
            <button 
              className="btn btn-sm btn-primary"
              onClick={toggleDetails}
              disabled={isEditing}
            >
              {showDetails ? "HIDE" : "VIEW"}
            </button>
            <button 
              className="btn btn-sm btn-secondary"
              onClick={toggleEdit}
            >
              {isEditing ? "CANCEL·LAR" : "EDIT"}
            </button>
            <button 
              className="btn btn-sm btn-danger"
              onClick={handleDelete}
            >
              DELETE
            </button>
          </div>
        </div>

        {showDetails && (
          <div className="mt-3 border-top pt-3" style={{ clear: "both" }}>
            <h6>Description:</h6>
            <p>{product.description}</p>
            
            {product.images && product.images.length > 0 && (
              <>
                <h6>Images:</h6>
                <div className="d-flex flex-wrap gap-2">
                  {product.images.map((image, index) => (
                    <img 
                      key={index}
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      width="200"
                      className="img-thumbnail"
                      onError={(e) => {
                        e.target.src = product.thumbnail;
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {isEditing && (
          <EditProduct
            product={product}
            onProductUpdated={handleProductUpdated}
            onCancel={() => setIsEditing(false)}
          />
        )}
      </div>
    </div>
  );
}
