import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
  const { carrito } = useContext(CartContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    comuna: 'Ñuñoa',
    notas: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const numeroOrden = Math.floor(Math.random() * 1000000);
    // Redirige a la vista de éxito enviando los datos de la orden
    navigate('/compra-exitosa', { 
      state: { orden: numeroOrden, datosEnvio: formData } 
    });
  };

  const totalPago = carrito.reduce((acc, item) => acc + item.precio, 0);

  if (carrito.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h3>Tu carrito está vacío</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/catalogo')}>Volver al Catálogo</button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 border-bottom pb-2">Checkout - Datos de Despacho</h2>
      <div className="row">
        {/* Formulario de Envío */}
        <div className="col-md-7">
          <div className="card shadow-sm border-0 bg-light mb-4">
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Nombre Completo</label>
                  <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Teléfono de Contacto</label>
                  <input type="tel" className="form-control" name="telefono" value={formData.telefono} onChange={handleChange} required />
                </div>
                <div className="row mb-3">
                  <div className="col-md-8">
                    <label className="form-label fw-bold">Dirección (Calle, Número, Depto)</label>
                    <input type="text" className="form-control" name="direccion" value={formData.direccion} onChange={handleChange} required />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold">Comuna</label>
                    <select className="form-select" name="comuna" value={formData.comuna} onChange={handleChange}>
                      <option value="Ñuñoa">Ñuñoa</option>
                      <option value="Santiago Centro">Santiago Centro</option>
                      <option value="Providencia">Providencia</option>
                      <option value="Macul">Macul</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Notas adicionales (Opcional)</label>
                  <textarea className="form-control" name="notas" rows="2" value={formData.notas} onChange={handleChange} placeholder="Ej: Dejar en conserjería"></textarea>
                </div>
                
                <button type="submit" className="btn btn-success w-100 fw-bold fs-5 mb-2">
                  Confirmar y Pagar
                </button>
                {/* Botón para evaluar el caso de fallo rápidamente */}
                <button type="button" className="btn btn-outline-danger w-100 fw-bold" onClick={() => navigate('/compra-fallida')}>
                  Simular Error en Pago (Prueba de Rúbrica)
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Resumen del Carrito */}
        <div className="col-md-5">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title fw-bold">Resumen de tu pedido</h5>
              <hr />
              <ul className="list-group list-group-flush mb-3">
                {carrito.map((prod, i) => (
                  <li key={i} className="list-group-item d-flex justify-content-between px-0">
                    <span className="text-truncate me-2">{prod.nombre}</span>
                    <strong>${prod.precio.toLocaleString('es-CL')}</strong>
                  </li>
                ))}
              </ul>
              <div className="d-flex justify-content-between fs-5 fw-bold border-top pt-3">
                <span>Total a Pagar:</span>
                <span className="text-primary">${totalPago.toLocaleString('es-CL')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;