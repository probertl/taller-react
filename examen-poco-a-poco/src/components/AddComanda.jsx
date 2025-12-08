import { useState, useEffect } from "react";
import Error from "./Error";
import Success from "./Success";

const COMANDES_URL = import.meta.env.VITE_API_URL + '/comandes';
const PRODUCTES_URL = import.meta.env.VITE_API_URL + '/productes';

const INITIAL_FORM = {
  producteId: "",
  quantitat: 1
}

// El pare Supermercat li passarà l'id del supermercat on afegir la comanda y el hadnler
export default function AddComanda({ supermercatId, onComandaAdded }) {
  const [productes, setProductes] = useState([]);
  const [error, setError] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);

  // Carregar llista de productes per al desplegable el primer de tot
  useEffect(() => {
    const loadProductes = async () => {
      try {
        const res = await fetch(PRODUCTES_URL);

        if (!res.ok) {
          setError("Error carregant productes");
        }

        const data = await res.json();

        setProductes(data);
      } catch (err) {
        console.error("Error carregant productes:", err);
        setError("Error carregant productes");
      }
    };
    loadProductes();
  }, []);

  // Handler per actualitzar el formulari quan canvia qualsevol camp
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Actualitzar l'estat del formulari
    setForm({ ...form, [name]: value });
  };

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

      const formData = {
        supermercatId: Number(supermercatId),
        producteId: Number(form.producteId),
        quantitat: Number(form.quantitat),
        status: "demanat" // estat inicial sempre és "demanat"
      };

      const res = await fetch(COMANDES_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        setError("Error creant la comanda");
      }

      const newComanda = await res.json();
      onComandaAdded(newComanda);
      setForm(INITIAL_FORM);
    } catch (err) {
      console.error("Error:", err);
      setError("No s'ha pogut crear la comanda");
    }
  };


  return (
    <form onSubmit={handleSubmit} className="card card-body bg-light mb-3">
      <h6 className="mb-2">Nova comanda</h6>

      <div className="row g-2">
        <div className="col-md-6">
          {/* Desplegable per triar el producte */}
          <select  name="producteId" className="form-select form-select-sm" 
            value={form.producteId} onChange={handleChange} required >
            <option value="">Selecciona producte</option>
            {/* Llista de productes */}
            {productes.map((producte) => (
              <option key={producte.id} value={producte.id}>
                {producte.name} - {producte.price}€
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <input type="number" name="quantitat" className="form-control form-control-sm" placeholder="Quantitat" min="1"
            value={form.quantitat} onChange={handleChange} required/>
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
