import { useState } from 'react';

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

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
    
    // Aquí iría la llamada POST a tu futuro backend (microservicio de usuarios)
    console.log('Payload de registro:', formData);
    alert('Registro simulado con éxito.');
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card shadow-sm border-0 bg-light">
          <div className="card-body p-4">
            <h3 className="card-title text-center mb-4 fw-bold">Crear Cuenta</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre Completo</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Correo Electrónico</label>
                <input 
                  type="email" 
                  className="form-control" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input 
                  type="password" 
                  className="form-control" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="form-label">Confirmar Contraseña</label>
                <input 
                  type="password" 
                  className="form-control" 
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