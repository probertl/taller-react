import { useState } from "react";

export default function EditEvent({ event, onCancel, onUpdate }) {
  const [form, setForm] = useState({ ...event });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate && onUpdate(form); // Passa les dades editades al component Live
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Títol"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="form-control"
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Ciutat"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="form-control"
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="form-control"
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Sala / Venue"
              value={form.venue}
              onChange={(e) => setForm({ ...form, venue: e.target.value })}
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="URL imatge"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <textarea
              placeholder="Descripció"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="form-control"
              rows={3}
            />
          </div>

          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>
              Cancel·lar
            </button>
            <button type="submit" className="btn btn-primary">
              Desa canvis
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
