import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParolaEdit from './ParolaEdit';

export default function Parola({ parola, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  if (!parola) return null;

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    onDelete && onDelete(parola.id);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <span className="fw-bold">{parola.word}</span>
          <span className="mx-2">→</span>
          <span className="text-muted">{parola.translation}</span>
        </div>
        <div className="btn-group btn-group-sm" role="group">
          <Link
            to={`/parole/${parola.id}`}
            className="btn btn-info"
          >
            Veure
          </Link>
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => setIsEditing(v => !v)}
          >
            {isEditing ? 'Tancar' : 'Editar'}
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => setShowDeleteModal(true)}
          >
            Esborrar
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="mt-3">
          <ParolaEdit 
            parola={parola}
            onCancel={() => setIsEditing(false)}
            onUpdate={(updatedData) => {
              onUpdate && onUpdate(parola.id, updatedData);
              setIsEditing(false);
            }}
          />
        </div>
      )}

      {showDeleteModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar esborrament</h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Segur que vols esborrar "<strong>{parola.word}</strong>"?</p>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel·lar
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                >
                  Esborrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


