import { Link } from 'react-router-dom';

const Blogs = () => {
  return (
    <main className="contenido-principal">
      <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>NOTICIAS IMPORTANTES</h2>

      {/* CASO CURIOSO #1 */}
      <section className="historia-marca" style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
        <article className="mision-vision">
          <h3>CASO CURIOSO #1: El secreto de la Torta de Manjar</h3>
          <p>Descubre el proceso artesanal detrás de nuestro clásico más vendido y por qué utilizamos manjar de campo hervido por más de 4 horas.</p>
          <Link to="/detalle-blog">
            <button className="btn-acento-rosa">VER CASO</button>
          </Link>
        </article>
        <div className="video-container">
          <img 
            src="/img/blog1.jpg" 
            alt="Preparación de torta" 
            style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} 
          />
        </div>
      </section>

      {/* CASO CURIOSO #2 */}
      <section className="historia-marca" style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
        <article className="mision-vision">
          <h3>CASO CURIOSO #2: Repostería sin azúcar</h3>
          <p>La innovación llega a nuestros hornos. Conoce cómo logramos mantener el sabor de siempre utilizando alternativas saludables para toda la familia.</p>
          
          {/* AQUÍ SE INTEGRÓ EL CAMBIO: La ruta ahora apunta a /detalle-blog-2 */}
          <Link to="/detalle-blog-2">
            <button className="btn-acento-rosa">VER CASO</button>
          </Link>
          
        </article>
        <div className="video-container">
          <img 
            src="/img/blog2.jpg" 
            alt="Ingredientes saludables" 
            style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} 
          />
        </div>
      </section>
    </main>
  );
};

export default Blogs;