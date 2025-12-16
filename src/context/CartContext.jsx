// src/context/CartContext.jsx
import { createContext, useState, useEffect } from 'react';

// 1. Creamos el Contexto
export const CartContext = createContext();

// 2. Creamos el Proveedor del Contexto (Provider)
export const CartProvider = ({ children }) => {
  // Estado para el carrito, inicializado desde localStorage o como un array vacío
  // Estructura ahora: [{ ...producto, cantidad: N }, ...]
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  // useEffect para guardar en localStorage cada vez que el carrito cambie
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  // Función para agregar un producto al carrito
  // Ahora acepta una cantidad opcional (default 1)
  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito(prevCarrito => {
      // Verificar si el producto ya existe por ID
      const existe = prevCarrito.find(item => item.id === producto.id);

      if (existe) {
        // Si existe, sumamos la cantidad
        return prevCarrito.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        // Si no existe, lo agregamos con la cantidad indicada
        return [...prevCarrito, { ...producto, cantidad: cantidad }];
      }
    });

    alert(`✅ ${cantidad}x ${producto.nombre} agregado(s) al carrito`);
  };

  // Función para eliminar un producto del carrito por su ID
  const eliminarDelCarrito = (id) => {
    setCarrito(prevCarrito => prevCarrito.filter(item => item.id !== id));
  };

  // NUEVA: Función para actualizar la cantidad directamente (desde el carrito)
  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return; // Evitar negativos o cero aquí
    setCarrito(prevCarrito =>
      prevCarrito.map(item =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  // Función para vaciar completamente el carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // 3. Proveemos el estado y las funciones a los componentes hijos
  return (
    <CartContext.Provider value={{
      carrito,
      agregarAlCarrito,
      eliminarDelCarrito,
      actualizarCantidad,
      vaciarCarrito
    }}>
      {children}
    </CartContext.Provider>
  );
};