🌸 Pastelería 1000 Sabores 🌸
👥 Integrantes del Equipo 1
Arianny L.

Apolo V.

Sofia V.

📖 Descripción del Proyecto
Este proyecto consiste en el desarrollo frontend de una tienda online para "Pastelería 1000 Sabores", elaborada en el marco de la celebración de su 50 aniversario. El objetivo principal es renovar su sistema de ventas a través de una plataforma de e-commerce moderna y accesible que conecte su historia tradicional con las nuevas tecnologías.

El sitio permite a los usuarios explorar un catálogo detallado, acceder a un carrito de compras dinámico y utilizar un sistema de descuentos exclusivos.

Proyecto desarrollado para la asignatura DSY1104 - Evaluación Parcial N° 1.

🛠️ Tecnologías y Arquitectura
A nivel técnico, la interfaz está construida mediante trabajo colaborativo en control de versiones (Git/GitHub) utilizando:

HTML5 Semántico: Estructuración sólida de etiquetas (<main>, <section>, <article>) garantizando accesibilidad y buenas prácticas SEO.

CSS3 (Hojas de estilo externas): Diseño visual unificado, responsivo y centrado en la experiencia de usuario (UX/UI).

Vanilla JavaScript: Lógica de negocio en el cliente sin depender de frameworks externos.

🗂️ Arquitectura de Vistas (Archivos HTML)
El proyecto está segmentado en vistas modulares para una navegación fluida:

index.html: Página de inicio. Presenta la identidad de marca, el video embebido de YouTube y accesos rápidos a las funciones principales.

productos.html: Galería principal. Carga dinámicamente el inventario de tortas mediante JavaScript e incluye filtros por categoría.

detalle_producto.html: Vista enfocada en un solo artículo. Muestra galería de imágenes, descripciones extensas y selección de cantidad.

carrito.html: Interfaz de cobro. Refleja los productos seleccionados en tiempo real, permite aplicar cupones de descuento y recalcula los totales.

registro.html: Formulario de creación de cuenta con validaciones estrictas y selectores geográficos dependientes.

iniciar_sesion.html: Pantalla de autenticación rápida.

contacto.html: Formulario de soporte al cliente con restricciones de longitud de caracteres.

nosotros.html: Historia de la marca por su 50 aniversario y presentación del equipo de desarrolladores.

blogs.html / detalle_blog.html: Sección informativa tipo noticias para exponer casos curiosos de la empresa y recetas.

⚙️ Motor Lógico y Validaciones Clave (JavaScript)
El motor de la aplicación (js/scripts.js) dota de inteligencia al frontend mediante las siguientes funcionalidades de alto valor:

1. Persistencia de Datos sin Servidor (LocalStorage)
El carrito de compras sobrevive al cierre del navegador gracias a la integración nativa con la API localStorage. Cuenta con un bloque de seguridad try/catch que previene caídas del sistema si la memoria caché del usuario se corrompe.

2. Validaciones Estrictas por Expresiones Regulares (Regex)
La plataforma protege la integridad de los datos antes de un eventual envío al backend:

Validación de RUN: Exige formato chileno de 7 a 9 caracteres sin puntos ni guion.

Filtro de Dominios Institucionales: Los correos electrónicos están restringidos mediante Regex exclusivamente a los dominios autorizados: @duoc.cl, @profesor.duoc.cl o @gmail.com.

Control de Longitud: Bloqueo de contraseñas fuera del rango de 4-10 caracteres y limitación estricta de 500 caracteres para mensajes de contacto.

3. DOM Dinámico y Selectores Anidados
Catálogo Inyectado: Las tortas no están fijas en el HTML. Se renderizan recorriendo un arreglo de objetos JSON usando document.createElement, lo que permite un filtrado instantáneo en la vista productos.html.

Regiones y Comunas: El selector de "Comuna" en el registro se habilita y se llena de opciones dinámicamente solo después de que el usuario elige una "Región", utilizando el método .find() sobre la base de datos simulada.

4. Sincronización en Tiempo Real
El uso del método .reduce() permite calcular el total de artículos en el carrito y actualizar automáticamente el contador del <header> (Ej: 🛒 Cart (3)) cada vez que el usuario presiona "Agregar al Carrito", elimina un ítem o modifica las cantidades, eliminando la necesidad de recargar la página.