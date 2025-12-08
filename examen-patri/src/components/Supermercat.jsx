// components/Supermercat.jsx
import { useState } from "react";
import Error from "./Error";

const COMANDES_URL = import.meta.env.VITE_API_URL + "/comandes";

export default function Supermercat({ supermarket }) {
  const { id, nom, descripcio, tipus, responsable } = supermarket;

  const [showOrders, setShowOrders] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [errorOrders, setErrorOrders] = useState(null);

  const handleToggleShow = async () => {
    // Si anem a obrir SHOW per primera vegada → fem la petició
    if (!showOrders && orders.length === 0) {
      try {
        setLoadingOrders(true);
        setErrorOrders(null);

        // GET /comandes?supermercatId=ID
        const res = await fetch(`${COMANDES_URL}?supermercatId=${id}`);
        if (!res.ok) {
          throw new Error("No s'han pogut carregar les comandes.");
        }

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Error carregant comandes:", err);
        setErrorOrders("Error carregant les comandes d'aquest supermercat.");
      } finally {
        setLoadingOrders(false);
      }
    }

    // Fem toggle de SHOW/HIDE
    setShowOrders((prev) => !prev);
  };

  return (
    <div className="list-group-item">
      {/* Info bàsica del supermercat */}
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <div className="fw-semibold">
            {nom || "(sense nom)"}
          </div>
          <div className="text-muted small">
            {descripcio || "(sense descripció)"}
          </div>
          <div className="text-muted small">
            Tipus: {tipus || "-"} · Responsable: {responsable || "-"}
          </div>
        </div>

        <div className="btn-group btn-group-sm">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleToggleShow}
          >
            {showOrders ? "HIDE" : "SHOW"}
          </button>
        </div>
      </div>

      {/* Zona de comandes SHOW/HIDE */}
      {showOrders && (
        <div className="mt-3 border-top pt-2">
          {loadingOrders && (
            <div className="small text-muted">Carregant comandes...</div>
          )}

          {errorOrders && <Error textToShow={errorOrders} />}

          {!loadingOrders && !errorOrders && (
            <>
              <h6 className="mb-2">Comandes</h6>

              {orders.length === 0 ? (
                <p className="text-muted small mb-0">
                  Aquest supermercat no té comandes.
                </p>
              ) : (
                <div className="list-group">
                  {orders.map((order) => (
                    <ComandaItem key={order.id} order={order} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

// Componentet per mostrar una comanda
function ComandaItem({ order }) {
  const { id, status, items } = order;

  return (
    <div className="list-group-item py-2">
      <div className="d-flex justify-content-between">
        <div>
          <div className="small fw-semibold">
            Comanda #{id}
          </div>
          <div className="small text-muted">
            Estat: {status || "desconegut"}
          </div>
          <div className="small text-muted">
            Nombre de productes: {items ? items.length : 0}
          </div>
        </div>

        {/* Aquí, més endavant, hi posarem les icones d'estat (demanat, a_cuina, etc.) */}
      </div>
    </div>
  );
}
