import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Carrito = () => {
  const { carrito, eliminarDelCarrito } = useContext(CartContext);

  const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);

  return (
    <div className="mt-4">
      <h2 className="mb-4 border-bottom pb-2">Tu Carrito de Compras</h2>
      
      {carrito.length === 0 ? (
        <div className="alert alert-info shadow-sm">
          Tu carrito está vacío. Regresa al catálogo para agregar productos.
        </div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            <ul className="list-group shadow-sm mb-3">
              {carrito.map((producto, index) => (
                <li className="list-group-item d-flex justify-content-between align-items-center lh-sm p-3" key={index}>
                  <div className="d-flex align-items-center">
                    <img 
                      src={producto.imagen} 
                      alt={producto.nombre} 
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                      className="rounded me-3"
                    />
                    <div>
                      <h6 className="my-0 fw-bold">{producto.nombre}</h6>
                      <small className="text-muted badge bg-light text-dark border">{producto.categoria}</small>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="text-success fw-bold me-4">${producto.precio.toLocaleString('es-CL')}</span>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => eliminarDelCarrito(index)}
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm border-0 bg-light">
              <div className="card-body">
                <h5 className="card-title fw-bold">Resumen de Compra</h5>
                <hr />
                <div className="d-flex justify-content-between mb-3 fs-5">
                  <span>Total:</span>
                  <strong className="text-primary">${total.toLocaleString('es-CL')}</strong>
                </div>
                <button className="btn btn-success w-100 fw-bold">
                  Proceder al Pago
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;