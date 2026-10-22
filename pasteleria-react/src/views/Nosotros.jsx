import videomora from "../assets/pmora.mp4";

const Nosotros = () => {
  return (
    <main className="container mt-5">
       <h2 className="mb-4 text-center border-bottom pb-2">Nuestra Historia</h2>
      <video width="100%" height="auto" controls autoPlay loop muted playsInline>
        <source src={videomora} type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>
      {/* Sección 1: Sobre la Empresa */}
      <section className="mb-5">
       
        <article className="px-md-4">
          <p>
            <strong>Pastelería 1000 Sabores</strong> nació hace 50 años con un objetivo claro: llevar los sabores 
            más tradicionales de la repostería chilena a la mesa de cada familia. Desde nuestras clásicas tortas 
            de manjar y nuez hasta la suave crema de lúcuma, trabajamos día a día con ingredientes frescos y 
            recetas que han pasado de generación en generación.
          </p>
          <p>
            Hoy, damos un salto hacia el futuro digital, permitiendo que nuestros clientes puedan hacer sus pedidos 
            desde cualquier parte de Chile a través de nuestra nueva tienda online, sin perder el cariño y la calidad 
            artesanal de siempre.
          </p>
        </article>
      </section>

      {/* Sección 2: Sobre los Desarrolladores */}
      <section className="mb-5">
        <h2 className="text-center mb-3">Los Desarrolladores</h2>
        <p className="text-center text-muted mb-4">
          Conoce al equipo de ingeniería detrás de la transformación digital de Pastelería 1000 Sabores.
        </p>
        
        <div className="row g-4">
          {/* Card Arianny */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0 bg-light p-3 text-center">
              <div className="card-body d-flex flex-column">
                <h3 className="card-title fw-bold fs-4">🌸 Arianny L. 🌸</h3>
                <h6 className="card-subtitle mb-3 text-muted">Desarrolladora Frontend</h6>
                <p className="card-text mt-auto">
                  Especialista en estructuración semántica con HTML5 y diseño de interfaces responsivas centradas 
                  en la experiencia del usuario.
                </p>
              </div>
            </div>
          </div>

          {/* Card Apolo */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0 bg-light p-3 text-center">
              <div className="card-body d-flex flex-column">
                <h3 className="card-title fw-bold fs-4"> ࿐ Apolo V. ࿐</h3>
                <h6 className="card-subtitle mb-3 text-muted">Desarrollador Backend & JS</h6>
                <p className="card-text mt-auto">
                  Encargado de la lógica de negocio, validaciones complejas de formularios y gestión de 
                  persistencia de datos con LocalStorage.
                </p>
              </div>
            </div>
          </div>

          {/* Card Sofía */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0 bg-light p-3 text-center">
              <div className="card-body d-flex flex-column">
                <h3 className="card-title fw-bold fs-4">🌸 Sofía V. 🌸</h3>
                <h6 className="card-subtitle mb-3 text-muted">Diseñadora UI/UX & CSS</h6>
                <p className="card-text mt-auto">
                  Responsable de la identidad visual, hojas de estilo en cascada (CSS3) y la accesibilidad 
                  general del sitio web.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Nosotros;