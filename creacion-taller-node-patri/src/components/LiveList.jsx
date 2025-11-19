//mostra una fitxa individual d’un esdeveniment
import { useState } from "react";
import Live from "./Live";

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


    return (
        <section className="container py-4">

            <h1 className="mb-4">Esdeveniments en viu</h1>

            <button className="btn btn-sm btn-secondary mb-3" onClick={handleSort} disabled={isSorted} >
              Ordena per data
            </button>

            {/* HEm d'efinit abans que es el que utilitzarem */}
            {events.map(event => (
                <Live event={event} onDelete={handleDelete}/>
            ))} {/*Truquem a que es generi una seccio a caddascu
                key={event.id} fa que el component sigui unic
            */}

            <p className="mt-4">Selecciona un element per veure la fitxa completa</p>
        </section>
    );
}
