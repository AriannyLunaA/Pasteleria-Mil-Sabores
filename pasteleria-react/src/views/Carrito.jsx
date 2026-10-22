import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Carrito = () => {
  const { carrito, eliminarDelCarrito, descuento, aplicarDescuento } = useContext(CartContext);
  const navigate = useNavigate();
  const [mostrarAuth, setMostrarAuth] = useState(false);
  
  // Estados para controlar el input del código promocional
  const [codigoInput, setCodigoInput] = useState('');
  const [errorCodigo, setErrorCodigo] = useState('');

  // Base de datos simulada de códigos promocionales válidos
  const baseDatosCodigos = {
    'SENIOR50': { nombre: 'Descuento Senior', porcentaje: 0.50 },
    'DUOCGRATIS': { nombre: 'Cumpleañero Institucional', porcentaje: 1.00 },
    'FELICES50': { nombre: 'Cupón Aniversario', porcentaje: 0.10 }
  };

  // === CÁLCULO MATEMÁTICO ===
  const subtotal = carrito.reduce((acc, producto) => acc + producto.precio, 0);
  const montoDescuento = descuento ? (subtotal * descuento.porcentaje) : 0;
  const totalFinal = subtotal - montoDescuento;

  const validarCodigo = () => {
    const codigoFormateado = codigoInput.trim().toUpperCase();
    
    if (baseDatosCodigos[codigoFormateado]) {
      aplicarDescuento(baseDatosCodigos[codigoFormateado]);
      setErrorCodigo('');
      setCodigoInput(''); // Limpiamos el input
    } else {
      setErrorCodigo('Código promocional inválido o expirado.');
    }
  };

  const quitarDescuento = () => {
    aplicarDescuento(null);
    setErrorCodigo('');
  };

  const procesarPago = () => {
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));

    if (!usuarioActivo) {
      setMostrarAuth(true);
    } else {
      alert(`Pago de $${totalFinal.toLocaleString('es-CL')} procesado con éxito. ¡Gracias por tu compra, ${usuarioActivo.email}!`);
      aplicarDescuento(null); // Limpiamos el descuento tras pagar
      setMostrarAuth(false);
    }
  };

  return (
    <div className="mt-4">
      <h2 className="mb-4 border-bottom pb-2">Tu Carrito de Compras</h2>
      
      {carrito.length === 0 ? (
        <div className="alert alert-info shadow-sm">
          Tu carrito está vacío. Regresa al catálogo para agregar productos.
        </div>
      ) : (
        <div className="row">
          {/* Lista de Productos */}
          <div className="col-md-8">
            <ul className="list-group shadow-sm mb-3">
              {carrito.map((producto, index) => (
                <li className="list-group-item d-flex justify-content-between align-items-center lh-sm p-3" key={index}>
                  <div className="d-flex align-items-center">
                    <img src={producto.imagen} alt={producto.nombre} style={{ width: '50px', height: '50px', objectFit: 'cover' }} className="rounded me-3" />
                    <div>
                      <h6 className="my-0 fw-bold">{producto.nombre}</h6>
                      <small className="text-muted badge bg-light text-dark border">{producto.categoria}</small>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="text-success fw-bold me-4">${producto.precio.toLocaleString('es-CL')}</span>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarDelCarrito(index)}>Eliminar</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Panel de Resumen y Códigos */}
          <div className="col-md-4">
            <div className="card shadow-sm border-0 bg-light mb-3">
              <div className="card-body">
                <h5 className="card-title fw-bold">Resumen de Compra</h5>
                <hr />
                
                {/* Ingreso de Código Promocional */}
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted">¿Tienes un código de descuento?</label>
                  <div className="input-group">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Ej: FELICES50" 
                      value={codigoInput}
                      onChange={(e) => setCodigoInput(e.target.value)}
                      disabled={descuento !== null} // Bloquea el input si ya hay un descuento activo
                    />
                    <button 
                      className="btn btn-dark" 
                      type="button" 
                      onClick={validarCodigo}
                      disabled={descuento !== null || !codigoInput.trim()}
                    >
                      Aplicar
                    </button>
                  </div>
                  {errorCodigo && <div className="text-danger small mt-1">{errorCodigo}</div>}
                </div>

                <hr />

                {/* Desglose Matemático */}
                <div className="d-flex justify-content-between mb-2 text-muted">
                  <span>Subtotal:</span>
                  <span>${subtotal.toLocaleString('es-CL')}</span>
                </div>
                
                {descuento && (
                  <div className="d-flex justify-content-between align-items-center mb-2 text-success fw-bold">
                    <span>
                      {descuento.nombre} ({descuento.porcentaje * 100}%):
                      <br/>
                      <button className="btn btn-sm btn-link text-danger p-0 text-decoration-none" onClick={quitarDescuento} style={{ fontSize: '0.8rem' }}>
                        (Quitar cupón)
                      </button>
                    </span>
                    <span>- ${montoDescuento.toLocaleString('es-CL')}</span>
                  </div>
                )}
                
                <hr />
                <div className="d-flex justify-content-between mb-3 fs-5">
                  <span>Total Final:</span>
                  <strong className="text-primary">${totalFinal.toLocaleString('es-CL')}</strong>
                </div>

                <button className="btn btn-success w-100 fw-bold" onClick={procesarPago}>
                  Proceder al Pago
                </button>
              </div>
            </div>

            {mostrarAuth && (
              <div className="card shadow-sm border-warning">
                <div className="card-body text-center">
                  <h6 className="fw-bold mb-3">Para finalizar, elige una opción:</h6>
                  <button className="btn btn-dark w-100 mb-2" onClick={() => navigate('/login', { state: { from: '/carrito' } })}>
                    Tengo cuenta (Iniciar Sesión)
                  </button>
                  <button className="btn btn-outline-dark w-100 mb-2" onClick={() => navigate('/registro', { state: { from: '/carrito' } })}>
                    No tengo cuenta (Registrarme)
                  </button>
                  <button className="btn btn-sm btn-link text-muted text-decoration-none" onClick={() => setMostrarAuth(false)}>
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;