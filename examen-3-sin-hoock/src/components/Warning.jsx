export default function Warning({ children }) {
  return (
    <div className="alert alert-warning" role="alert">
      <i className="bi bi-exclamation-circle-fill me-2"></i>
      {children}
    </div>
  );
}
