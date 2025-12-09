export default function Error({ children }) {
  return (
    <div className="alert alert-danger" role="alert">
      <i className="bi bi-exclamation-triangle-fill me-2"></i>
      {children}
    </div>
  );
}
