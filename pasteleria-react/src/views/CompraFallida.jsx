import { useNavigate } from 'react-router-dom';

const CompraFallida = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 text-center mb-5">
      <div className="card shadow-sm border-danger mx-auto" style={{ maxWidth: '600px' }}>
        <div className="card-body p-5">
          <h1 className="text-danger" style={{ fontSize: '4rem' }}>❌</h1>
          <h2 className="mt-3 text-danger fw-bold">Pago Rechazado</h2>
          <p className="lead">No hemos podido procesar tu transacción. Verifica los fondos de tu cuenta o intenta con otro medio de pago.</p>
          <hr />
          <div className="d-flex justify-content-center gap-3 mt-4">
            <button className="btn btn-outline-danger w-50 fw-bold" onClick={() => navigate('/checkout')}>
              Reintentar Pago
            </button>
            <button className="btn btn-dark w-50 fw-bold" onClick={() => navigate('/carrito')}>
              Volver al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompraFallida;