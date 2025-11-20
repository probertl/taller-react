import { useState } from "react";
// Importa useState de React per poder tenir un estat intern al component.

export default function EditEvent({ event, onCancel, onUpdate }) {
  // Component EditEvent
  // Rep tres "props" del component pare:
  // - event: les dades de l'esdeveniment que volem editar
  // - onCancel: funció per tancar el formulari sense canvis
  // - onUpdate: funció per avisar al pare que les dades s'han editat

  const [form, setForm] = useState({ ...event });
  // Cream un estat local 'form' inicialitzat amb les dades de l'esdeveniment.
  // setForm serveix per actualitzar aquest estat quan l'usuari escriu al formulari.
  // {...event} fa una còpia de l'objecte per no modificar l'original directament.

  const handleSubmit = (e) => {
    e.preventDefault();
    // Evita que el navegador recarregui la pàgina quan fem submit.
    
    onUpdate && onUpdate(form); 
    // Si existeix la funció onUpdate, la cridem passant-li les dades editades.
    // Això envia la nova informació cap al component pare.
  };

  return (
    <div className="card mt-3">
      {/* Contenidor estilitzat amb Bootstrap */}
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* Formulari amb submit controlat */}
          
          <div className="mb-2">
            <input type="text" placeholder="Títol" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="form-control" required />
            {/* Input per modificar el títol */}
            {/* value={form.title} → mostra el valor actual de l'estat */}
            {/* onChange → actualitza l'estat cada vegada que l'usuari escriu */}
          </div>

          <div className="mb-2">
            <input type="text" placeholder="Ciutat" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="form-control" required/>
            {/* Input per la ciutat, funciona igual que el títol */}
          </div>

          <div className="mb-2">
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="form-control" required />
            {/* Input per la data de l'esdeveniment */}
          </div>

          <div className="mb-2">
            <input type="text" placeholder="Sala / Venue" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} className="form-control"/>
            {/* Input opcional per la sala o l'espai */}
          </div>

          <div className="mb-2">
            <input type="text" placeholder="URL imatge" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} cassName="form-control"/>
            {/* Input opcional per l'enllaç de la imatge */}
          </div>

          <div className="mb-2">
            <textarea placeholder="Descripció" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="form-control"/>
            {/* Textarea per la descripció de l'esdeveniment */}
          </div>

          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>
              Cancel·lar
            </button>
            {/* Botó que crida onCancel per tancar el formulari sense guardar */}
            
            <button type="submit" className="btn btn-primary">
              Desa canvis
            </button>
            {/* Botó que dispara handleSubmit, enviant les dades editades */}
          </div>

        </form>
      </div>
    </div>
  );
}
