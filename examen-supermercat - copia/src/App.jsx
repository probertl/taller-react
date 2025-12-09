// App.jsx
import { createContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Auth from "./components/Auth";
import Header from "./components/Header";
import SupermercatsList from "./components/SupermercatsList";
import Productes from "./components/Productes";
import AddSupermercat from "./components/AddSupermercat";
import NotFound from "./components/NotFound";

export const UserContext = createContext(null);

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved || null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", user);
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const handleLogout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {!user ? (
        <Auth />
      ) : (
        <div className="d-flex flex-column min-vh-100">
          {/* Header amb menú */}
          <Header onLogout={handleLogout} />

          {/* Contingut principal amb rutes */}
          <main className="flex-fill py-3">
            <Routes>
              <Route path="/" element={<SupermercatsList />} />
              <Route path="/add-supermercat" element={<AddSupermercat />} />
              <Route path="/productes" element={<Productes />} />
              {/* qualsevol ruta desconeguda */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      )}
    </UserContext.Provider>
  );
}
