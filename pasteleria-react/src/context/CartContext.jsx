import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => [...carritoActual, producto]);
  };

  return (
    <CartContext.Provider value={{ carrito, agregarAlCarrito }}>
      {children}
    </CartContext.Provider>
  );
};