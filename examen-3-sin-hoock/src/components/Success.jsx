export default function Success({ children }) {
  return (
    <div className="alert alert-success" role="alert">
      <i className="bi bi-check-circle-fill me-2"></i>
      {children}
    </div>
  );
}
