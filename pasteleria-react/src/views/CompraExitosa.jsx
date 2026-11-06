import { useLocation, useNavigate } from 'react-router-dom';

const CompraExitosa = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Rescatamos los datos enviados desde el Checkout
  const { orden, datosEnvio } = location.state || { orden: '000000', datosEnvio: {} };

  return (
    <div className="container mt-5 text-center mb-5">
      <div className="card shadow-sm border-success mx-auto" style={{ maxWidth: '600px' }}>
        <div className="card-body p-5">
          <h1 className="text-success" style={{ fontSize: '4rem' }}>✅</h1>
          <h2 className="mt-3 text-success fw-bold">¡Pago Exitoso!</h2>
          <p className="lead">Tu pedido ha sido procesado correctamente.</p>
          <hr />
          <div className="text-start mt-4 bg-light p-3 rounded">
            <p className="mb-1"><strong>Nº de Orden:</strong> #{orden}</p>
            <p className="mb-1"><strong>Recibe:</strong> {datosEnvio.nombre}</p>
            <p className="mb-0"><strong>Despacho a:</strong> {datosEnvio.direccion}, {datosEnvio.comuna}</p>
          </div>
          <button className="btn btn-success w-100 mt-4 fw-bold" onClick={() => navigate('/catalogo')}>
            Volver al Catálogo
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompraExitosa;