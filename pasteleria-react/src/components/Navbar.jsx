import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { carrito } = useContext(CartContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand text-warning fw-bold" to="/">Pastelería 1000 Sabores</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Catálogo</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/registro">Registro</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin">Panel Admin</Link>
            </li>
          </ul>
          <Link className="btn btn-outline-light" to="/carrito">
            🛒 Carrito <span className="badge bg-danger ms-1">{carrito.length}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;