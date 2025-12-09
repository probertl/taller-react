import { useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Auth from './components/Auth';
import ProductsList from './components/ProductsList';
import AddProduct from './components/AddProduct';
import About from './components/About';
import NotFound from './components/NotFound';
import './App.css';

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <UserContext.Provider value={{ user }}>
      <div className="d-flex flex-column min-vh-100">
        <Header user={user} onLogout={handleLogout} />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<ProductsList />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
