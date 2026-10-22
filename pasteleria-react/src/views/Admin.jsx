import { useState, useEffect } from 'react';
import { inventarioInicial } from '../data/inventario';

const Admin = () => {
  // === ESTADOS DEL PANEL ===
  const [seccionActiva, setSeccionActiva] = useState('inventario');

  // === ESTADOS Y LÓGICA DEL INVENTARIO (Tú código original) ===
  const [productos, setProductos] = useState(() => {
    const inventarioGuardado = localStorage.getItem("inventario_admin");
    return inventarioGuardado ? JSON.parse(inventarioGuardado) : inventarioInicial;
  });
  const [modoFormulario, setModoFormulario] = useState(null); 
  const [formData, setFormData] = useState({ id: '', nombre: '', descripcion: '', precio: 0, categoria: '', imagen: '' });

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
    const numerosIds = productos.map(p => {
      const partes = p.id.split('-');
      return partes.length === 2 && !isNaN(partes[1]) ? parseInt(partes[1], 10) : 0;
    });
    const maxNumero = numerosIds.length > 0 ? Math.max(...numerosIds) : 0;
    const siguienteNumero = (maxNumero + 1).toString().padStart(3, '0');
    const nuevoId = `TT-${siguienteNumero}`;

    setModoFormulario('CREAR');
    setFormData({ id: nuevoId, nombre: '', descripcion: '', precio: 0, categoria: '', imagen: '' });
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
      setProductos(prevProductos => prevProductos.map(p => (p.id === formData.id ? formData : p)));
    }
    setModoFormulario(null);
  };

  const cancelarFormulario = () => {
    setModoFormulario(null);
  };

  // === RENDERIZADO DE PESTAÑAS (MOCKUPS) ===
  const renderDashboard = () => (
    <div>
      <h3 className="mb-4 text-primary">Dashboard (Resumen)</h3>
      <div className="row g-3">
        <div className="col-md-4">
          <div className="card bg-success text-white shadow-sm border-0">
            <div className="card-body"><h5>Ventas del Día</h5><h2>$125.500</h2></div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-warning text-dark shadow-sm border-0">
            <div className="card-body"><h5>Órdenes Pendientes</h5><h2>12</h2></div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-info text-white shadow-sm border-0">
            <div className="card-body"><h5>Nuevos Usuarios</h5><h2>5</h2></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBoletas = () => (
    <div>
      <h3 className="mb-4 text-primary">Gestión de Boletas y Órdenes</h3>
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-hover align-middle bg-white mb-0">
          <thead className="table-dark">
            <tr><th>ID Pedido</th><th>Fecha</th><th>Cliente</th><th>Total</th><th>Estado</th><th>Acción</th></tr>
          </thead>
          <tbody>
            <tr><td>#1045</td><td>16/10/2026</td><td>juan.perez@gmail.com</td><td>$35.000</td><td><span className="badge bg-warning text-dark">Pendiente</span></td><td><button className="btn btn-sm btn-outline-primary">Detalle</button></td></tr>
            <tr><td>#1044</td><td>15/10/2026</td><td>maria.gomez@duoc.cl</td><td>$15.000</td><td><span className="badge bg-success">Entregado</span></td><td><button className="btn btn-sm btn-outline-primary">Detalle</button></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderUsuarios = () => (
    <div>
      <h3 className="mb-4 text-primary">Gestión de Usuarios</h3>
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-hover align-middle bg-white mb-0">
          <thead className="table-dark">
            <tr><th>ID</th><th>Nombre</th><th>Correo</th><th>Rol</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>Administrador</td><td>admin@duoc.cl</td><td><span className="badge bg-danger">Admin</span></td><td><button className="btn btn-sm btn-secondary" disabled>Editar</button></td></tr>
            <tr><td>2</td><td>Cliente Frecuente</td><td>cliente@gmail.com</td><td><span className="badge bg-primary">Cliente</span></td><td><button className="btn btn-sm btn-outline-danger">Bloquear</button></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderReportes = () => (
    <div>
      <h3 className="mb-4 text-primary">Reportes del Sistema</h3>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="card shadow-sm border-0"><div className="card-body d-flex justify-content-between"><div><h5 className="mb-1">Ventas Mensuales</h5></div><button className="btn btn-success">Descargar</button></div></div>
        </div>
      </div>
    </div>
  );

  // === PESTAÑA DE INVENTARIO (Tu código original) ===
  const renderInventario = () => (
    <div>
      {modoFormulario ? (
        <div className={`card shadow-sm mb-4 border-${modoFormulario === 'CREAR' ? 'primary' : 'warning'}`}>
          <div className={`card-header text-white fw-bold bg-${modoFormulario === 'CREAR' ? 'primary' : 'warning text-dark'}`}>
            {modoFormulario === 'CREAR' ? 'Crear Nuevo Producto' : `Editando Producto: ${formData.id}`}
          </div>
          <div className="card-body">
            <form onSubmit={guardarProducto}>
              <div className="row">
                <div className="col-md-6 mb-3"><label className="form-label">Nombre</label><input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={manejarCambio} required /></div>
                <div className="col-md-6 mb-3"><label className="form-label">Categoría</label><input type="text" className="form-control" name="categoria" value={formData.categoria} onChange={manejarCambio} required /></div>
                <div className="col-md-6 mb-3"><label className="form-label">Precio</label><input type="number" className="form-control" name="precio" value={formData.precio} onChange={manejarCambio} required /></div>
                <div className="col-md-6 mb-3"><label className="form-label">URL de Imagen</label><input type="text" className="form-control" name="imagen" value={formData.imagen} onChange={manejarCambio} required /></div>
                <div className="col-12 mb-3"><label className="form-label">Descripción</label><textarea className="form-control" name="descripcion" value={formData.descripcion} onChange={manejarCambio} required rows="2"></textarea></div>
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
          <button className="btn btn-primary fw-bold" onClick={iniciarCreacion}>+ Nuevo Producto</button>
        </div>
      )}
      
      <div className="table-responsive shadow-sm">
        <table className="table table-hover table-bordered align-middle bg-white">
          <thead className="table-dark">
            <tr><th>ID</th><th>Imagen</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th className="text-center">Acciones</th></tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td className="fw-bold text-muted">{producto.id}</td>
                <td><img src={producto.imagen} alt={producto.nombre} style={{ width: '50px', height: '50px', objectFit: 'cover' }} className="rounded" /></td>
                <td className="fw-bold">{producto.nombre}</td>
                <td><span className="badge bg-secondary">{producto.categoria}</span></td>
                <td className="text-success fw-bold">${producto.precio.toLocaleString('es-CL')}</td>
                <td className="text-center">
                  <button className="btn btn-sm btn-warning me-2" onClick={() => iniciarEdicion(producto)} disabled={modoFormulario !== null}>Editar</button>
                  <button className="btn btn-sm btn-danger" onClick={() => eliminarProducto(producto.id)} disabled={modoFormulario !== null}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <main className="container-fluid mt-4 mb-5">
      <div className="row">
        {/* Menú Lateral (Sidebar) */}
        <div className="col-md-3 col-lg-2 mb-4">
          <div className="list-group shadow-sm">
            <button className={`list-group-item list-group-item-action ${seccionActiva === 'inventario' ? 'active bg-dark border-dark' : ''}`} onClick={() => setSeccionActiva('inventario')}>📦 Inventario</button>
            <button className={`list-group-item list-group-item-action ${seccionActiva === 'dashboard' ? 'active bg-dark border-dark' : ''}`} onClick={() => setSeccionActiva('dashboard')}>📊 Dashboard</button>
            <button className={`list-group-item list-group-item-action ${seccionActiva === 'boletas' ? 'active bg-dark border-dark' : ''}`} onClick={() => setSeccionActiva('boletas')}>🧾 Órdenes / Boletas</button>
            <button className={`list-group-item list-group-item-action ${seccionActiva === 'usuarios' ? 'active bg-dark border-dark' : ''}`} onClick={() => setSeccionActiva('usuarios')}>👥 Usuarios</button>
            <button className={`list-group-item list-group-item-action ${seccionActiva === 'reportes' ? 'active bg-dark border-dark' : ''}`} onClick={() => setSeccionActiva('reportes')}>📈 Reportes</button>
          </div>
        </div>

        {/* Contenido Principal Dinámico */}
        <div className="col-md-9 col-lg-10">
          <div className="bg-light p-4 rounded shadow-sm" style={{ minHeight: '60vh' }}>
            {seccionActiva === 'inventario' && renderInventario()}
            {seccionActiva === 'dashboard' && renderDashboard()}
            {seccionActiva === 'boletas' && renderBoletas()}
            {seccionActiva === 'usuarios' && renderUsuarios()}
            {seccionActiva === 'reportes' && renderReportes()}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Admin;