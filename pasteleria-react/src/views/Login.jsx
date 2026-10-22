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

    // Lógica de validación y asignación de roles
    // Simulación de consulta a base de datos
    if (email === 'admin@duoc.cl' && password === 'admin123') {
      localStorage.setItem('usuarioActivo', JSON.stringify({ email, rol: 'admin' }));
      navigate('/admin'); // Redirige al panel de administración
    } else {
      localStorage.setItem('usuarioActivo', JSON.stringify({ email, rol: 'cliente' }));
      navigate('/'); // Redirige al catálogo de cliente
    }
  };

  return (
    <main className="container mt-5">
      <section style={{ maxWidth: '400px', margin: '40px auto' }}>
        <h2 className="text-center mb-3">Iniciar Sesión</h2>
        <p className="text-center text-muted mb-4">Ingresa a tu cuenta para gestionar tus pedidos.</p>
        
        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleSubmit} noValidate className="shadow p-4 rounded bg-light">
          <div className="mb-3">
            <label htmlFor="correo-login" className="form-label fw-bold">Correo Electrónico:</label>
            <input 
              type="email" 
              className="form-control"
              id="correo-login" 
              placeholder="usuario@duoc.cl" 
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
      </section>
    </main>
  );
};

export default Login;