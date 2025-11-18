export default function NotFound() {
  return (
    <div className="container text-center py-5">
      <h1 className="display-1">404</h1>
      <h2 className="mb-3">No trobat</h2>
      <p className="lead">Ups! Aquesta ruta s'ha perdut entre paraules...</p>
      <img 
        src="https://http.cat/404" 
        alt="Gat amb estat 404" 
        className="img-fluid rounded mt-4"
        style={{ maxWidth: '320px' }}
      />
      <div className="mt-4">
        <a href="/" className="btn btn-primary me-2">Tornar a l'inici</a>
        <a href="/parole" className="btn btn-secondary">Explora el vocabulari</a>
      </div>
    </div>
  );
}
