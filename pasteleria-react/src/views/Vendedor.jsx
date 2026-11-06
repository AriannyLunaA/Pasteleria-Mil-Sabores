import { useState } from 'react';

const Vendedor = () => {
  // Mock de productos del catálogo para que el vendedor visualice stock y detalles
  const [productos] = useState([
    { id: 1, nombre: 'Torta de Chocolate', categoria: 'Pasteles', precio: 15000, stock: 5, imagen: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100' },
    { id: 2, nombre: 'Pie de Limón', categoria: 'Tartas', precio: 12000, stock: 8, imagen: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=100' },
    { id: 3, nombre: 'Kuchen de Nuez', categoria: 'Kuchen', precio: 14000, stock: 4, imagen: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=100' }
  ]);

  // Mock de órdenes realizadas por los clientes en el sistema
  const [ordenes] = useState([
    { id: 101, cliente: 'Juan Pérez', total: 27000, estado: 'Pendiente', items: ['Torta de Chocolate', 'Pie de Limón'], fecha: '2026-11-06' },
    { id: 102, cliente: 'María Soto', total: 14000, estado: 'Preparando', items: ['Kuchen de Nuez'], fecha: '2026-11-06' }
  ]);

  const [vistaActiva, setVistaActiva] = useState('productos'); // 'productos' o 'ordenes'
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
        <h2>Panel de Vendedor</h2>
        <div className="btn-group shadow-sm">
          <button 
            className={`btn ${vistaActiva === 'productos' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => { setVistaActiva('productos'); setOrdenSeleccionada(null); }}
          >
            Lista de Productos
          </button>
          <button 
            className={`btn ${vistaActiva === 'ordenes' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => { setVistaActiva('ordenes'); setProductoSeleccionado(null); }}
          >
            Lista de Órdenes
          </button>
        </div>
      </div>

      {/* SECCIÓN 1: PRODUCTOS Y DETALLE */}
      {vistaActiva === 'productos' && (
        <div className="row">
          <div className="col-md-7">
            <h4 className="mb-3">Catálogo y Stock</h4>
            <div className="list-group shadow-sm">
              {productos.map(prod => (
                <div 
                  key={prod.id} 
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-center p-3"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setProductoSeleccionado(prod)}
                >
                  <div className="d-flex align-items-center">
                    <img src={prod.imagen} alt={prod.nombre} style={{ width: '45px', height: '45px', objectFit: 'cover' }} className="rounded me-3" />
                    <div>
                      <h6 className="mb-0 fw-bold">{prod.nombre}</h6>
                      <small className="text-muted">{prod.categoria}</small>
                    </div>
                  </div>
                  <span className="badge bg-success">${prod.precio.toLocaleString('es-CL')}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-5">
            <div className="card shadow-sm border-0 bg-light">
              <div className="card-body">
                <h5 className="card-title fw-bold">Detalle del Producto</h5>
                <hr />
                {productoSeleccionado ? (
                  <div>
                    <img src={productoSeleccionado.imagen} alt={productoSeleccionado.nombre} className="img-fluid rounded mb-3" style={{ maxHeight: '160px', width: '100%', objectFit: 'cover' }} />
                    <p><strong>Nombre:</strong> {productoSeleccionado.nombre}</p>
                    <p><strong>Categoría:</strong> {productoSeleccionado.categoria}</p>
                    <p><strong>Precio:</strong> ${productoSeleccionado.precio.toLocaleString('es-CL')}</p>
                    <p><strong>Stock Disponible:</strong> <span className="badge bg-info text-dark">{productoSeleccionado.stock} unidades</span></p>
                  </div>
                ) : (
                  <p className="text-muted text-center py-4">Selecciona un producto de la lista para ver su detalle completo.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECCIÓN 2: ÓRDENES Y DETALLE */}
      {vistaActiva === 'ordenes' && (
        <div className="row">
          <div className="col-md-7">
            <h4 className="mb-3">Órdenes de Clientes</h4>
            <div className="list-group shadow-sm">
              {ordenes.map(ord => (
                <div 
                  key={ord.id} 
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-center p-3"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setOrdenSeleccionada(ord)}
                >
                  <div>
                    <h6 className="mb-0 fw-bold">Orden #{ord.id} - {ord.cliente}</h6>
                    <small className="text-muted">Fecha: {ord.fecha}</small>
                  </div>
                  <div>
                    <span className={`badge me-2 ${ord.estado === 'Pendiente' ? 'bg-warning text-dark' : 'bg-primary'}`}>{ord.estado}</span>
                    <span className="fw-bold text-success">${ord.total.toLocaleString('es-CL')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-5">
            <div className="card shadow-sm border-0 bg-light">
              <div className="card-body">
                <h5 className="card-title fw-bold">Detalle de la Orden</h5>
                <hr />
                {ordenSeleccionada ? (
                  <div>
                    <p><strong>Nº de Orden:</strong> #{ordenSeleccionada.id}</p>
                    <p><strong>Cliente:</strong> {ordenSeleccionada.cliente}</p>
                    <p><strong>Fecha:</strong> {ordenSeleccionada.fecha}</p>
                    <p><strong>Estado:</strong> <span className="badge bg-secondary">{ordenSeleccionada.estado}</span></p>
                    <p className="mb-1 fw-bold">Productos solicitados:</p>
                    <ul className="list-group mb-3">
                      {ordenSeleccionada.items.map((item, idx) => (
                        <li key={idx} className="list-group-item py-1 bg-white small">{item}</li>
                      ))}
                    </ul>
                    <div className="d-flex justify-content-between fs-5 border-top pt-2">
                      <span>Total:</span>
                      <strong className="text-primary">${ordenSeleccionada.total.toLocaleString('es-CL')}</strong>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted text-center py-4">Selecciona una orden de la lista para ver su detalle.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vendedor;