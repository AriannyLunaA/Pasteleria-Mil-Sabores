document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. BASE DE DATOS: PRODUCTOS Y REGIONES
    // ==========================================
    const inventarioProductos = [
        { id: 'TC-001', nombre: 'Torta Cuadrada de Chocolate', descripcion: 'Bizcocho de chocolate intenso, relleno de crema de chocolate y trufa.', precio: 45000, imagen: 'img/torta-chocolate.jpg', categoria: 'cuadrada' },
        { id: 'TT-002', nombre: 'Torta Circular de Vainilla', descripcion: 'Torta clásica con bizcocho de vainilla, relleno a elección.', precio: 40000, imagen: 'img/torta-vainilla.jpg', categoria: 'circular' },
        { id: 'TT-003', nombre: 'Torta de Manjar y Nuez', descripcion: 'El clásico sabor chileno. Bizcocho de nuez con abundante manjar.', precio: 42000, imagen: 'img/torta-manjar.jpg', categoria: 'circular' }
    ];

    // CANDADO 1: Congelamos el inventario para que nadie pueda alterar precios ni descripciones
    Object.freeze(inventarioProductos);
    inventarioProductos.forEach(producto => Object.freeze(producto));

    const datosRegiones = [
        { region: "Región Metropolitana", comunas: ["Santiago", "Ñuñoa", "Providencia", "Puente Alto", "Maipú"] },
        { region: "Región de Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"] },
        { region: "Región del Biobío", comunas: ["Concepción", "Talcahuano", "Chiguayante", "San Pedro de la Paz"] }
    ];

    const formatearMoneda = (numero) => '$' + numero.toLocaleString('es-CL');
    const regexCorreoGlobal = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    
    // CANDADO 2: Sanitizamos el carrito al leer la memoria
    let carrito = [];
    try {
        const carritoCrudo = JSON.parse(localStorage.getItem('carritoPasteleria')) || [];
        
        // Filtramos: Solo aceptamos productos que existan en el inventario y con cantidad positiva
        carrito = carritoCrudo.filter(itemCarrito => {
            const existeEnInventario = inventarioProductos.some(p => p.id === itemCarrito.id);
            const esCantidadValida = typeof itemCarrito.cantidad === 'number' && itemCarrito.cantidad > 0;
            return existeEnInventario && esCantidadValida;
        });
    } catch (error) {
        localStorage.removeItem('carritoPasteleria'); // Borra datos si hubo manipulación maliciosa
    }

    // ==========================================
    // 2. LÓGICA DEL CONTADOR GLOBAL
    // ==========================================
    const actualizarContadorCarrito = () => {
        const contadorUI = document.getElementById('contador-carrito');
        if (contadorUI) {
            const totalArticulos = carrito.reduce((suma, item) => suma + item.cantidad, 0);
            contadorUI.textContent = totalArticulos;
        }
    };
    
    // Ejecutar inmediatamente al cargar cualquier página para mostrar el número real
    actualizarContadorCarrito();

    // ==========================================
    // 3. LÓGICA DEL CATÁLOGO DINÁMICO
    // ==========================================
    const contenedorCatalogo = document.getElementById('contenedor-productos');
    const filtroTipo = document.getElementById('filtro-tipo');

    if (contenedorCatalogo) {
        const renderizarCatalogo = (productosAMostrar) => {
            contenedorCatalogo.innerHTML = ''; 
            productosAMostrar.forEach(producto => {
                const article = document.createElement('article');
                article.className = 'producto-card';
                article.dataset.categoria = producto.categoria;
                
                // Imagen y textos envueltos en el enlace al detalle, botón independiente
                article.innerHTML = `
                    <a href="detalle_producto.html" style="text-decoration: none; color: inherit; display: block;">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                        <div class="info-producto">
                            <span class="id-producto texto-secundario">ID: ${producto.id}</span>
                            <h3>${producto.nombre}</h3>
                            <p>${producto.descripcion}</p>
                            <span class="precio">${formatearMoneda(producto.precio)} CLP</span>
                        </div>
                    </a>
                    <button class="btn-acento-rosa btn-agregar-carrito" data-id="${producto.id}" style="margin-top: 10px; width: 100%;">Agregar al Carrito</button>
                `;
                contenedorCatalogo.appendChild(article);
            });

            document.querySelectorAll('.btn-agregar-carrito').forEach(boton => {
                boton.addEventListener('click', (e) => {
                    const idProducto = e.target.dataset.id;
                    const productoExiste = carrito.find(item => item.id === idProducto);
                    
                    if (productoExiste) {
                        productoExiste.cantidad += 1;
                    } else {
                        carrito.push({ id: idProducto, cantidad: 1 });
                    }
                    
                    localStorage.setItem('carritoPasteleria', JSON.stringify(carrito));
                    actualizarContadorCarrito(); // Actualiza el número en el header
                    alert('Producto agregado al carrito exitosamente.');
                });
            });
        };

        renderizarCatalogo(inventarioProductos);

        if (filtroTipo) {
            filtroTipo.addEventListener('change', (e) => {
                const categoria = e.target.value;
                renderizarCatalogo(categoria === 'todos' ? inventarioProductos : inventarioProductos.filter(p => p.categoria === categoria));
            });
        }
    }

    // ==========================================
    // 4. LÓGICA DEL CARRITO DE COMPRAS
    // ==========================================
    const contenedorCarrito = document.getElementById('contenedor-items-carrito');
    
    if (contenedorCarrito) {
        const spanSubtotal = document.getElementById('subtotal-carrito');
        const spanDescuento = document.getElementById('monto-descuento');
        const spanTotal = document.getElementById('total-final-carrito');
        let porcentajeDescuento = 0;

        const renderizarCarrito = () => {
            contenedorCarrito.innerHTML = '';
            if (carrito.length === 0) {
                contenedorCarrito.innerHTML = '<p>Tu carrito está vacío.</p>';
                actualizarTotales();
                return;
            }

            carrito.forEach(itemCarrito => {
                const productoBase = inventarioProductos.find(p => p.id === itemCarrito.id);
                if (!productoBase) return;

                const article = document.createElement('article');
                article.className = 'item-carrito';
                article.innerHTML = `
                    <img src="${productoBase.imagen}" alt="${productoBase.nombre}">
                    <div class="detalles-item">
                        <h3>${productoBase.nombre}</h3>
                        <p class="precio">${formatearMoneda(productoBase.precio)} CLP</p>
                    </div>
                    <div class="controles-cantidad">
                        <label class="texto-secundario">Cant:</label>
                        <input type="number" data-id="${productoBase.id}" value="${itemCarrito.cantidad}" min="1" class="input-cantidad">
                        <button class="btn-eliminar" data-id="${productoBase.id}">🗑️ Eliminar</button>
                    </div>
                `;
                contenedorCarrito.appendChild(article);
            });

            document.querySelectorAll('.input-cantidad').forEach(input => {
                input.addEventListener('change', (e) => {
                    let nuevaCantidad = parseInt(e.target.value);
                    if (isNaN(nuevaCantidad) || nuevaCantidad < 1) nuevaCantidad = 1;
                    const producto = carrito.find(item => item.id === e.target.dataset.id);
                    if (producto) producto.cantidad = nuevaCantidad;
                    
                    localStorage.setItem('carritoPasteleria', JSON.stringify(carrito));
                    actualizarContadorCarrito(); // Actualiza el número en el header
                    actualizarTotales();
                });
            });

            document.querySelectorAll('.btn-eliminar').forEach(boton => {
                boton.addEventListener('click', (e) => {
                    carrito = carrito.filter(item => item.id !== e.target.dataset.id);
                    
                    localStorage.setItem('carritoPasteleria', JSON.stringify(carrito));
                    actualizarContadorCarrito(); // Actualiza el número en el header
                    renderizarCarrito();
                });
            });
            actualizarTotales();
        };

        const actualizarTotales = () => {
            let subtotal = 0;
            carrito.forEach(itemCarrito => {
                const productoBase = inventarioProductos.find(p => p.id === itemCarrito.id);
                if (productoBase) subtotal += (productoBase.precio * itemCarrito.cantidad);
            });
            const montoDescuento = subtotal * porcentajeDescuento;
            spanSubtotal.textContent = formatearMoneda(subtotal);
            spanDescuento.textContent = '-' + formatearMoneda(montoDescuento);
            spanTotal.textContent = formatearMoneda(subtotal - montoDescuento);
        };

        document.getElementById('btn-aplicar-descuento')?.addEventListener('click', () => {
            const codigo = document.getElementById('codigo-carrito').value.trim().toUpperCase();
            const msj = document.getElementById('mensaje-descuento');
            if (codigo === 'FELICES50') {
                porcentajeDescuento = 0.10;
                msj.textContent = '¡Código aplicado!'; msj.style.color = 'green';
            } else {
                porcentajeDescuento = 0;
                msj.textContent = 'Código inválido.'; msj.style.color = '#d32f2f';
            }
            actualizarTotales();
        });

        renderizarCarrito();
    }

    // ==========================================
    // 5. LÓGICA DEL FORMULARIO DE REGISTRO
    // ==========================================
    const formRegistro = document.getElementById('formulario-registro');
    const selectRegion = document.getElementById('region');
    const selectComuna = document.getElementById('comuna');

    if (formRegistro) {
        datosRegiones.forEach(dato => {
            const option = document.createElement('option');
            option.value = dato.region;
            option.textContent = dato.region;
            selectRegion.appendChild(option);
        });

        selectRegion.addEventListener('change', (e) => {
            selectComuna.innerHTML = '<option value="">-- Seleccione una comuna --</option>';
            const regionSeleccionada = datosRegiones.find(r => r.region === e.target.value);
            if (regionSeleccionada) {
                selectComuna.disabled = false;
                regionSeleccionada.comunas.forEach(comuna => {
                    const option = document.createElement('option');
                    option.value = comuna;
                    option.textContent = comuna;
                    selectComuna.appendChild(option);
                });
            } else {
                selectComuna.disabled = true;
            }
        });

        formRegistro.addEventListener('submit', (evento) => {
            evento.preventDefault();
            let formularioValido = true;
            document.querySelectorAll('.mensaje-error').forEach(span => span.textContent = '');

            const inputRun = document.getElementById('run').value.trim();
            if (!/^[0-9kK]{7,9}$/.test(inputRun)) {
                document.getElementById('error-run').textContent = 'El RUN debe tener entre 7 y 9 caracteres, sin puntos ni guion.';
                formularioValido = false;
            }

            const inputNombre = document.getElementById('nombre').value.trim();
            if (inputNombre.length < 3 || /\d/.test(inputNombre) || inputNombre.length > 50) {
                document.getElementById('error-nombre').textContent = 'Nombre inválido. Mínimo 3 letras, máximo 50, sin números.';
                formularioValido = false;
            }

            const inputApellidos = document.getElementById('apellidos').value.trim();
            if (inputApellidos.length < 3 || /\d/.test(inputApellidos) || inputApellidos.length > 100) {
                document.getElementById('error-apellidos').textContent = 'Apellidos inválidos. Mínimo 3 letras, máximo 100, sin números.';
                formularioValido = false;
            }

            const inputCorreo = document.getElementById('correo').value.trim();
            if (!regexCorreoGlobal.test(inputCorreo) || inputCorreo.length > 100) {
                document.getElementById('error-correo').textContent = 'Correo inválido o excede 100 caracteres. Solo @duoc.cl, @profesor.duoc.cl o @gmail.com.';
                formularioValido = false;
            }

            const inputPass = document.getElementById('contrasena').value;
            const inputConfPass = document.getElementById('confirmar-contrasena').value;
            if (inputPass.length < 4 || inputPass.length > 10) {
                document.getElementById('error-contrasena').textContent = 'La contraseña debe tener entre 4 y 10 caracteres.';
                formularioValido = false;
            } else if (inputPass !== inputConfPass) {
                document.getElementById('error-confirmar').textContent = 'Las contraseñas no coinciden.';
                formularioValido = false;
            }

            const inputDireccion = document.getElementById('direccion').value.trim();
            if (inputDireccion.length === 0 || inputDireccion.length > 300) {
                document.getElementById('error-direccion').textContent = 'La dirección es obligatoria y no debe exceder 300 caracteres.';
                formularioValido = false;
            }

            if (selectRegion.value === "") {
                document.getElementById('error-region').textContent = 'Debe seleccionar una región.';
                formularioValido = false;
            }
            if (selectComuna.value === "") {
                document.getElementById('error-comuna').textContent = 'Debe seleccionar una comuna.';
                formularioValido = false;
            }

            if (formularioValido) {
                alert('¡Registro exitoso! Bienvenido a Pastelería 1000 Sabores.');
                formRegistro.reset();
                selectComuna.disabled = true;
            }
        });
    }

    // ==========================================
    // 6. LÓGICA DEL FORMULARIO DE INICIO DE SESIÓN
    // ==========================================
    const formLogin = document.getElementById('formulario-login');
    if (formLogin) {
        formLogin.addEventListener('submit', (evento) => {
            evento.preventDefault();
            let formularioValido = true;
            document.querySelectorAll('.mensaje-error').forEach(span => span.textContent = '');

            const inputCorreo = document.getElementById('correo-login').value.trim();
            const inputPass = document.getElementById('pass-login').value;

            if (!regexCorreoGlobal.test(inputCorreo) || inputCorreo.length > 100) {
                document.getElementById('error-correo-login').textContent = 'Correo inválido o excede 100 caracteres. Solo @duoc.cl, @profesor.duoc.cl o @gmail.com.';
                formularioValido = false;
            }

            if (inputPass.length < 4 || inputPass.length > 10) {
                document.getElementById('error-pass-login').textContent = 'La contraseña debe tener entre 4 y 10 caracteres.';
                formularioValido = false;
            }

            if (formularioValido) {
                alert('Inicio de sesión exitoso.');
                formLogin.reset();
                window.location.href = 'index.html'; 
            }
        });
    }

    // ==========================================
    // 7. LÓGICA DEL FORMULARIO DE CONTACTO
    // ==========================================
    const formContacto = document.getElementById('formulario-contacto');
    if (formContacto) {
        formContacto.addEventListener('submit', (evento) => {
            evento.preventDefault();
            let formularioValido = true;
            document.querySelectorAll('.mensaje-error').forEach(span => span.textContent = '');

            const inputNombre = document.getElementById('nombre-contacto').value.trim();
            const inputCorreo = document.getElementById('correo-contacto').value.trim();
            const inputMensaje = document.getElementById('mensaje-contacto').value.trim();

            if (inputNombre.length === 0 || inputNombre.length > 100) {
                document.getElementById('error-nombre-contacto').textContent = 'El nombre es obligatorio y no debe exceder 100 caracteres.';
                formularioValido = false;
            }

            if (!regexCorreoGlobal.test(inputCorreo) || inputCorreo.length > 100) {
                document.getElementById('error-correo-contacto').textContent = 'Correo inválido. Solo @duoc.cl, @profesor.duoc.cl o @gmail.com.';
                formularioValido = false;
            }

            if (inputMensaje.length === 0 || inputMensaje.length > 500) {
                document.getElementById('error-mensaje-contacto').textContent = 'El comentario es obligatorio y no debe exceder 500 caracteres.';
                formularioValido = false;
            }

            if (formularioValido) {
                alert('Mensaje enviado con éxito. Nos contactaremos a la brevedad.');
                formContacto.reset();
            }
        });
    }
});