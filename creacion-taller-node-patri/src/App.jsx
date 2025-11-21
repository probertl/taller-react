import { Routes, Route } from 'react-router-dom';
import { createContext, useState } from 'react';

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Inici from './components/Inici';
import LiveList from './components/LiveList';
import About from './components/About';
import EventDetail from './components/EventDetail';
import NotFound from './components/NotFound';
import Login from './components/Login';

// 1. Creem el context
export const UserContext = createContext();

export default function App() {
  // 2. Estat global per a l'usuari
  const [usuari, setUsuari] = useState(null);

  return (
    // 3. Provider que envolta l'app
    <UserContext.Provider value={{ usuari, setUsuari }}>
      {!usuari ? (
        // 4. Si no està loguejat, mostra només el Login
        //`UserContext` serveix per guardar qui és l'usuari que ha entrat a l'aplicació. 
        // Així, totes les pantalles poden saber si algú ha fet login i qui és. 
        // És com una capsa on guardem el nom de l'usuari i si ha entrat o no.
        <Login />
      ) : (
        // 5. Si està loguejat, mostra tota l'aplicació
        <div className="d-flex flex-column min-vh-100">
          <Header />

          <main className="flex-fill">

            {/* Routes és el que fa que, segons la web que visites (l'adreça de dalt), 
              et mostri una pantalla o una altra. Per exemple, si vas a `/events` et mostra la llista
              d'esdeveniments, si vas a `/about` et mostra la pantalla d'informació, etc. És com un mapa 
              que diu quina pantalla toca veure segons el camí. */}
            <Routes>
              <Route path="/" element={<Inici />} />
              <Route path="/events" element={<LiveList />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </div>
      )}
    </UserContext.Provider>
  );
}
