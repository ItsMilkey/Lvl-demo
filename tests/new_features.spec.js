describe('Nuevas Funcionalidades: Carrito con Cantidad', () => {
    let carrito = [];

    // Replicamos la lógica del Contexto para probarla aisladamente (Simulación de Lógica)

    function agregarAlCarrito(producto, cantidad = 1) {
        const existe = carrito.find(item => item.id === producto.id);
        if (existe) {
            carrito = carrito.map(item =>
                item.id === producto.id
                    ? { ...item, cantidad: item.cantidad + cantidad }
                    : item
            );
        } else {
            carrito = [...carrito, { ...producto, cantidad: cantidad }];
        }
    }

    function eliminarDelCarrito(id) {
        carrito = carrito.filter(item => item.id !== id);
    }

    function actualizarCantidad(id, nuevaCantidad) {
        if (nuevaCantidad < 1) return;
        carrito = carrito.map(item =>
            item.id === id ? { ...item, cantidad: nuevaCantidad } : item
        );
    }

    function calcularTotal() {
        return carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    }

    beforeEach(() => {
        carrito = [];
    });

    it('debe agregar un producto con cantidad inicial', () => {
        const prod = { id: 1, nombre: 'Test', precio: 100 };
        agregarAlCarrito(prod, 2);
        expect(carrito.length).toBe(1);
        expect(carrito[0].cantidad).toBe(2);
    });

    it('debe sumar cantidad si el producto ya existe', () => {
        const prod = { id: 1, nombre: 'Test', precio: 100 };
        agregarAlCarrito(prod, 1);
        agregarAlCarrito(prod, 2);
        expect(carrito.length).toBe(1);
        expect(carrito[0].cantidad).toBe(3);
    });

    it('debe actualizar la cantidad correctamente', () => {
        const prod = { id: 1, nombre: 'Test', precio: 100 };
        agregarAlCarrito(prod, 1);
        actualizarCantidad(1, 5);
        expect(carrito[0].cantidad).toBe(5);
    });

    it('NO debe permitir cantidades menores a 1', () => {
        const prod = { id: 1, nombre: 'Test', precio: 100 };
        agregarAlCarrito(prod, 1);
        actualizarCantidad(1, 0);
        expect(carrito[0].cantidad).toBe(1); // Se mantiene en 1
    });

    it('debe calcular el total considerando cantidades', () => {
        const p1 = { id: 1, nombre: 'A', precio: 100 };
        const p2 = { id: 2, nombre: 'B', precio: 200 };

        agregarAlCarrito(p1, 2); // 200
        agregarAlCarrito(p2, 1); // 200
        expect(calcularTotal()).toBe(400);
    });

    it('debe eliminar producto por ID', () => {
        const p1 = { id: 1, nombre: 'A', precio: 100 };
        agregarAlCarrito(p1, 1);
        eliminarDelCarrito(1);
        expect(carrito.length).toBe(0);
    });
});
