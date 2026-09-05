document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. COMPORTAMIENTO DEL CATÁLOGO DE PRODUCTOS
    // ==========================================
    const filtroTipo = document.getElementById('filtro-tipo');
    const productos = document.querySelectorAll('.producto-card');

    if (filtroTipo) {
        filtroTipo.addEventListener('change', (evento) => {
            const categoriaSeleccionada = evento.target.value;

            productos.forEach(producto => {
                const categoriaProducto = producto.dataset.categoria;
                
                if (categoriaSeleccionada === 'todos' || categoriaSeleccionada === categoriaProducto) {
                    producto.style.display = 'flex'; 
                } else {
                    producto.style.display = 'none'; 
                }
            });
        });
    }

    // ==========================================
    // 2. LÓGICA DEL FORMULARIO DE REGISTRO
    // ==========================================
    const formRegistro = document.getElementById('formulario-registro');

    if (formRegistro) {
        formRegistro.addEventListener('submit', (evento) => {
            evento.preventDefault(); // Evita la recarga nativa

            const inputNombre = document.getElementById('nombre');
            const errorNombre = document.getElementById('error-nombre');
            const inputCorreo = document.getElementById('correo');
            const errorCorreo = document.getElementById('error-correo');
            const inputFecha = document.getElementById('fecha-nacimiento');
            const errorEdad = document.getElementById('error-edad');

            // Limpieza de errores previos
            errorNombre.textContent = '';
            errorCorreo.textContent = '';
            errorEdad.textContent = '';

            let formularioValido = true;

            // Validación de Nombre
           // Validación de Nombre (mínimo 3 caracteres y sin números)
            const valorNombre = inputNombre.value.trim();
            const contieneNumeros = /\d/.test(valorNombre); // Busca cualquier número del 0 al 9

            if (valorNombre.length < 3) {
                errorNombre.textContent = 'Por favor, ingresa tu nombre completo (mínimo 3 caracteres).';
                formularioValido = false;
            } else if (contieneNumeros) {
                errorNombre.textContent = 'El nombre no puede contener números.';
                formularioValido = false;
            }

            // Validación de Correo Institucional
            const regexCorreoDuoc = /^[a-zA-Z0-9._%+-]+@duocuc\.cl$/;
            if (!regexCorreoDuoc.test(inputCorreo.value.trim())) {
                errorCorreo.textContent = 'Debes utilizar un correo institucional válido (Ej: usuario@duocuc.cl).';
                formularioValido = false;
            }

            // Validación de Fecha y Edad
            if (!inputFecha.value) {
                errorEdad.textContent = 'La fecha de nacimiento es obligatoria.';
                formularioValido = false;
            } else {
                const fechaNacimiento = new Date(inputFecha.value);
                const fechaActual = new Date();
                
                if (fechaNacimiento > fechaActual) {
                    errorEdad.textContent = 'La fecha de nacimiento no puede estar en el futuro.';
                    formularioValido = false;
                } else {
                    let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
                    const mes = fechaActual.getMonth() - fechaNacimiento.getMonth();
                    if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNacimiento.getDate())) {
                        edad--;
                    }

                    if (edad < 18) {
                        errorEdad.textContent = 'Debes ser mayor de edad para registrarte.';
                        formularioValido = false;
                    }
                }
            }

            // Ejecución de éxito
            if (formularioValido) {
                alert('¡Registro exitoso! Bienvenido a Pastelería 1000 Sabores.');
                formRegistro.reset();
            }
        });
    }

});