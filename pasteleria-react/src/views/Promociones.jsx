import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Promociones = () => {
  const { aplicarDescuento } = useContext(CartContext);
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('usuarioActivo'));
    if (session) setUsuario(session);
  }, []);

  const handleAplicarPromo = (nombrePromo, porcentaje) => {
    if (!usuario) {
      alert("Debes iniciar sesión o registrarte para activar esta promoción.");
      navigate('/login', { state: { from: '/carrito' } });
      return;
    }

    // Validación estricta: Un solo descuento por correo electrónico
    const historialDescuentos = JSON.parse(localStorage.getItem('historialDescuentos')) || {};
    if (historialDescuentos[usuario.email]) {
      alert(`Lo sentimos, el correo ${usuario.email} ya ha utilizado una promoción de aniversario previamente. Solo se permite una por cliente.`);
      return;
    }
    
    aplicarDescuento({ nombre: nombrePromo, porcentaje: porcentaje });
    alert(`¡Éxito! Promoción "${nombrePromo}" activada. El descuento se reflejará en tu carrito.`);
    navigate('/carrito');
  };

  return (
    <main className="contenido-principal">
      <section className="banner-aniversario">
        <h2>¡Celebramos 50 Años Contigo!</h2>
        <p>Descubre los beneficios exclusivos que hemos preparado para agradecer tu preferencia durante este medio siglo de dulzura.</p>
      </section>

      <section className="grilla-promociones">
        <article className="promocion-card">
          <div className="descuento-destacado">50%</div>
          <h3>Descuento Senior</h3>
          <p className="texto-secundario">Porque la experiencia se celebra. Usuarios mayores de 50 años reciben un 50% de rebaja en todas sus compras.</p>
          <button className="btn-acento-rosa w-100" onClick={() => handleAplicarPromo('Descuento Senior 50%', 0.50)}>
            {usuario ? 'Aplicar Descuento' : 'Iniciar sesión para aplicar'}
          </button>
        </article>

        <article className="promocion-card">
          <div className="descuento-destacado">Gratis</div>
          <h3>Cumpleañero Institucional</h3>
          <p className="texto-secundario">Regístrate con tu correo (@duoc.cl, @profesor.duoc.cl o @gmail.com) y llévate una torta completamente gratis el día de tu cumpleaños.</p>
          <button className="btn-acento-rosa w-100" onClick={() => handleAplicarPromo('Cumpleañero Institucional (100%)', 1.00)}>
            {usuario ? 'Aplicar Convenio' : 'Validar mi correo'}
          </button>
        </article>

        <article className="promocion-card">
          <div className="descuento-destacado">-10%</div>
          <h3>Cupón Aniversario</h3>
          <p className="texto-secundario">Celebra con nosotros. Usa el código secreto <strong>FELICES50</strong> antes de pagar en tu carrito de compras y obtén un 10% de descuento en el total.</p>
          <button className="btn-acento-rosa w-100" onClick={() => handleAplicarPromo('Cupón Aniversario 10%', 0.10)}>
            {usuario ? 'Aplicar Cupón' : 'Iniciar sesión para aplicar'}
          </button>
        </article>
      </section>
    </main>
  );
};

export default Promociones;