import { Link } from 'react-router-dom';

const Promociones = () => {
  return (
    <main className="contenido-principal">
      <section className="banner-aniversario">
        <h2>¡Celebramos 50 Años Contigo!</h2>
        <p>Descubre los beneficios exclusivos que hemos preparado para agradecer tu preferencia durante este medio siglo de dulzura.</p>
      </section>

      <section className="grilla-promociones">
        
        {/* Promoción 1: Edad */}
        <article className="promocion-card">
          <div className="descuento-destacado">50%</div>
          <h3>Descuento Senior</h3>
          <p className="texto-secundario">Porque la experiencia se celebra. Usuarios mayores de 50 años reciben un 50% de rebaja en todas sus compras. ¡Automático al registrar tu fecha de nacimiento!</p>
          <Link to="/registro">
            <button className="btn-acento-rosa">Registrarme ahora</button>
          </Link>
        </article>

        {/* Promoción 2: Convenio Institucional */}
        <article className="promocion-card">
          <div className="descuento-destacado">Gratis</div>
          <h3>Cumpleañero Institucional</h3>
          <p className="texto-secundario">Regístrate con tu correo (@duoc.cl, @profesor.duoc.cl o @gmail.com) y llévate una torta completamente gratis el día de tu cumpleaños.</p>
          <Link to="/registro">
            <button className="btn-acento-rosa">Validar mi correo</button>
          </Link>
        </article>

        {/* Promoción 3: Código de Descuento */}
        <article className="promocion-card">
          <div className="descuento-destacado">-10%</div>
          <h3>Cupón Aniversario</h3>
          <p className="texto-secundario">Celebra con nosotros. Usa el código secreto <strong>FELICES50</strong> antes de pagar en tu carrito de compras y obtén un 10% de descuento en el total.</p>
          <Link to="/carrito">
            <button className="btn-acento-rosa">Ir a mi carrito</button>
          </Link>
        </article>

      </section>
    </main>
  );
};

export default Promociones;