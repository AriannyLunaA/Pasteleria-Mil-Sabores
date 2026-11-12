import { useState, useEffect } from 'react';
import { inventarioInicial } from '../data/inventario';

const Admin = () => {
  const [seccionActiva, setSeccionActiva] = useState('inventario');

  // === ESTADOS Y LÓGICA DEL INVENTARIO (CON STOCK CORREGIDO) ===
  const [productos, setProductos] = useState(() => {
    const inventarioGuardado = localStorage.getItem("inventario_admin");
    if (inventarioGuardado) {
      const datosAnteriores = JSON.parse(inventarioGuardado);
      // CORRECCIÓN: Si hay datos viejos sin stock, les ponemos 10 automáticamente
      return datosAnteriores.map(p => ({ ...p, stock: p.stock !== undefined ? p.stock : 10 }));
    }
    
    // Si es primera vez, cargamos el inventario inicial con 10 unidades
    const inventarioConStock = inventarioInicial.map(p => ({ ...p, stock: 10 }));
    return inventarioConStock;
  });
  
  const [modoFormulario, setModoFormulario] = useState(null); 
  const [formData, setFormData] = useState({ id: '', nombre: '', descripcion: '', precio: 0, stock: 10, categoria: '', imagen: '' });

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
    setFormData({ ...producto, stock: producto.stock !== undefined ? producto.stock : 10 });
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
    setFormData({ id: nuevoId, nombre: '', descripcion: '', precio: 0, stock: 10, categoria: '', imagen: '' });
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: (name === 'precio' || name === 'stock') ? Number(value) : value
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

  // === ESTADOS PARA ÓRDENES Y USUARIOS ===
  const [ordenes, setOrdenes] = useState([
    { id: 1045, fecha: '16/10/2026', cliente: 'juan.perez@gmail.com', total: 35000, estado: 'Pendiente' },
    { id: 1044, fecha: '15/10/2026', cliente: 'maria.gomez@duoc.cl', total: 15000, estado: 'Entregado' }
  ]);

  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'Administrador Supremo', correo: 'admin@milsabores.cl', rol: 'admin' },
    { id: 2, nombre: 'Vendedor Duoc', correo: 'ventas@milsabores.cl', rol: 'vendedor' },
    { id: 3, nombre: 'Cliente Frecuente', correo: 'cliente@gmail.com', rol: 'cliente' }
  ]);

  const actualizarEstadoOrden = (id, nuevoEstado) => {
    setOrdenes(ordenes.map(o => o.id === id ? { ...o, estado: nuevoEstado } : o));
  };

  const actualizarRolUsuario = (id, nuevoRol) => {
    setUsuarios(usuarios.map(u => u.id === id ? { ...u, rol: nuevoRol } : u));
  };

  // === VARIABLES DINÁMICAS PARA EL DASHBOARD ===
  const totalVentas = ordenes.reduce((acc, orden) => acc + orden.total, 0);
  const ordenesPendientes = ordenes.filter(o => o.estado === 'Pendiente').length;
  const totalUsuarios = usuarios.length;

  // === FUNCIÓN PARA GENERAR Y DESCARGAR PDF ===
  const generarPDF = () => {
    const ventana = window.open('', '_blank');
    ventana.document.write(`
      <html>
        <head>
          <title>Reporte Pastelería Mil Sabores</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
            h1 { color: #8B4513; border-bottom: 2px solid #8B4513; padding-bottom: 10px; }
            h2 { color: #d2691e; margin-top: 30px; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            th { background-color: #f8f9fa; color: #333; }
            .resumen { background-color: #fcf8f2; padding: 15px; border-radius: 8px; border: 1px solid #f5deb3; }
          </style>
        </head>
        <body>
          <h1>Reporte de Estado - Pastelería Mil Sabores</h1>
          <p><strong>Fecha de generación:</strong> ${new Date().toLocaleDateString()}</p>
          
          <h2>1. Resumen General</h2>
          <div class="resumen">
            <ul>
              <li><strong>Total de Ventas Registradas:</strong> $${totalVentas.toLocaleString('es-CL')}</li>
              <li><strong>Órdenes Pendientes:</strong> ${ordenesPendientes}</li>
              <li><strong>Usuarios Totales en Plataforma:</strong> ${totalUsuarios}</li>
              <li><strong>Productos Activos en Catálogo:</strong> ${productos.length}</li>
            </ul>
          </div>

          <h2>2. Estado de Órdenes Actuales</h2>
          <table>
            <tr><th>ID Pedido</th><th>Fecha</th><th>Cliente</th><th>Total</th><th>Estado</th></tr>
            ${ordenes.map(o => `<tr><td>#${o.id}</td><td>${o.fecha}</td><td>${o.cliente}</td><td>$${o.total.toLocaleString('es-CL')}</td><td>${o.estado}</td></tr>`).join('')}
          </table>

          <h2>3. Estado del Inventario</h2>
          <table>
            <tr><th>ID</th><th>Producto</th><th>Categoría</th><th>Precio</th><th>Stock</th></tr>
            ${productos.map(p => `<tr><td>${p.id}</td><td>${p.nombre}</td><td>${p.categoria}</td><td>$${p.precio.toLocaleString('es-CL')}</td><td>${p.stock} un.</td></tr>`).join('')}
          </table>

          <script>
            window.onload = () => { 
              window.print(); 
              setTimeout(() => window.close(), 500); 
            };
          </script>
        </body>
      </html>
    `);
    ventana.document.close();
  };

  const renderDashboard = () => (
    <div>
      <h3 className="mb-4 text-primary">Dashboard (Resumen Actualizado)</h3>
      <div className="row g-3">
        <div className="col-md-4">
          <div className="card bg-success text-white shadow-sm border-0">
            <div className="card-body"><h5>Ventas Registradas</h5><h2>${totalVentas.toLocaleString('es-CL')}</h2></div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-warning text-dark shadow-sm border-0">
            <div className="card-body"><h5>Órdenes Pendientes</h5><h2>{ordenesPendientes}</h2></div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-info text-white shadow-sm border-0">
            <div className="card-body"><h5>Total Usuarios</h5><h2>{totalUsuarios}</h2></div>
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
            {ordenes.map(orden => (
              <tr key={orden.id}>
                <td>#{orden.id}</td>
                <td>{orden.fecha}</td>
                <td>{orden.cliente}</td>
                <td className="fw-bold">${orden.total.toLocaleString('es-CL')}</td>
                <td>
                  <span className={`badge ${orden.estado === 'Pendiente' ? 'bg-warning text-dark' : 'bg-success'}`}>
                    {orden.estado}
                  </span>
                </td>
                <td>
                  <select 
                    className="form-select form-select-sm" 
                    value={orden.estado}
                    onChange={(e) => actualizarEstadoOrden(orden.id, e.target.value)}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Preparando">Preparando</option>
                    <option value="Entregado">Entregado</option>
                    <option value="Cancelada">Cancelada</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderUsuarios = () => (
    <div>
      <h3 className="mb-4 text-primary">Gestión de Roles y Usuarios</h3>
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-hover align-middle bg-white mb-0">
          <thead className="table-dark">
            <tr><th>ID</th><th>Nombre</th><th>Correo</th><th>Rol Asignado</th></tr>
          </thead>
          <tbody>
            {usuarios.map(usuario => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.correo}</td>
                <td>
                  <select 
                    className="form-select form-select-sm w-auto" 
                    value={usuario.rol}
                    onChange={(e) => actualizarRolUsuario(usuario.id, e.target.value)}
                  >
                    <option value="admin">Administrador</option>
                    <option value="vendedor">Vendedor</option>
                    <option value="cliente">Cliente</option>
                  </select>
                </td>
              </tr>
            ))}
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
          <div className="card shadow-sm border-0">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1">Reporte de Estado Global</h5>
                <small className="text-muted">Genera un documento PDF con ventas, inventario y órdenes.</small>
              </div>
              <button className="btn btn-danger" onClick={generarPDF}>
                <i className="bi bi-file-earmark-pdf me-1"></i> Descargar PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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
                <div className="col-md-4 mb-3"><label className="form-label">Precio</label><input type="number" className="form-control" name="precio" value={formData.precio} onChange={manejarCambio} required /></div>
                <div className="col-md-2 mb-3"><label className="form-label">Stock</label><input type="number" className="form-control" name="stock" value={formData.stock} onChange={manejarCambio} required min="0" /></div>
                <div className="col-md-12 mb-3"><label className="form-label">URL de Imagen</label><input type="text" className="form-control" name="imagen" value={formData.imagen} onChange={manejarCambio} required /></div>
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
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td className="fw-bold text-muted">{producto.id}</td>
                <td><img src={producto.imagen} alt={producto.nombre} style={{ width: '50px', height: '50px', objectFit: 'cover' }} className="rounded" /></td>
                <td className="fw-bold">{producto.nombre}</td>
                <td><span className="badge bg-secondary">{producto.categoria}</span></td>
                <td className="text-success fw-bold">${producto.precio.toLocaleString('es-CL')}</td>
                <td>
                  <span className={`badge ${producto.stock < 3 ? 'bg-danger' : 'bg-info text-dark'}`}>
                    {producto.stock} un.
                  </span>
                </td>
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
        <div className="col-md-3 col-lg-2 mb-4">
          <div className="list-group shadow-sm">
            <button className={`list-group-item list-group-item-action ${seccionActiva === 'inventario' ? 'active bg-dark border-dark' : ''}`} onClick={() => setSeccionActiva('inventario')}>📦 Inventario</button>
            <button className={`list-group-item list-group-item-action ${seccionActiva === 'dashboard' ? 'active bg-dark border-dark' : ''}`} onClick={() => setSeccionActiva('dashboard')}>📊 Dashboard</button>
            <button className={`list-group-item list-group-item-action ${seccionActiva === 'boletas' ? 'active bg-dark border-dark' : ''}`} onClick={() => setSeccionActiva('boletas')}>🧾 Órdenes / Boletas</button>
            <button className={`list-group-item list-group-item-action ${seccionActiva === 'usuarios' ? 'active bg-dark border-dark' : ''}`} onClick={() => setSeccionActiva('usuarios')}>👥 Usuarios y Roles</button>
            <button className={`list-group-item list-group-item-action ${seccionActiva === 'reportes' ? 'active bg-dark border-dark' : ''}`} onClick={() => setSeccionActiva('reportes')}>📈 Reportes</button>
          </div>
        </div>
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