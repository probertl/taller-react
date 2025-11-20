//mostra una fitxa individual d’un esdeveniment
import { useState } from "react";
import Live from "./Live";
import AddEvent from "./AddEvent";


const INITIAL_EVENTS = [
 {
   id: 1,
   title: 'Muse — Will of the People Tour',
   city: 'Barcelona',
   date: '2025-07-12',
   venue: 'Palau Sant Jordi',
   image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
   description: 'Rock simfònic i posada en escena espectacular. Invitats sorpresa.'
 },
 {
   id: 2,
   title: 'Norah Jones — Summer Nights',
   city: 'Girona',
   date: '2025-08-15',
   venue: 'Auditori',
   image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea',
   description: 'Jazz suau i íntim en un espai perfecte per a la seva veu.'
 },
 {
   id: 3,
   title: 'Zahara — Astronauta',
   city: 'València',
   date: '2024-09-05',
   venue: 'La Marina',
   image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063',
   description: 'Pop electrònic amb un directe potent i cuidat al detall.'
 }
];

export default function LiveList() {

    const [events, setEvents] = useState(INITIAL_EVENTS);
    const [isSorted, setIsSorted] = useState(false);

    // El component Live no modifica l'array directament; només avisa el pare (LiveList)
    // passant l'id de l'esdeveniment a onDelete, que és qui realment elimina l'element
    const handleDelete = (id) => {
      setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
      {/*No modifiquem l’array original (prevEvents)
      filter crea un nou array (per aixo no fa falta spead ...), cosa que respecta la regla de React de no mutar l’estat directament.
      Això evita bugs i permet que React detecti els canvis correctament. */}
    };

    const handleSort = () => {
      setEvents(prevEvents =>
        [...prevEvents].sort((a, b) => new Date(a.date) - new Date(b.date))
      );
      setIsSorted(true); 
      {/*Aquí sí que necessitem el spread ([...]) perquè .sort() 
        modifica l’array original en lloc de crear-ne un de nou */}
    };

    const handleAdd = (data) => {
      setEvents(prev => {
        // Agafa l’estat actual events com a prev.
        // Calcula l'ID màxim actual: si hi ha elements, agafa l'últim id; si no, 0.
        const maxId = prev.length > 0 ? prev[prev.length - 1].id : 0;

        // Crea un nou array amb tots els elements de prev i afegeix un nou objecte
        // que conté l'ID incrementat i totes les dades passades com a data.
        return [...prev, { id: maxId + 1, ...data }];
        
        // Actualitza l’estat amb aquest nou array, provocant que React redibuixi
        // la llista amb l’esdeveniment afegit amb un ID correcte.
      });
    };

    {/*Estem creant una funció que es diu handleUpdate, rep el id del event i les noves dades que s'han de mostrar */}
    const handleUpdate = (id, updatedData) => {
      {/* setEvents és la manera que React té per canviar la llista d’esdeveniments.
        prev és l’estat actual de la llista abans de fer el canvi.
        Això vol dir: “Agafa la llista actual i fes-li aquests canvis” */}
      setEvents(prev =>
        prev.map(event => //recórrer tots els elements de la llista
          event.id === id ? { ...event, ...updatedData } : event
          // Si coincideix (?)-> copia el que hi ha dis i ho subsitueix per el UpdateData
        )
      );
    };





    return (
        <section className="container py-4">

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="mb-4">Esdeveniments en viu</h1>
            </div>

            <div>
              <button className="btn btn-sm btn-secondary m-2" onClick={handleSort} disabled={isSorted} >
                Ordena per data
              </button>
            </div>
          </div>
          <AddEvent onAdd={handleAdd} inlineButton/>
            

          {/* HEm d'efinit abans que es el que utilitzarem */}
          {events.map(event => (
              <Live event={event} onDelete={handleDelete} onUpdate={handleUpdate}/>
          ))}  
          {/* 
              1. 
              onUpdate és un prop és una manera de passar informació o “coses” a un component fill
              <Saluda nom="Anna" />
              Aquí nom="Anna" és una prop

              Dins del component Saluda, podem fer
              function nom(props){
                return <h1>Hola, {props.nom}!</h1>;
              }

              Resultat: “Hola, Anna!”

             onUpdate no és màgia ni està predefinida com onClick; 
             és una prop que tu defineixes i passes al fill, que el pot 
             cridar quan necessiti avisar el pare que ha canviat alguna cosa
             */} 

          <p className="mt-4">Selecciona un element per veure la fitxa completa</p>
        </section>
    );
}
