export default function About() {
  return (
    <div className="container mt-4">
      <h2>Sobre l'aplicació</h2>
      <p className="lead">Nom: Enric</p>
      <p>Aplicació de gestió de productes amb React (sense Redux ni React Hook Form)</p>
      <ul>
        <li>Autenticació amb Context API</li>
        <li>Gestió d'estat amb useState</li>
        <li>Validació manual de formularis</li>
        <li>CRUD complet de productes</li>
      </ul>
    </div>
  );
}
