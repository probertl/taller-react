// src/components/Live.jsx
import { useState } from "react";

// /*Se li ha de pasar si hi ha onDelete ja que
// les dades i funcions passen dels components pares als fills a través de les props
// */
export default function Live({ event, onDelete }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // Si no hi ha event res
    if (!event) return null;

    return (
        <article className="live-event card p-3">
            {/*El primer activa el felxbox el segunt els separa als extrems tipo <- -> y pa que sigui linia --- el final */}
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h5 className="fw-bold">{event.title}</h5>

                        <p className="text-muted mb-1">
                            <i className="bi bi-pin"></i> {event.city} — {event.date}
                        </p>
                    </div>
                    
                    <div>
                        <button className="btn btn-sm btn-primary me-2"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? 'Tancar' : 'Veure fitxa'}
                        </button>
                        <button className="btn btn-sm btn-danger"
                            onClick={() => setShowConfirmModal(true)}
                        >
                            Esborrar
                        </button>
                    </div>
                </div>

                {/* Informació completa */}
                {isExpanded && (
                    <div className="mt-3">
                        <img src={event.image} alt={event.title} className="img-fluid mb-3 rounded" width="300"/>
                        <p>{event.city} — {event.date}</p>
                        <p><strong>Sala:</strong> {event.venue}</p>
                        <p>{event.description}</p>
                        <p>ID: {event.id}</p>
                    </div>
                )}

                {/* Modal de confirmació, te estils en linia pero es podrian afegir a un fitxer */}
                {showConfirmModal && (              
                    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Confirmació</h5>
                                    <button className="btn-close" onClick={() => setShowConfirmModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    Segur que vols esborrar aquest esdeveniment?
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={() => setShowConfirmModal(false)}>No</button>
                                    <button className="btn btn-danger"
                                        onClick={() => {
                                            onDelete && onDelete(event.id); // avisa al pare
                                            setShowConfirmModal(false);     // tanca el modal
                                        }}
                                    >
                                        Sí
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </article>
    );
}
