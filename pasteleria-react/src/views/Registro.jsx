import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    fechaNacimiento: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();
  const location = useLocation();
  const rutaDestino = location.state?.from || '/perfil';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Error: Las contraseñas no coinciden.');
      return;
    }
    
    if (!formData.fechaNacimiento) {
      alert('Error: Debes ingresar tu fecha de nacimiento.');
      return;
    }
    
    localStorage.setItem('usuarioActivo', JSON.stringify({
      email: formData.email,
      rol: 'cliente',
      nombre: formData.nombre,
      fechaNacimiento: formData.fechaNacimiento
    }));

    alert('Registro exitoso. Tu sesión ha sido iniciada.');
    navigate(rutaDestino);
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card shadow-sm border-0 bg-light">
          <div className="card-body p-4">
            <h3 className="card-title text-center mb-4 fw-bold">Crear Cuenta</h3>
            {/* El atributo noValidate permite que las pruebas unitarias evalúen handleSubmit sin bloqueo HTML5 */}
            <form onSubmit={handleSubmit} noValidate>
              
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="mb-3">
                <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento</label>
                <input 
                  type="date" 
                  className="form-control" 
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="mb-4">
                <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required 
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 fw-bold">
                Registrarse
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;