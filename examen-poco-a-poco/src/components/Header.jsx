import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../App';

export default function Header({ onLogout }) {
  const { user } = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        {/* Al app es defineix que es / que de moment es el about */}
        <Link to="/" className="navbar-brand">
          Examen Supermercat
        </Link>

        <div className="navbar-nav me-auto">
          <Link to="/" className="nav-link text-white">
            Supermercats
          </Link>
          <Link to="/noexisteix" className="nav-link text-white">
            No existeix
          </Link>
          <Link to="/about" className="nav-link text-white">
            About
          </Link>
        </div>

        <div className="d-flex align-items-center gap-3">
          <span className="text-white">
            <i className="bi bi-person-circle me-1"></i>
            {user || "Usuari"}
          </span>
          
          <button
            className="btn btn-sm btn-outline-light"
            onClick={onLogout}
          >
            <i className="bi bi-box-arrow-right me-1"></i>
            Tancar sessió
          </button>
        </div>
      </div>
    </nav>
  );
}

// components/Header.jsx
// import { Link } from 'react-router-dom';
// import { useContext } from 'react';
// import { UserContext } from '../App';

// export default function Header({ onLogout }) {
//   const { user } = useContext(UserContext);

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
//       <div className="container-fluid">
//         <Link to="/" className="navbar-brand">
//           Examen Supermercat
//         </Link>

//         <div className="navbar-nav me-auto">
//           {/* <Link to="/supermercats" className="nav-link text-white">
//             Supermercats
//           </Link>
//           <Link to="/productes" className="nav-link text-white">
//             Productes
//           </Link>
//           <Link to="/add-supermercat" className="nav-link text-white">
//             Afegir Supermercat
//           </Link> */}
//           <Link to="/noexisteix" className="nav-link text-white">
//             No existeix
//           </Link>
//           <Link to="/about" className="nav-link text-white">
//             About
//           </Link>
//         </div>

//         <div className="d-flex align-items-center gap-3">
//           <span className="text-white">
//             <i className="bi bi-person-circle me-1"></i>
//             {user || "Usuari"}
//           </span>
          
//           <button
//             className="btn btn-sm btn-outline-light"
//             onClick={onLogout}
//           >
//             <i className="bi bi-box-arrow-right me-1"></i>
//             Tancar sessió
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// }
