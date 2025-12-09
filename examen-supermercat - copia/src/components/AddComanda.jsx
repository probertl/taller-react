// components/AddComanda.jsx
// Formulari per afegir una nova comanda a un supermercat (es renderitza amb el llistat)
import { useState, useEffect } from "react";

const COMANDES_URL = import.meta.env.VITE_API_URL + '/comandes';
const PRODUCTES_URL = import.meta.env.VITE_API_URL + '/productes';

export default function AddComanda({ supermercatId, onComandaAdded }) {
  const [productes, setProductes] = useState([]);
  const [form, setForm] = useState({
    producteId: "",
    quantitat: 1
  });

  useEffect(() => {
    const loadProductes = async () => {
      try {
        const res = await fetch(PRODUCTES_URL);
        const data = await res.json();
        setProductes(data);
      } catch (err) {
        console.error("Error carregant productes:", err);
      }
    };
    loadProductes();
  }, []);

  // Handler per crear la comanda (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validació: cal seleccionar un producte
    if (!form.producteId) {
      alert("Selecciona un producte");
      return;
    }

    try {
      // POST nova comanda amb estat inicial "demanat"
      const res = await fetch(COMANDES_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          supermercatId: Number(supermercatId),
          producteId: Number(form.producteId),
          quantitat: Number(form.quantitat),
          status: "demanat" // estat inicial sempre és "demanat"
        })
      });

      if (!res.ok) throw new Error("Error creant comanda");

      const newComanda = await res.json();
      onComandaAdded(newComanda);
      setForm({ producteId: "", quantitat: 1 });
    } catch (err) {
      console.error("Error:", err);
      alert("No s'ha pogut crear la comanda");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body bg-light mb-3">
      <h6 className="mb-2">Nova comanda</h6>
      <div className="row g-2">
        <div className="col-md-6">
          <select
            className="form-select form-select-sm"
            value={form.producteId}
            onChange={(e) => setForm({ ...form, producteId: e.target.value })}
            required
          >
            <option value="">Selecciona producte</option>
            {productes.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} - {p.price}€
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <input
            type="number"
            className="form-control form-control-sm"
            placeholder="Quantitat"
            min="1"
            value={form.quantitat}
            onChange={(e) => setForm({ ...form, quantitat: e.target.value })}
            required
          />
        </div>
        <div className="col-md-3">
          {/* Botó per crear la comanda */}
          <button type="submit" className="btn btn-success btn-sm w-100">
            Afegir comanda
          </button>
        </div>
      </div>
    </form>
  );
}
