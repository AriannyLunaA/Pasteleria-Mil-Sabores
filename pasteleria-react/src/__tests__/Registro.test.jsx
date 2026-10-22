import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Registro from '../views/Registro';

describe('Pruebas en el componente <Registro />', () => {
  it('1. Debe renderizar el formulario de registro correctamente', () => {
    render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );
    expect(screen.getByText('Crear Cuenta')).toBeInTheDocument();
  });

  it('2. Debe actualizar el estado cuando el usuario escribe en los inputs', () => {
    render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );
    const inputNombre = screen.getByLabelText(/nombre completo/i);
    fireEvent.change(inputNombre, { target: { value: 'Arianny' } });
    expect(inputNombre.value).toBe('Arianny');
  });

  it('3. Debe interceptar el envío y mostrar alerta si las contraseñas no coinciden', () => {
    window.alert = vi.fn();
    render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );
    
    fireEvent.change(screen.getByLabelText(/^contraseña$/i), { target: { value: 'pass123' } });
    fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), { target: { value: 'pass999' } });
    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

    expect(window.alert).toHaveBeenCalledWith('Error: Las contraseñas no coinciden.');
  });

  it('4. Debe interceptar el envío y mostrar alerta si falta la fecha de nacimiento', () => {
    window.alert = vi.fn();
    render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: 'Arianny' } });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'arianny@duoc.cl' } });
    
    const inputsPassword = screen.getAllByLabelText(/contraseña/i);
    fireEvent.change(inputsPassword[0], { target: { value: 'password123' } });
    fireEvent.change(inputsPassword[1], { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));
    expect(window.alert).toHaveBeenCalledWith('Error: Debes ingresar tu fecha de nacimiento.');
  });

  it('5. Debe procesar el registro exitosamente si todos los campos son válidos', () => {
    window.alert = vi.fn();
    render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: 'Arianny' } });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'arianny@duoc.cl' } });
    fireEvent.change(screen.getByLabelText(/fecha de nacimiento/i), { target: { value: '1996-08-06' } });
    
    const inputsPassword = screen.getAllByLabelText(/contraseña/i);
    fireEvent.change(inputsPassword[0], { target: { value: 'password123' } });
    fireEvent.change(inputsPassword[1], { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));
    expect(window.alert).toHaveBeenCalledWith('Registro exitoso. Tu sesión ha sido iniciada.');
  });
});