import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validación estricta de campos
    if (!email.trim() || !password.trim()) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    // === BASE DE DATOS SIMULADA ===
    // Aquí definimos los usuarios de prueba para la rúbrica
    const usuariosSimulados = [
      { email: 'admin@duoc.cl', password: '123456', rol: 'admin', ruta: '/admin' },
      { email: 'ventas@milsabores.cl', password: '123456', rol: 'vendedor', ruta: '/' }, // O '/vendedor' si tienes esa ruta
      { email: 'cliente@gmail.com', password: '123456', rol: 'cliente', ruta: '/' }
    ];

    // Buscamos si existe un usuario con ese correo Y esa contraseña
    const usuarioValido = usuariosSimulados.find(
      (u) => u.email === email && u.password === password
    );

    if (usuarioValido) {
      // Si existe, guardamos su sesión en LocalStorage
      localStorage.setItem('usuarioActivo', JSON.stringify({ 
        email: usuarioValido.email, 
        rol: usuarioValido.rol 
      }));
      
      // Usamos window.location.href en lugar de navigate para forzar 
      // que toda la página (incluyendo el Navbar) recargue y lea el nuevo rol.
      window.location.href = usuarioValido.ruta;
    } else {
      // Si no coincide, mostramos error
      setError('Correo o contraseña incorrectos.');
    }
  };

  return (
    <main className="container mt-5">
      <section style={{ maxWidth: '400px', margin: '40px auto' }}>
        <h2 className="text-center mb-3">Iniciar Sesión</h2>
        <p className="text-center text-muted mb-4">Ingresa a tu cuenta para gestionar el sistema.</p>
        
        {error && <div className="alert alert-danger text-center fw-bold">{error}</div>}

        <form onSubmit={handleSubmit} noValidate className="shadow p-4 rounded bg-light">
          <div className="mb-3">
            <label htmlFor="correo-login" className="form-label fw-bold">Correo Electrónico:</label>
            <input 
              type="email" 
              className="form-control"
              id="correo-login" 
              placeholder="ejemplo@milsabores.cl" 
              required 
              maxLength="100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="pass-login" className="form-label fw-bold">Contraseña:</label>
            <input 
              type="password" 
              className="form-control"
              id="pass-login" 
              required 
              minLength="4" 
              maxLength="10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button type="submit" className="btn btn-dark w-100 fw-bold">Ingresar</button>
        </form>
        
        {/* Ayuda visual temporal para facilitar la evaluación del profesor */}
        <div className="mt-4 p-3 bg-white border rounded small text-muted">
          <p className="fw-bold mb-1 border-bottom pb-1">Cuentas de prueba (Clave: 123456)</p>
          <ul className="mb-0 ps-3">
            <li><strong>Admin:</strong> admin@duoc.cl</li>
            <li><strong>Vendedor:</strong> ventas@milsabores.cl</li>
            <li><strong>Cliente:</strong> cliente@gmail.com</li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Login;