import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { carrito } = useContext(CartContext);
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('usuarioActivo'));
    if (session) setUsuario(session);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuarioActivo');
    setUsuario(null);
    navigate('/login');
  };

  // Variables de control de roles para mantener el código limpio
  const esVendedor = usuario?.rol === 'vendedor';
  const esAdmin = usuario?.rol === 'admin';
  const esClienteOInvitado = !usuario || usuario?.rol === 'cliente';

  return (
    <header className="header-principal">
      <div className="header-top">
        {/* Logo y Nombre */}
        <div className="logo-container">
          <h1>Pastelería 1000 Sabores</h1>
          <p className="texto-secundario">50 aniversario celebrando la repostería chilena</p>
        </div>
        
        {/* Carrito y Accesos */}
        <div className="accesos-usuario">
          
          {/* El carrito NO se muestra al vendedor, solo a clientes y admins */}
          {!esVendedor && (
            <Link to="/carrito" className="link-carrito">
              🛒 Cart (<span id="contador-carrito">{carrito.length}</span>)
            </Link>
          )}
          
          <div className="enlaces-auth">
            {!usuario ? (
              <>
                <Link to="/login">Iniciar sesión</Link> | <Link to="/registro">Registrar usuario</Link>
              </>
            ) : (
              <>
                <Link to="/perfil" className="texto-secundario fw-bold me-2" style={{ fontSize: '0.9rem', textDecoration: 'none' }}>
                  👤 {usuario.nombre || usuario.email}
                </Link> | 
                <button 
                  onClick={handleLogout} 
                  style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-chocolate)', cursor: 'pointer', fontSize: '0.9rem', marginLeft: '5px' }}
                >
                  Cerrar sesión
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Navegación alineada a los mockups */}
      <nav className="navegacion-principal">
        <ul>
          {/* Enlaces exclusivos de la Tienda (Ocultos para el vendedor) */}
          {(esClienteOInvitado || esAdmin) && (
            <>
              <li><Link to="/">Nosotros</Link></li>
              <li><Link to="/catalogo">Catálogo</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/promociones">Promociones</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </>
          )}

          {/* Enlace al panel de Vendedor (Visible para Vendedor y Admin) */}
          {(esVendedor || esAdmin) && (
            <li>
              <Link to="/vendedor" style={{ color: 'var(--color-chocolate)', fontWeight: 'bold' }}>
                Panel Vendedor
              </Link>
            </li>
          )}

          {/* Enlace al panel de administración (Solo Admin) */}
          {esAdmin && (
            <li>
              <Link to="/admin" style={{ color: 'var(--color-chocolate)', fontWeight: 'bold' }}>
                Panel Admin
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;