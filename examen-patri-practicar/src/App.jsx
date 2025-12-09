import { createContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import ProductsList  from "./components/ProductsList";
import Auth from "./components/Auth";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import About from "./components/About";
import AddProduct from "./components/AddProduct";


export const UserContext = createContext(null);


export default function App() {
  // Versió sense localStorage: es perd al refrescar
  //const [user, setUser] = useState(null);


  /////////////////////////////////////////////////
  // Versió amb localStorage es manté al refrescar
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
  /////////////////////////////////////////////


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
		      {/*De moment aqui es posa la ruta principal de about*/}
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsList />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/about" element={<About />} />
              {/* qualsevol ruta desconeguda */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>


          {/* Footer */}
          <Footer />
        </div>
      )}
    </UserContext.Provider>
  );
}
