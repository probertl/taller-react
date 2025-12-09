import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Error from "./Error";
import Succes from './Succes';


const API_URL = "http://localhost:3000";


const INITIAL_FORM = {
  title: "",
  price: 1.0,
  description: "",
  category: "",
  images: ""
};


export default function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  


  // si hi ha cambis al formulari
  const handleChange = (e) => {
    const { name, value } = e.target;


    // actualitzar l'estat del formulari
    setForm((prev) => (
      { ...prev, [name]: value }
    ));


  };


  // Netejar formulari
  const handleClear = () => {
    setForm(INITIAL_FORM);
  };


  // Validació del formulari
  const isFormValid =
    form.title.trim() !== "" &&
    form.price !== "" &&
    form.category !== "";


  // Enviar formulari
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);


    // si no és vàlid, no enviar
    if (!isFormValid) {
      setError("Cal omplir nom, preu i categoria.");
      return;
    }


    // dades a enviar
    const formData = {
      title: form.title,
      description: form.description || "",
      price: parseFloat(form.price),
      category: form.category,
      images: form.images 
        ? form.images.split(',').map(img => img.trim()).filter(img => img !== '')
        : []
    };


    try {
      setLoading(true);


      const res = await fetch(`${API_URL}/products`, 
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });


      if (!res.ok) {
        setError("Error creant el producte.");
      }


      const saved = await res.json();


      setSuccess("Producte creat correctament. Pots tornar enrere");
    //   // després d'1 segon, tornar al llistat
    //   setTimeout(() => {
    //     navigate("/");
    //   }, 1000);


    } catch (err) {
      console.error("Error POST producte:", err);
      setError("No s'ha pogut crear el producte.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container-fluid px-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h4 mb-0">Afegir nou producte</h1>
        <Link to="/products">
          <button className="btn btn-sm btn-outline-secondary">
            <i className="bi bi-arrow-left"></i> Tornar
          </button>
        </Link>
      </div>


      <div className="card mb-3">
        <div className="card-body">
          {error && <Error>{error}</Error>}
          {success && <Succes>{success}</Succes>}


        <form onSubmit={handleSubmit} className="row g-2">
          <div className="col-md-4">
            <label className="form-label">Nom *</label>
            <input type="text" name="title" className="form-control" placeholder="Nom del producte"
              value={form.title} onChange={handleChange} required />
            </div>


          <div className="col-md-3">
            <label className="form-label">Categoria *</label>
            <select name="category" className="form-select"
              value={form.category} onChange={handleChange} required >
              <option value="">Selecciona tipus</option>
              <option value="tecnologia">Tecnologia</option>
              <option value="cosmetics">Cosmetics</option>
              <option value="menjar">Menjar</option>
            </select>
          </div>


          <div className="col-md-3">
            <label className="form-label">Preu *</label>
            <input type="number" name="price" className="form-control" placeholder="Preu del producte"
              value={form.price} onChange={handleChange}
              min="1" required />
          </div>


          <div className="col-md-12">
            <label className="form-label">Descripció</label>
            <input type="text" name="description" className="form-control"  placeholder="Descripció opcional"
              value={form.description} onChange={handleChange} />
          </div>

          <div className="col-md-12">
            <label className="form-label">Imatge (URL), separades entre comes</label>
            <input type="text" name="images" className="form-control"  placeholder="URL de la imatge"
              value={form.images} onChange={handleChange} />
          </div>


          <div className="col-12 mt-2 d-flex gap-2">
            <button type="submit" className="btn btn-success"
              disabled={!isFormValid || loading}
            >
              {loading ? "Guardant..." : "Afegir supermercat"}
            </button>
            <button type="button" className="btn btn-outline-secondary"
              onClick={handleClear} disabled={loading} >
              Netejar
            </button>
          </div>


          <div className="col-12 mt-1">
            <small className="text-muted">* Camps obligatoris</small>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}
