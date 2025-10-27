// Funciones del carrito como variables globales
var carritoItems = [];

function agregarAlCarrito(producto) {
  carritoItems.push(producto);
  return carritoItems;
}

function eliminarDelCarrito(index) {
  carritoItems.splice(index, 1);
  return carritoItems;
}

function vaciarCarrito() {
  carritoItems = [];
  return carritoItems;
}

function calcularTotal() {
  return carritoItems.reduce((total, item) => total + item.precio, 0);
}

function obtenerCarrito() {
  return carritoItems;
}