// src/context/CartContext.jsx
import { createContext, useState, useEffect } from 'react';

// 1. Creamos el Contexto
export const CartContext = createContext();

// 2. Creamos el Proveedor del Contexto (Provider)
export const CartProvider = ({ children }) => {
  // Estado para el carrito, inicializado desde localStorage o como un array vacío
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  // useEffect para guardar en localStorage cada vez que el carrito cambie
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  // Función para agregar un producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito(prevCarrito => [...prevCarrito, producto]);
    alert(`✅ ${producto.nombre} agregado al carrito`);
  };

  // Función para eliminar un producto del carrito por su índice
  const eliminarDelCarrito = (index) => {
    setCarrito(prevCarrito => prevCarrito.filter((_, i) => i !== index));
  };

  // Función para vaciar completamente el carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // 3. Proveemos el estado y las funciones a los componentes hijos
  return (
    <CartContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito }}>
      {children}
    </CartContext.Provider>
  );
};