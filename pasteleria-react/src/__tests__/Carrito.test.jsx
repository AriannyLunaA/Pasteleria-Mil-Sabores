import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Carrito from '../views/Carrito';
import { CartContext } from '../context/CartContext';

const renderizarCarritoConContexto = (carritoMock, eliminarMock = vi.fn(), descuentoMock = null) => {
  return render(
    <BrowserRouter>
      <CartContext.Provider value={{ carrito: carritoMock, eliminarDelCarrito: eliminarMock, descuento: descuentoMock, aplicarDescuento: vi.fn() }}>
        <Carrito />
      </CartContext.Provider>
    </BrowserRouter>
  );
};

describe('Pruebas en el componente <Carrito />', () => {
  it('5. Debe mostrar el mensaje de carrito vacío si no hay productos (Evaluación de Rama 1)', () => {
    renderizarCarritoConContexto([]);
    expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument();
  });

it('6. Debe renderizar los productos y calcular el total matemático (Evaluación de Rama 2)', () => {
    const productosMock = [
      { id: 1, nombre: 'Torta de Chocolate', precio: 15000, categoria: 'Pasteles', imagen: 'img.jpg' }
    ];
    renderizarCarritoConContexto(productosMock);
    expect(screen.getByText('Torta de Chocolate')).toBeInTheDocument();
    
    // Usamos getAllByText para manejar los múltiples elementos que comparten el valor de 15.000
    const elementosPrecio = screen.getAllByText(/\$15[.,]000/);
    expect(elementosPrecio.length).toBeGreaterThan(0);
  });

  it('7. Debe ejecutar la función de eliminación al hacer clic en el botón (Evaluación de Función)', () => {
    const productosMock = [
      { id: 1, nombre: 'Torta de Chocolate', precio: 15000, categoria: 'Pasteles', imagen: 'img.jpg' }
    ];
    const eliminarMock = vi.fn();
    renderizarCarritoConContexto(productosMock, eliminarMock);

    const btnEliminar = screen.getByRole('button', { name: /eliminar/i });
    fireEvent.click(btnEliminar);

    expect(eliminarMock).toHaveBeenCalledTimes(1);
    expect(eliminarMock).toHaveBeenCalledWith(0);
  });
});