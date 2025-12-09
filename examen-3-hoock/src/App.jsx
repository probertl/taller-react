import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppMenu from "./components/AppMenu";
import ProductsList from "./components/ProductsList";
import About from "./components/About";
import NotFound from "./components/NotFound";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppMenu />
      <Routes>
        <Route path="/" element={<Navigate to="/productes" />} />
        <Route path="/productes" element={<ProductsList />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
