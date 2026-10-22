import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Catalogo from '../views/Catalogo';
import { CartContext } from '../context/CartContext';

// Interceptamos el archivo de datos estáticos para controlar el entorno de pruebas
vi.mock('../data/inventario', () => ({
  inventarioInicial: [
    { id: 1, nombre: 'Torta de Mock', categoria: 'Pasteles', descripcion: 'Torta de prueba', precio: 10000, imagen: 'img.jpg' }
  ]
}));

// Función auxiliar para renderizar con el Contexto simulado
const renderizarConContexto = (mockAgregar) => {
  return render(
    <CartContext.Provider value={{ agregarAlCarrito: mockAgregar }}>
      <Catalogo />
    </CartContext.Provider>
  );
};

describe('Pruebas en el componente <Catalogo />', () => {

  // Limpiamos el entorno antes de cada test para evitar contaminación de estado
  beforeEach(() => {
    window.localStorage.clear();
    vi.clearAllMocks();
  });

  it('11. Debe renderizar el inventario inicial si localStorage está vacío', () => {
    renderizarConContexto(vi.fn());
    
    // Evalúa la extracción directa del mock
    expect(screen.getByText('Nuestro Catálogo')).toBeInTheDocument();
    expect(screen.getByText('Torta de Mock')).toBeInTheDocument();
    
    // Verifica el formateo del precio
    expect(screen.getByText(/\$10[.,]000/)).toBeInTheDocument();
  });

  it('12. Debe priorizar la lectura de productos desde localStorage si existen', () => {
    const productosLocales = [
      { id: 2, nombre: 'Cupcake Persistente', categoria: 'Dulces', descripcion: 'Prueba local', precio: 2500, imagen: 'img2.jpg' }
    ];
    // Inyectamos datos en localStorage antes de renderizar
    window.localStorage.setItem('inventario_admin', JSON.stringify(productosLocales));
    
    renderizarConContexto(vi.fn());
    
    // Verifica que ignoró el inventarioInicial y leyó el almacenamiento local
    expect(screen.getByText('Cupcake Persistente')).toBeInTheDocument();
  });

  it('13. Debe mostrar la alerta si no hay productos (Evaluación de Rama Vacía)', () => {
    // Forzamos un arreglo vacío en localStorage
    window.localStorage.setItem('inventario_admin', JSON.stringify([]));
    
    renderizarConContexto(vi.fn());
    
    // Evalúa la rama if (productos.length === 0)
    expect(screen.getByText(/No hay productos disponibles en este momento/i)).toBeInTheDocument();
  });

  it('14. Debe ejecutar la función agregarAlCarrito al hacer clic en el botón', () => {
    const mockAgregar = vi.fn();
    renderizarConContexto(mockAgregar);
    
    const btnAgregar = screen.getByRole('button', { name: /agregar al carrito/i });
    
    // Simulamos el evento
    fireEvent.click(btnAgregar);
    
    // Verificamos que se ejecutó la función del Contexto pasando el objeto correcto
    expect(mockAgregar).toHaveBeenCalledTimes(1);
    expect(mockAgregar).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, nombre: 'Torta de Mock' })
    );
  });

});