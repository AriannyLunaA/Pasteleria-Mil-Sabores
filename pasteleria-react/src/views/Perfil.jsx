import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', email: '', fechaNacimiento: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('usuarioActivo'));
    if (!session) {
      navigate('/login');
    } else {
      setUsuario(session);
      setFormData({
        nombre: session.nombre || '',
        email: session.email || '',
        fechaNacimiento: session.fechaNacimiento || ''
      });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    const usuarioActualizado = { ...usuario, ...formData };
    
    localStorage.setItem('usuarioActivo', JSON.stringify(usuarioActualizado));
    
    setUsuario(usuarioActualizado);
    setIsEditing(false); 
    alert('Tus datos han sido actualizados exitosamente.');
    
    window.location.reload(); 
  };

  const handleLogout = () => {
    localStorage.removeItem('usuarioActivo');
    setUsuario(null);
    navigate('/login');
  };

  if (!usuario) return null;

  return (
    <main className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-dark text-white fw-bold d-flex justify-content-between align-items-center">
              <span>Mi Perfil de Usuario</span>
              {!isEditing && (
                <button className="btn btn-sm btn-outline-light" onClick={() => setIsEditing(true)}>
                  ✏️ Editar
                </button>
              )}
            </div>
            
            <div className="card-body p-4">
              <h5 className="mb-4 text-primary">Información Personal</h5>
              
              {isEditing ? (
                <form onSubmit={handleSave}>
                  <div className="mb-3">
                    <label className="fw-bold">Nombre Completo:</label>
                    <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold">Correo Electrónico:</label>
                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  
                  {/* CAMBIO APLICADO: Input deshabilitado con mensaje de advertencia */}
                  <div className="mb-4">
                    <label className="fw-bold text-muted">Fecha de Nacimiento:</label>
                    <input 
                      type="date" 
                      className="form-control bg-light text-muted" 
                      name="fechaNacimiento" 
                      value={formData.fechaNacimiento} 
                      disabled 
                    />
                    <small className="text-danger mt-1 d-block">
                      * Por políticas de seguridad y promociones, la fecha de nacimiento no puede ser modificada.
                    </small>
                  </div>

                  <div className="d-flex gap-2">
                    <button type="button" className="btn btn-secondary w-50" onClick={() => setIsEditing(false)}>
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-success w-50 fw-bold">
                      Guardar Cambios
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <p><strong>Nombre:</strong> {usuario.nombre || 'No registrado'}</p>
                  <p><strong>Correo Electrónico:</strong> {usuario.email}</p>
                  <p><strong>Fecha de Nacimiento:</strong> {usuario.fechaNacimiento || 'No registrada'}</p>
                  <p><strong>Rol en Sistema:</strong> <span className="badge bg-secondary">{usuario.rol}</span></p>
                  <hr />
                  <button className="btn btn-outline-danger w-100 mt-3" onClick={handleLogout}>
                    Cerrar Sesión
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Perfil;