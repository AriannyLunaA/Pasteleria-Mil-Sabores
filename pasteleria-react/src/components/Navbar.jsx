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
          <Link to="/carrito" className="link-carrito">
            🛒 Cart (<span id="contador-carrito">{carrito.length}</span>)
          </Link>
          
          <div className="enlaces-auth">
            {!usuario ? (
              <>
                <Link to="/login">Iniciar sesión</Link> | <Link to="/registro">Registrar usuario</Link>
              </>
            ) : (
              <>
                <span className="texto-secundario me-2" style={{ fontSize: '0.9rem' }}>
                  {usuario.email}
                </span> | 
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
          <li><Link to="/">Nosotros</Link></li>
          <li><Link to="/catalogo">Catálogo</Link></li>
          
          {usuario?.rol === 'admin' && (
            <li><Link to="/admin" style={{ color: 'var(--color-chocolate)' }}>Panel Admin</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;