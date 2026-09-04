/* inico de comportamiento  de catálogo de productos */

document.addEventListener('DOMContentLoaded', () => {
    const filtroTipo = document.getElementById('filtro-tipo');
    const productos = document.querySelectorAll('.producto-card');

    // Verificamos que estamos en la página del catálogo antes de ejecutar
    if (filtroTipo) {
        filtroTipo.addEventListener('change', (evento) => {
            const categoriaSeleccionada = evento.target.value;

            productos.forEach(producto => {
                // Leemos el atributo data-categoria del HTML (ej: "cuadrada", "circular")
                const categoriaProducto = producto.dataset.categoria;
                
                if (categoriaSeleccionada === 'todos' || categoriaSeleccionada === categoriaProducto) {
                    producto.style.display = 'flex'; // Mantiene la estructura de la tarjeta
                } else {
                    producto.style.display = 'none'; // Oculta los que no coinciden
                }
            });
        });
    }
});