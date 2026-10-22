import { Link } from 'react-router-dom';

const DetalleBlog2 = () => {
  return (
    <main className="contenido-principal" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Link 
        to="/blogs" 
        style={{ display: 'inline-block', marginBottom: '20px', color: 'var(--color-chocolate)', textDecoration: 'none' }}
      >
        ← Volver a Noticias
      </Link>
      
      <article className="detalle-articulo">
        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
          CASO CURIOSO #2: Repostería sin azúcar
        </h2>
        
        <img 
          src="/img/blog2.jpg" 
          alt="Repostería saludable sin azúcar" 
          style={{ width: '100%', borderRadius: '8px', marginBottom: '30px' }} 
        />
        
        <div className="contenido-texto" style={{ lineHeight: '1.8', color: 'var(--color-marron-oscuro)' }}>
          <p>
            La innovación llega a nuestros hornos. Durante años, nuestros clientes nos pidieron opciones que 
            mantuvieran el sabor tradicional de Pastelería 1000 Sabores, pero adaptadas a las nuevas necesidades 
            nutricionales y de salud.
          </p>
          
          <p>
            El desafío fue enorme: el azúcar no solo aporta dulzor, sino también humedad y textura a los bizcochos. 
            Después de meses de pruebas, logramos la fórmula perfecta sustituyendo el azúcar refinada por alternativas 
            naturales como la alulosa, el puré de dátiles y toques de miel cruda, combinados con harinas integrales, 
            semillas y frutos secos.
          </p>

          <p>
            Hoy estamos orgullosos de ofrecer una línea completa de repostería consciente. Puedes disfrutar de una 
            deliciosa torta, como la que ves en imagen, decorada con higos frescos, nueces y una crema a 
            base de ingredientes naturales. Es el mismo amor de hace 50 años, pero pensado para el bienestar de toda tu familia.
          </p>
        </div>
      </article>
    </main>
  );
};

export default DetalleBlog2;