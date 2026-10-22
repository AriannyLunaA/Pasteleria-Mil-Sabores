// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Catalogo from './views/Catalogo'; 
import Carrito from './views/Carrito'; 
import Registro from './views/Registro';  
import Admin from './views/Admin'; 
import Login from './views/Login'; 
import RutaPrivadaAdmin from './components/RutaPrivadaAdmin'; 
import Nosotros from './views/Nosotros'; 
import Contacto from './views/Contacto'; 
import Blogs from './views/Blogs';
import Promociones from './views/Promociones';  
import DetalleBlog2 from './views/DetalleBlog2'; // Importa la vista de detalle del blog 2


function App() {
  return (
    <BrowserRouter>
      <Navbar /> 
      <div className="container">
        <Routes>
          {/* RUTA RAÍZ: Ahora la página de inicio es "Nosotros" */}
          <Route path="/" element={<Nosotros />} />
          
          {/* EL CATÁLOGO: Ahora tiene su propia ruta */}
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/promociones" element={<Promociones />} />
          <Route path="/detalle-blog" element={<DetalleBlog2 />} /> 

          {/* RUTA PROTEGIDA: Única declaración para el panel de Admin */}
          <Route path="/admin" element={
            <RutaPrivadaAdmin>
              <Admin />
            </RutaPrivadaAdmin>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;