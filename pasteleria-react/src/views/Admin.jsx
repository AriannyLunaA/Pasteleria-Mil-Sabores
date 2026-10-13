import { useState, useEffect } from 'react';
import { inventarioInicial } from '../data/inventario';

const Admin = () => {
  const [productos, setProductos] = useState(() => {
    const inventarioGuardado = localStorage.getItem("inventario_admin");
    return inventarioGuardado ? JSON.parse(inventarioGuardado) : inventarioInicial;
  });

  const [modoFormulario, setModoFormulario] = useState(null); 
  const [formData, setFormData] = useState({
    id: '', nombre: '', descripcion: '', precio: 0, categoria: '', imagen: ''
  });

  useEffect(() => {
    localStorage.setItem("inventario_admin", JSON.stringify(productos));
  }, [productos]);

  const eliminarProducto = (id) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar este producto del inventario?");
    if (confirmacion) {
      setProductos(prevProductos => prevProductos.filter(producto => producto.id !== id));
    }
  };

  const iniciarEdicion = (producto) => {
    setModoFormulario('EDITAR');
    setFormData({ ...producto });
  };

const iniciarCreacion = () => {
    console.log("Evento detectado: Iniciando creación de nuevo producto.");
    
    // 1. Extraer todos los números de los IDs actuales que empiecen con "TT-" o "TC-"
    const numerosIds = productos.map(p => {
      // Divide el string por el guion (ej: "TT-006" -> ["TT", "006"])
      const partes = p.id.split('-');
      // Si tiene dos partes y la segunda es un número, lo retorna; si no, retorna 0
      return partes.length === 2 && !isNaN(partes[1]) ? parseInt(partes[1], 10) : 0;
    });

    // 2. Encontrar el número más alto (si el arreglo está vacío, asume 0)
    const maxNumero = numerosIds.length > 0 ? Math.max(...numerosIds) : 0;

    // 3. Sumar 1 al máximo y formatearlo con 3 ceros a la izquierda (ej: 7 -> "007")
    const siguienteNumero = (maxNumero + 1).toString().padStart(3, '0');

    // 4. Asignar el nuevo ID asumiendo el prefijo "TT-" por defecto
    const nuevoId = `TT-${siguienteNumero}`;

    setModoFormulario('CREAR');
    setFormData({
      id: nuevoId, 
      nombre: '', descripcion: '', precio: 0, categoria: '', imagen: ''
    });
  
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'precio' ? Number(value) : value
    }));
  };

  const guardarProducto = (e) => {
    e.preventDefault();
    
    if (modoFormulario === 'CREAR') {
      setProductos(prevProductos => [...prevProductos, formData]);
    } else {
      setProductos(prevProductos => 
        prevProductos.map(p => (p.id === formData.id ? formData : p))
      );
    }
    
    setModoFormulario(null);
  };

  const cancelarFormulario = () => {
    setModoFormulario(null);
  };

  return (
    <div className="mt-4">
      <h2 className="mb-4 border-bottom pb-2">Panel de Administración</h2>
      
      {modoFormulario ? (
        <div className={`card shadow-sm mb-4 border-${modoFormulario === 'CREAR' ? 'primary' : 'warning'}`}>
          <div className={`card-header text-white fw-bold bg-${modoFormulario === 'CREAR' ? 'primary' : 'warning text-dark'}`}>
            {modoFormulario === 'CREAR' ? 'Crear Nuevo Producto' : `Editando Producto: ${formData.id}`}
          </div>
          <div className="card-body">
            <form onSubmit={guardarProducto}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Nombre</label>
                  <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={manejarCambio} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Categoría</label>
                  <input type="text" className="form-control" name="categoria" value={formData.categoria} onChange={manejarCambio} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Precio</label>
                  <input type="number" className="form-control" name="precio" value={formData.precio} onChange={manejarCambio} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">URL de Imagen</label>
                  <input type="text" className="form-control" name="imagen" value={formData.imagen} onChange={manejarCambio} required />
                </div>
                <div className="col-12 mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea className="form-control" name="descripcion" value={formData.descripcion} onChange={manejarCambio} required rows="2"></textarea>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-secondary me-2" onClick={cancelarFormulario}>Cancelar</button>
                <button type="submit" className="btn btn-success">Guardar Producto</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Gestión de Inventario</h4>
          <button className="btn btn-primary fw-bold" onClick={iniciarCreacion}>
            + Nuevo Producto
          </button>
        </div>
      )}
      
      <div className="table-responsive shadow-sm">
        <table className="table table-hover table-bordered align-middle bg-white">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td className="fw-bold text-muted">{producto.id}</td>
                <td>
                  <img 
                    src={producto.imagen} 
                    alt={producto.nombre} 
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                    className="rounded"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/50?text=Error'; }}
                  />
                </td>
                <td className="fw-bold">{producto.nombre}</td>
                <td>
                  <span className="badge bg-secondary">{producto.categoria}</span>
                </td>
                <td className="text-success fw-bold">
                  ${producto.precio.toLocaleString('es-CL')}
                </td>
                <td className="text-center">
                  <button 
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => iniciarEdicion(producto)}
                    disabled={modoFormulario !== null}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => eliminarProducto(producto.id)}
                    disabled={modoFormulario !== null}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {productos.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">
                  No hay productos en el inventario.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;