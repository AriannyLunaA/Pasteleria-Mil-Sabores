// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Catalogo from './views/Catalogo'; // Importación de la nueva vista
import Carrito from './views/Carrito'; // Importación de la vista del carrito 
import Registro from './views/Registro'; // Importación de la vista de registro  
import Admin from './views/Admin'; // Importación de la vista del administrador
function App() {
  return (
    <BrowserRouter>
      <Navbar /> 
      <div className="container">
        <Routes>
          <Route path="/" element={<Catalogo />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;