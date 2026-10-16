import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Carrito from '../views/Carrito';
import { CartContext } from '../context/CartContext';

// Función auxiliar para renderizar el componente envuelto en su Contexto
const renderizarConContexto = (estadoCarrito, funcionEliminar) => {
  return render(
    <CartContext.Provider value={{ carrito: estadoCarrito, eliminarDelCarrito: funcionEliminar }}>
      <Carrito />
    </CartContext.Provider>
  );
};

describe('Pruebas en el componente <Carrito />', () => {

  it('5. Debe mostrar el mensaje de carrito vacío si no hay productos (Evaluación de Rama 1)', () => {
    // Simulamos un carrito vacío
    renderizarConContexto([], vi.fn());
    
    // Verifica que el componente detecte el .length === 0 y muestre la alerta
    expect(screen.getByText(/Tu carrito está vacío/i)).toBeInTheDocument();
  });

  it('6. Debe renderizar los productos y calcular el total matemático (Evaluación de Rama 2)', () => {
    // Simulamos un carrito con dos productos (Total: 17000)
    const mockCarrito = [
      { nombre: 'Torta de Chocolate', categoria: 'Pasteles', precio: 15000, imagen: 'img1.jpg' },
      { nombre: 'Cupcake de Vainilla', categoria: 'Dulces', precio: 2000, imagen: 'img2.jpg' }
    ];
    
    renderizarConContexto(mockCarrito, vi.fn());

    // Verifica que la iteración map() funcione y pinte los nombres
    expect(screen.getByText('Torta de Chocolate')).toBeInTheDocument();
    expect(screen.getByText('Cupcake de Vainilla')).toBeInTheDocument();
    
    // Verifica la función reduce() sumando 15000 + 2000
    // Usamos regex para atrapar variaciones del toLocaleString ('17.000' o '17,000')
    expect(screen.getByText(/\$17[.,]000/)).toBeInTheDocument();
  });

  it('7. Debe ejecutar la función de eliminación al hacer clic en el botón (Evaluación de Función)', () => {
    const mockEliminar = vi.fn(); // Espiamos la función
    const mockCarrito = [
      { nombre: 'Torta de Fresa', categoria: 'Pasteles', precio: 12000, imagen: 'img3.jpg' }
    ];
    
    renderizarConContexto(mockCarrito, mockEliminar);

    // Buscamos el botón "Eliminar" del único producto (índice 0)
    const btnEliminar = screen.getByRole('button', { name: /eliminar/i });
    
    // Disparamos el clic
    fireEvent.click(btnEliminar);

    // Verificamos que la función del Contexto fue llamada pasándole el índice 0
    expect(mockEliminar).toHaveBeenCalledWith(0);
    expect(mockEliminar).toHaveBeenCalledTimes(1);
  });

});