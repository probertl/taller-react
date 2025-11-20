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
        <Login />
      ) : (
        // 5. Si està loguejat, mostra tota l'aplicació
        <div className="d-flex flex-column min-vh-100">
          <Header />

          <main className="flex-fill">
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
