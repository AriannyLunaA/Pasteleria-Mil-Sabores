import { useState, useContext } from 'react';
import { inventarioInicial } from '../data/inventario';
import { CartContext } from '../context/CartContext';

const Catalogo = () => {
  const [productos] = useState(inventarioInicial);
  const { agregarAlCarrito } = useContext(CartContext);

  return (
    <div className="mt-4">
      <h2 className="mb-4 text-center border-bottom pb-2">Nuestro Catálogo</h2>
      
      <div className="row">
        {productos.map(producto => (
          <div className="col-md-4 mb-4" key={producto.id}>
            <div className="card h-100 shadow-sm border-0 bg-light">
              <img 
                src={producto.imagen} 
                className="card-img-top" 
                alt={producto.nombre} 
                style={{ height: '250px', objectFit: 'cover' }} 
              />
              <div className="card-body d-flex flex-column">
                <span className="badge bg-secondary mb-2 align-self-start">{producto.categoria}</span>
                <h5 className="card-title fw-bold">{producto.nombre}</h5>
                <p className="card-text text-muted">{producto.descripcion}</p>
                <h4 className="text-primary mt-auto">${producto.precio.toLocaleString('es-CL')}</h4>
                
                <button 
                  className="btn btn-danger mt-3 w-100"
                  onClick={() => agregarAlCarrito(producto)}
                >
                  Agregar al Carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogo;