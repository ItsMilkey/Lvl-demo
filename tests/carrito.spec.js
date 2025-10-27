describe('Funciones del Carrito', () => {
  beforeEach(() => {
    // Limpiar el carrito antes de cada prueba
    vaciarCarrito();
  });

  it('debe agregar un producto al carrito', () => {
    const producto = { codigo: 'JM001', nombre: 'Catan', precio: 29990 };
    
    agregarAlCarrito(producto);
    
    const carrito = obtenerCarrito();
    expect(carrito.length).toBe(1);
    expect(carrito[0].nombre).toBe('Catan');
  });

  it('debe eliminar un producto del carrito', () => {
    const producto1 = { codigo: 'JM001', nombre: 'Catan', precio: 29990 };
    const producto2 = { codigo: 'JM002', nombre: 'Carcassonne', precio: 24990 };
    
    agregarAlCarrito(producto1);
    agregarAlCarrito(producto2);
    eliminarDelCarrito(0);
    
    const carrito = obtenerCarrito();
    expect(carrito.length).toBe(1);
    expect(carrito[0].nombre).toBe('Carcassonne');
  });

  it('debe vaciar el carrito', () => {
    const producto = { codigo: 'JM001', nombre: 'Catan', precio: 29990 };
    
    agregarAlCarrito(producto);
    vaciarCarrito();
    
    const carrito = obtenerCarrito();
    expect(carrito.length).toBe(0);
  });

  it('debe calcular el total correctamente', () => {
    const producto1 = { codigo: 'JM001', nombre: 'Catan', precio: 29990 };
    const producto2 = { codigo: 'JM002', nombre: 'Carcassonne', precio: 24990 };
    
    agregarAlCarrito(producto1);
    agregarAlCarrito(producto2);
    
    const total = calcularTotal();
    expect(total).toBe(54980);
  });
});