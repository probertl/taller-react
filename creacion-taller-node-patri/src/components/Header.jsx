const Header = () => {
 return (    
    <nav className="navbar sticky-top navbar-expand-lg bg-info">
      <div className="container-fluid">
        
        {/* Nom de l'app */}
        <a className="navbar-brand" href="#">La App de Patri</a>

        {/* Botó per pantalles petites amb icona hamburgesa (ho he agafat del boostrap)*/}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="bi bi-person-lines-fill"></span>
        </button>

        {/* Enllaços */}
        <div className="collapse navbar-collapse" id="navbarNav">
            {/*ms-auto es ql que fa que estiguin a la dreta, s'ha de posar al ul no al div
            perque es el fill del div que es un contenidor, pero es el pare de el llistat al menu*/}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#">Inici</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Esdeveniments</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contacte</a>
            </li>
          </ul>
        </div>

      </div>
    </nav>
   )
}
export default Header