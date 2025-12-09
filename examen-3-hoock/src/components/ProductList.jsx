import { useState } from "react";
import { useDispatch } from "react-redux";
import { delProducte } from "../store/thunks";

export default function ProductList({ producte }) {
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);

  const handleDelete = () => {
    if (window.confirm(`Eliminar ${producte.title}?`)) {
      dispatch(delProducte(producte.id));
    }
  };

  const toggleDetails = () => {
    if (showDetails) {
      setShowDetails(false);
    } else {
      setShowDetails(true);
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div className="flex-grow-1">
            <img 
              src={producte.thumbnail} 
              alt={producte.title}
              className="img-thumbnail me-3"
              style={{ width: "100px", float: "left" }}
            />
            <h5 className="card-title">{producte.title}</h5>
            <p className="card-text">
              <strong>Brand:</strong> {producte.brand}<br />
              <strong>Category:</strong> {producte.category}<br />
              <strong>Price:</strong> {producte.price}€
            </p>
          </div>
          
          <div className="d-flex gap-2">
            <button 
              className="btn btn-sm btn-primary"
              onClick={toggleDetails}
            >
              {showDetails ? "HIDE" : "VIEW"}
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
            <p>{producte.description}</p>
            
            <h6>Images:</h6>
            <div className="d-flex flex-wrap gap-2">
              {producte.images.map((image, index) => (
                <img 
                  key={index}
                  src={image}
                  alt={`${producte.title} ${index + 1}`}
                  width="200"
                  className="img-thumbnail"
                  onError={(e) => {
                    e.target.src = producte.thumbnail;
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
