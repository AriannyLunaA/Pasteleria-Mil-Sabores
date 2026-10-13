import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Inicialización perezosa: revisa el localStorage antes de montar el estado vacío
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  // Efecto secundario: actualiza el localStorage cada vez que el arreglo 'carrito' muta
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => [...carritoActual, producto]);
  };

  const eliminarDelCarrito = (indiceAEliminar) => {
    setCarrito((carritoActual) => 
      carritoActual.filter((_, index) => index !== indiceAEliminar)
    );
  };

  return (
    <CartContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito }}>
      {children}
    </CartContext.Provider>
  );
};