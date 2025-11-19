import platja from '../assets/platja.png'



export default function About() {
 // Aquí anirà el codi
 // …
 // I finalitzem amb el return
 // que retornarà el codi html que mostrarà
 // el navegador
 return (
   // Aquí anirà el JSX= HTML + Javascript
    
    <div className="container text-center">
      <div className="row">
        <div className="col">
          <h1>Aplicacio de Patricia Robert</h1>
          <img src={platja} alt="Platja" className="img-fluid" width="300px" />{/*gracies a la clase de boostrap img-fluid garanteix que la imatge sigui responsiva a tots els dispositius*/}
          <p>Aquest es el frontend que estic desenvolupant al taller de React per aprendre</p>
          <button className="btn btn-primary">Buto</button>
        </div>
      </div>
    </div>
  
   )
}