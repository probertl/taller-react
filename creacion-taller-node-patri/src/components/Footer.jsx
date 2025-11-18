const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-4">
      <div className="container">
        <div className="row">

          {/* Sección izquierda */}
          <div className="col-md-4 mb-3">
            <h5>La App de Patri</h5>
            <p>Aplicación de práctica para aprender React y Bootstrap.</p>
          </div>

          {/* Sección central: enlaces */}
          <div className="col-md-4 mb-3">
            &copy; {new Date().getFullYear()} La App de Patri. Tots els drets reservats
          </div>

          {/* Sección derecha: redes sociales */}
          <div className="col-md-4 mb-3">
            <i></i>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer;
