
import './App.css'
import { Routes, Route } from 'react-router-dom'
import ParolaList from './components/ParolaList'
import Inici from './components/Inici'
import About from './components/About'
import NotFound from './components/NotFound'
import Header from './components/Header'
import ParolaDetall from './components/ParolaDetall'
import Login from './components/Login'
import { createContext, useState } from 'react';

// Creem el context fora del component
export const UserContext = createContext();

function App() {
  const [usuari, setUsuari] = useState(null);

  return (
    <UserContext.Provider value={{ usuari, setUsuari }}>
      {!usuari ? (
        <Login />
      ) : (
        <div className="min-vh-100">
          <Header />
          <main className="pb-4">
            <Routes>
              <Route path="/" element={<Inici />} />
              <Route path="/parole" element={<ParolaList />} />
              <Route path="/parole/:id" element={<ParolaDetall />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      )}
    </UserContext.Provider>
  )
}

export default App
