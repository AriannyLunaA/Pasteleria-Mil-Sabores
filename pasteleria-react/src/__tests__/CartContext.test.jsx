import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { CartProvider, CartContext } from '../context/CartContext';
import { useContext } from 'react';

// Componente simulado para consumir y probar las funciones del Contexto
const ComponentePrueba = () => {
  const { carrito, agregarAlCarrito, eliminarDelCarrito } = useContext(CartContext);
  return (
    <div>
      <span data-testid="cantidad-productos">{carrito.length}</span>
      <button onClick={() => agregarAlCarrito({ id: 1, nombre: 'Torta de Manjar', precio: 15000 })}>
        Agregar Producto
      </button>
      <button onClick={() => eliminarDelCarrito(0)}>
        Eliminar Producto
      </button>
    </div>
  );
};

describe('Pruebas en el CartContext y localStorage', () => {
  
  // Limpiamos el localStorage antes de cada prueba para evitar que se contaminen entre sí
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('8. Debe inicializar el carrito vacío si no hay datos previos en localStorage', () => {
    render(
      <CartProvider>
        <ComponentePrueba />
      </CartProvider>
    );
    
    // Verifica que el estado inicial sea un arreglo vacío (length = 0)
    expect(screen.getByTestId('cantidad-productos').textContent).toBe('0');
  });

  it('9. Debe agregar un producto al estado y guardarlo automáticamente en localStorage', () => {
    render(
      <CartProvider>
        <ComponentePrueba />
      </CartProvider>
    );
    
    const btnAgregar = screen.getByRole('button', { name: /agregar producto/i });
    
    // Disparamos la función agregarAlCarrito
    fireEvent.click(btnAgregar);
    
    // El estado de React debe actualizarse a 1
    expect(screen.getByTestId('cantidad-productos').textContent).toBe('1');
    
    // El useEffect debe haber guardado el producto en localStorage
    const carritoGuardado = JSON.parse(window.localStorage.getItem('carrito'));
    expect(carritoGuardado).toHaveLength(1);
    expect(carritoGuardado[0].nombre).toBe('Torta de Manjar');
  });

  it('10. Debe recuperar el carrito desde localStorage al montarse y permitir eliminar productos', () => {
    // Inyectamos un producto falso en localStorage ANTES de renderizar el Contexto
    const productoFalso = [{ id: 2, nombre: 'Cupcake', precio: 2000 }];
    window.localStorage.setItem('carrito', JSON.stringify(productoFalso));
    
    render(
      <CartProvider>
        <ComponentePrueba />
      </CartProvider>
    );
    
    // Verifica que el proveedor leyó el localStorage correctamente al inicializar
    expect(screen.getByTestId('cantidad-productos').textContent).toBe('1');
    
    // Probamos la función eliminarDelCarrito
    const btnEliminar = screen.getByRole('button', { name: /eliminar producto/i });
    fireEvent.click(btnEliminar);
    
    // El estado debe volver a 0
    expect(screen.getByTestId('cantidad-productos').textContent).toBe('0');
  });

});