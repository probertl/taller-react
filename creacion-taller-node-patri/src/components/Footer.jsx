import platja from '../assets/platja.png'

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-4 mt-4">
      <div className="container">
        <div className="row align-items-center">
          
          {/* Logo i nom */}
          <div className="col-md-3 d-flex align-items-center justify-content-center gap-2">
            <img src={platja} alt="platja" width="32" height="32" />
            <span className="fw-semibold">La App de Patri</span>
          </div>

          {/* Text central */}
          <div className="col-md-6 text-center">
            <span>&copy; {year} — Tots els drets reservats</span>
          </div>

          {/* Xarxes socials */}
          <div className="col-md-3 d-flex justify-content-center gap-2">
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm rounded-circle social-icon">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="https://www.linkedin.com/in/patricia-robert-lopez/" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm rounded-circle social-icon">
              <i className="bi bi-linkedin"></i>
            </a>
            <a href="https://github.com/probertl" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm rounded-circle social-icon">
              <i className="bi bi-github"></i>
            </a>
          </div>

        </div>
      </div>
    </footer>

  );
};
