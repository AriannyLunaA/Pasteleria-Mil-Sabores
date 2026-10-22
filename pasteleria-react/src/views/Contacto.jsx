import { useState } from 'react';

const Contacto = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setExito(false);

    // Validación de campos vacíos
    if (!nombre.trim() || !correo.trim() || !mensaje.trim()) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    // Validación estricta de dominios de correo solicitada en el diseño
    const dominiosValidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    const correoValido = dominiosValidos.some(dominio => correo.endsWith(dominio));

    if (!correoValido) {
      setError('Error: Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com');
      return;
    }

    // Simulación de envío exitoso
    setExito(true);
    setNombre('');
    setCorreo('');
    setMensaje('');
  };

  return (
    <main className="contenido-principal">
      <section className="seccion-registro">
        <h2>Formulario de Contactos</h2>
        <p className="texto-secundario">Envíanos tus dudas o sugerencias y te responderemos a la brevedad.</p>
        
        {/* Alertas de validación de React */}
        {error && <div className="mensaje-error" style={{ textAlign: 'center', marginBottom: '15px' }}>{error}</div>}
        {exito && <div style={{ color: 'green', fontWeight: 'bold', textAlign: 'center', marginBottom: '15px' }}>¡Mensaje enviado con éxito!</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="grupo-input">
            <label htmlFor="nombre-contacto">Nombre Completo:</label>
            <input 
              type="text" 
              id="nombre-contacto" 
              required 
              maxLength="100"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="grupo-input">
            <label htmlFor="correo-contacto">Correo Electrónico:</label>
            <input 
              type="email" 
              id="correo-contacto" 
              required 
              maxLength="100"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <p className="texto-secundario text-pequeno">Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com</p>
          </div>

          <div className="grupo-input">
            <label htmlFor="mensaje-contacto">Mensaje (Máximo 500 caracteres):</label>
            {/* El atributo style en React se pasa como un objeto con llaves dobles y formato camelCase */}
            <textarea 
              id="mensaje-contacto" 
              required 
              maxLength="500" 
              rows="5" 
              style={{ width: '100%', padding: '12px', border: '1px solid var(--color-gris-claro)', borderRadius: '5px', fontFamily: 'var(--fuente-principal)', resize: 'vertical' }}
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            ></textarea>
          </div>

          <button type="submit" className="btn-acento-chocolate btn-block">Enviar Mensaje</button>
        </form>
      </section>
    </main>
  );
};

export default Contacto;