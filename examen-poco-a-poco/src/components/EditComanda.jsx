// components/EditComanda.jsx
// Formulari per editar una comanda (quantitat i producte)
import { useState, useEffect } from "react";
import Error from "./Error";

const COMANDES_URL = import.meta.env.VITE_API_URL + '/comandes';
const PRODUCTES_URL = import.meta.env.VITE_API_URL + '/productes';

export default function EditComanda({ comanda, onComandaUpdated, onCancel }) {
  const [productes, setProductes] = useState([]);
  const [form, setForm] = useState({
    producteId: comanda.producteId,
    quantitat: comanda.quantitat
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Carregar llista de productes per al desplegable
  useEffect(() => {
    const loadProductes = async () => {
      try {
        const res = await fetch(PRODUCTES_URL);
        if (!res.ok) {
          setError("Error carregant productes");
          return;
        }
        const data = await res.json();
        setProductes(data);
      } catch (err) {
        console.error("Error carregant productes:", err);
        setError("No s'han pogut carregar els productes.");
      }
    };
    loadProductes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  // Validació: producte i quantitat > 0
  const isFormValid = form.producteId !== "" && Number(form.quantitat) > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!isFormValid) {
      setError("Cal seleccionar un producte i quantitat superior a 0.");
      return;
    }

    try {
      setLoading(true);

      // PUT per actualitzar la comanda (manté l'estat actual)
      const res = await fetch(`${COMANDES_URL}/${comanda.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: comanda.id,
          supermercatId: comanda.supermercatId,
          producteId: Number(form.producteId),
          quantitat: Number(form.quantitat),
          status: comanda.status // Mantenim l'estat actual
        })
      });

      if (!res.ok) {
        setError("Error actualitzant la comanda");
        return;
      }

      const updated = await res.json();
      onComandaUpdated(updated);
    } catch (err) {
      console.error("Error PUT comanda:", err);
      setError("No s'ha pogut actualitzar la comanda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-top pt-2 mt-2">
      <h6 className="mb-2">Editar comanda</h6>

      {error && <Error>{error}</Error>}

      <form className="row g-2" onSubmit={handleSubmit}>
        {/* Desplegable de productes */}
        <div className="col-md-6">
          <label className="form-label small">Producte *</label>
          <select
            name="producteId"
            className="form-select form-select-sm"
            value={form.producteId}
            onChange={handleChange}
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

        {/* Quantitat */}
        <div className="col-md-3">
          <label className="form-label small">Quantitat *</label>
          <input
            type="number"
            name="quantitat"
            className="form-control form-control-sm"
            value={form.quantitat}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        {/* Botons */}
        <div className="col-md-3 d-flex align-items-end gap-2">
          <button
            type="submit"
            className="btn btn-sm btn-primary"
            disabled={loading || !isFormValid}
          >
            {loading ? "Guardant..." : "Guardar"}
          </button>
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel·lar
          </button>
        </div>
      </form>
    </div>
  );
}
