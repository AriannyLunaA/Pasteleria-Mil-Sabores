import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  const [descuento, setDescuento] = useState(() => {
    const descuentoGuardado = localStorage.getItem("descuento");
    return descuentoGuardado ? JSON.parse(descuentoGuardado) : null;
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    localStorage.setItem("descuento", JSON.stringify(descuento));
  }, [descuento]);

  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => [...carritoActual, producto]);
  };

  const eliminarDelCarrito = (indiceAEliminar) => {
    setCarrito((carritoActual) => 
      carritoActual.filter((_, index) => index !== indiceAEliminar)
    );
  };

  const aplicarDescuento = (promo) => {
    setDescuento(promo);
  };

  return (
    <CartContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, descuento, aplicarDescuento }}>
      {children}
    </CartContext.Provider>
  );
};
