export default function Footer() {
  return (
    <footer className="bg-light text-center py-2 mt-4">
      <small className="text-muted">
        Examen React · {new Date().getFullYear()}
      </small>
    </footer>
  );
}
