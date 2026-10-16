import { Navigate } from 'react-router-dom';

const RutaPrivadaAdmin = ({ children }) => {
  // Leemos el usuario de la sesión actual
  const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));

  // Validamos el acceso: Si no hay usuario o su rol NO es admin, lo expulsamos al inicio
  if (!usuarioActivo || usuarioActivo.rol !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Si pasa el filtro de seguridad (es admin), renderizamos el panel
  return children;
};

export default RutaPrivadaAdmin;