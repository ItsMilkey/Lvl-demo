// src/pages/CartPage.jsx
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function CartPage() {
  // Usamos useContext para acceder a los datos y funciones del carrito
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useContext(CartContext);

  // Calculamos el total
  const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);

  return (
    <section className="cart-container">
      <h2>Tu Carrito</h2>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío 🛒</p>
      ) : (
        <>
          <div className="cart-items">
            {carrito.map((producto, index) => (
              <div key={index} className="cart-item">
                <img src={producto.img} alt={producto.nombre} />
                <div className="item-info">
                  <h3>{producto.nombre}</h3>
                  <p className="price">${producto.precio.toLocaleString("es-CL")}</p>
                </div>
                <button onClick={() => eliminarDelCarrito(index)} className="btn-remove">Eliminar</button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: <span>${total.toLocaleString("es-CL")}</span></h3>
            <div className="cart-actions">
              <button onClick={vaciarCarrito} className="btn btn-logout">Vaciar Carrito</button>
              <button className="btn">Finalizar Compra</button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default CartPage;