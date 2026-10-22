import { Link } from 'react-router-dom';

const DetalleBlog = () => {
  return (
    <main className="contenido-principal" style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Enlace de retroceso manejado por React Router */}
      <Link 
        to="/blogs" 
        style={{ display: 'inline-block', marginBottom: '20px', color: 'var(--color-chocolate)', textDecoration: 'none' }}
      >
        ← Volver a Noticias
      </Link>
      
      <article className="detalle-articulo">
        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
          CASO CURIOSO #1: El secreto de la Torta de Manjar
        </h2>
        
        {/* Imagen de cabecera del artículo */}
        <img 
          src="/img/blog1.jpg" 
          alt="Preparación de torta de manjar" 
          style={{ width: '100%', borderRadius: '8px', marginBottom: '30px' }} 
        />
        
        <div className="contenido-texto" style={{ lineHeight: '1.8', color: 'var(--color-marron-oscuro)' }}>
          <p>
            En Pastelería 1000 Sabores, creemos que el secreto de un buen postre no solo reside en la receta, 
            sino en la paciencia. Hace 50 años, nuestra fundadora descubrió que el manjar comercial no lograba 
            la consistencia necesaria para nuestras icónicas tortas circulares.
          </p>
          
          <p>
            La solución fue volver a los orígenes. Hoy, seguimos hirviendo nuestra propia leche condensada a 
            fuego lento durante exactamente 4 horas y 15 minutos. Este proceso técnico carameliza los azúcares 
            de manera natural, logrando un color cobrizo intenso y una textura firme que no humedece el 
            bizcocho en exceso.
          </p>

          <p>
            Además, incorporamos un 15% de nuez mariposa tostada en la mezcla, lo que equilibra el dulzor y 
            aporta una textura crujiente que ha enamorado a tres generaciones de chilenos. La próxima vez que 
            pruebes un trozo, recuerda que estás saboreando más de cuatro horas de dedicación absoluta.
          </p>
        </div>
      </article>
    </main>
  );
};

export default DetalleBlog;