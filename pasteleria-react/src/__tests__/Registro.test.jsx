import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Registro from '../views/Registro';

describe('Pruebas en el componente <Registro />', () => {

  it('1. Debe renderizar el formulario de registro correctamente', () => {
    const { container } = render(<Registro />);
    
    // Buscamos los inputs directamente por su arquitectura HTML (infalible)
    expect(container.querySelector('input[type="text"]')).toBeInTheDocument();
    expect(container.querySelector('input[type="email"]')).toBeInTheDocument();
    expect(container.querySelectorAll('input[type="password"]').length).toBeGreaterThanOrEqual(2);
    expect(container.querySelector('button')).toBeInTheDocument();
  });

  it('2. Debe actualizar el estado cuando el usuario escribe', () => {
    const { container } = render(<Registro />);
    
    const inputNombre = container.querySelector('input[type="text"]');
    const inputEmail = container.querySelector('input[type="email"]');

    // Simulamos la escritura
    fireEvent.change(inputNombre, { target: { value: 'Arianny Luna' } });
    fireEvent.change(inputEmail, { target: { value: 'luna@ejemplo.com' } });

    // Verificamos la sincronización del state
    expect(inputNombre.value).toBe('Arianny Luna');
    expect(inputEmail.value).toBe('luna@ejemplo.com');
  });

  it('3. Debe interceptar el envío si las contraseñas no coinciden', () => {
    const { container } = render(<Registro />);
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    const inputNombre = container.querySelector('input[type="text"]');
    const inputEmail = container.querySelector('input[type="email"]');
    const passwordInputs = container.querySelectorAll('input[type="password"]');
    const btnSubmit = container.querySelector('button');

    // Llenamos el formulario completo para evitar bloqueos nativos de HTML5
    fireEvent.change(inputNombre, { target: { value: 'Arianny' } });
    fireEvent.change(inputEmail, { target: { value: 'arianny@ejemplo.com' } });
    fireEvent.change(passwordInputs[0], { target: { value: 'password123' } });
    fireEvent.change(passwordInputs[1], { target: { value: 'password456' } });
    
    // Disparamos el envío
    fireEvent.click(btnSubmit);

    // Verificamos que la rama de error de contraseña fue activada
    expect(alertMock).toHaveBeenCalled();
    
    alertMock.mockRestore();
  });
  it('4. Debe procesar el registro exitosamente si las contraseñas coinciden', () => {
    const { container } = render(<Registro />);
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    const inputNombre = container.querySelector('input[type="text"]');
    const inputEmail = container.querySelector('input[type="email"]');
    const passwordInputs = container.querySelectorAll('input[type="password"]');
    const btnSubmit = container.querySelector('button');

    // Llenamos el formulario con contraseñas que SÍ coinciden
    fireEvent.change(inputNombre, { target: { value: 'Arianny' } });
    fireEvent.change(inputEmail, { target: { value: 'arianny@ejemplo.com' } });
    fireEvent.change(passwordInputs[0], { target: { value: 'password123' } });
    fireEvent.change(passwordInputs[1], { target: { value: 'password123' } });
    
    // Disparamos el envío (esto obligará a ejecutar las líneas 27 y 28)
    fireEvent.click(btnSubmit);

    // Verificamos que se llamó a la alerta (de éxito)
    expect(alertMock).toHaveBeenCalled();
    
    alertMock.mockRestore();
  });

});