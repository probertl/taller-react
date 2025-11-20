//mostra una fitxa individual d’un esdeveniment
import { useState, useEffect } from "react";
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

// URL base definida a l’arxiu .env (has de tenir VITE_API_URL=http://localhost:3000)
const API_URL = `${import.meta.env.VITE_API_URL}/events`;
console.log("La ruta:", API_URL);


export default function LiveList() {

    // const [events, setEvents] = useState(INITIAL_EVENTS);
    /**
    * Inicialitzem l'estat events
    *     - Si hi ha dades al localStorage, les carreguem
    *     - Si no, utilitzem INITIAL_EVENTS
    * Aquesta funció dins de useState només s’executa una vegada
    */
    // const [events, setEvents] = useState(() => {
    //     const dades = localStorage.getItem('events');
    //     return dades ? JSON.parse(dades) : INITIAL_EVENTS;
    // });
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSorted, setIsSorted] = useState(false);

    /**
    * useEffect que DESA automàticament els events cada cop que canvien
    * Això garanteix la persistència local (localStorage)
    
    useEffect(() => {
      localStorage.setItem('events', JSON.stringify(events));
    }, [events]);
    */

    // 🔁 Carreguem dades de l'API quan el component es munta
    useEffect(() => {
      setLoading(true);

      fetch(API_URL)
        .then(res => {
          if (!res.ok) throw new Error("Error carregant dades del servidor");
          return res.json();
        })
        .then(data => {
          setEvents(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error:", err);
          setError(err.message);
          setLoading(false);
        });
    }, []);


    // El component Live no modifica l'array directament; només avisa el pare (LiveList)
    // passant l'id de l'esdeveniment a onDelete, que és qui realment elimina l'element
    const handleDelete = async (id) => {
      try {
          const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            throw new Error('Error esborrant el event');
          }

          setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
           // Guardem al localStorage (opcional)
          // const updatedParole = parole.filter(p => p.id !== id);
          // localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedParole));
        } catch (err) {
            console.error('Error:', err);
            alert('Error esborrant la paraula del servidor');
        }
    };

    const handleSort = () => {
      setEvents(prevEvents =>
        [...prevEvents].sort((a, b) => new Date(a.date) - new Date(b.date))
      );
      setIsSorted(true); 
      {/*Aquí sí que necessitem el spread ([...]) perquè .sort() 
        modifica l’array original en lloc de crear-ne un de nou */}
    };

    // Amb (.then i .cath())
    const handleAdd = (data) => {
      // Enviem la petició POST al servidor (no cal ID, json-server el posa)
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error afegint l’esdeveniment');
          }
          return response.json(); // convertim resposta a objecte JS
        })
        .then(savedEvent => {
          // Afegim el nou esdeveniment (amb ID creat per json-server)
          setEvents(prev => [...prev, savedEvent]);
        })
        .catch(err => {
          console.error('Error:', err);
          alert('Error afegint l’esdeveniment al servidor');
        });
    };

    {/*Estem creant una funció que es diu handleUpdate, rep el id del event i les noves dades que s'han de mostrar */}
      const handleUpdate = async (id, updatedData) => {
        try {
          const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData)
          });

          if (!res.ok) throw new Error("Error actualitzant l’esdeveniment");

          const updatedEvent = await res.json();
          setEvents(prev =>
            prev.map(e => (e.id === id ? updatedEvent : e))
          );
        } catch (err) {
          console.error("Error:", err);
          alert("No s'ha pogut actualitzar l’esdeveniment");
        }
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
