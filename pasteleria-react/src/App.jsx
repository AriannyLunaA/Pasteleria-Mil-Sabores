// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Catalogo from './views/Catalogo'; // Importación de la nueva vista
import Carrito from './views/Carrito'; // Importación de la vista del carrito 
function App() {
  return (
    <BrowserRouter>
      <Navbar /> 
      <div className="container">
        <Routes>
          <Route path="/" element={<Catalogo />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/registro" element={<h2>Vista de Registro (En construcción)</h2>} />
          <Route path="/admin" element={<h2>Vista del Administrador (En construcción)</h2>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;