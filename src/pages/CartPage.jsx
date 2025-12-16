// src/pages/CartPage.jsx
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import QuantitySelector from '../components/QuantitySelector';

// URL base de tu API (usamos la misma variable de entorno que en el Login)
const API_URL = import.meta.env.VITE_API_URL + '/api/ventas';

function CartPage() {
  const navigate = useNavigate();
  // Ahora el carrito tiene items con cantidad, y usamos actualizarCantidad y eliminar por ID
  const { carrito, eliminarDelCarrito, vaciarCarrito, actualizarCantidad } = useContext(CartContext);
  const [procesando, setProcesando] = useState(false);

  // Calculamos el total visual: precio * cantidad
  const total = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // --- LÓGICA DE COMPRA REAL CONECTADA AL BACKEND ---
  const handleCheckout = async () => {
    // 1. Validar carrito vacío
    if (carrito.length === 0) {
      alert("⚠️ El carrito está vacío.");
      return;
    }

    // 2. Validar sesión (Token)
    const token = localStorage.getItem('token');
    if (!token) {
      alert("🔒 Debes iniciar sesión para realizar una compra.");
      navigate('/login'); // Redirigimos al login
      return;
    }

    // 3. Preparar los datos para el Backend
    // El backend espera: { items: [{ productoId: 1, cantidad: 2 }, ...] }
    // Como ya tenemos cantidad en el state, es muy directo:

    const itemsParaEnviar = carrito.map(item => ({
      productoId: parseInt(item.id),
      cantidad: item.cantidad
    }));

    const compraData = { items: itemsParaEnviar };

    try {
      setProcesando(true);

      // 4. Petición POST al Backend con el Token
      await axios.post(`${API_URL}/comprar`, compraData, {
        headers: {
          'Authorization': `Bearer ${token}` // ¡Importante!
        }
      });

      // 5. Éxito
      alert(`✅ ¡Compra exitosa!\n\nSe ha guardado en tu historial.\nTotal pagado: ${formatPrice(total)}`);
      vaciarCarrito();
      navigate('/historial');

    } catch (error) {
      console.error("Error en la compra:", error);
      if (error.response && error.response.status === 403) {
        alert("⛔ Tu sesión ha expirado. Por favor inicia sesión nuevamente.");
        navigate('/login');
      } else {
        alert("❌ Hubo un error al procesar la compra. Inténtalo de nuevo.");
      }
    } finally {
      setProcesando(false);
    }
  };

  return (
    <div className="main-content">
      <div className="content-centered">
        <section className="responsive-section cart-container">
          <h1 style={{ textAlign: 'center', marginBottom: '2rem', textTransform: 'uppercase' }}>
            Tu Carrito de Compras
          </h1>

          {carrito.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
              <p style={{ fontSize: '1.2rem' }}>Tu carrito está vacío 🛒</p>
              <p>¡Ve a la tienda y agrega algunos productos!</p>
              <button
                onClick={() => navigate('/productos')}
                className="btn"
                style={{ marginTop: '1rem' }}
              >
                Ir a Productos
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {carrito.map((producto) => (
                  <div key={producto.id} className="cart-item">
                    <img
                      src={producto.img}
                      alt={producto.nombre}
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/80?text=IMG' }}
                    />

                    <div className="item-info">
                      <h3>{producto.nombre}</h3>
                      <p className="price">{formatPrice(producto.precio)}</p>
                      {/* Mostrar subtotal por item si se desea, o solo precio unitario */}
                    </div>

                    {/* Selector de Cantidad en el Carrito */}
                    <QuantitySelector
                      quantity={producto.cantidad}
                      onIncrease={() => actualizarCantidad(producto.id, producto.cantidad + 1)}
                      onDecrease={() => actualizarCantidad(producto.id, producto.cantidad - 1)}
                      min={1}
                    />

                    <button
                      onClick={() => eliminarDelCarrito(producto.id)}
                      className="btn-remove"
                      title="Eliminar producto"
                      style={{ marginLeft: '1rem' }}
                    >
                      🗑
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-summary" style={{ marginTop: '2rem', borderTop: '2px solid #000', paddingTop: '1rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                  Total: <span style={{ color: '#25d366' }}>{formatPrice(total)}</span>
                </h3>

                <div className="cart-actions">
                  <button
                    onClick={vaciarCarrito}
                    className="btn btn-logout"
                    style={{ marginTop: 0 }}
                    disabled={procesando}
                  >
                    Vaciar Carrito
                  </button>

                  <button
                    onClick={handleCheckout}
                    className="btn"
                    style={{ marginTop: 0, opacity: procesando ? 0.7 : 1 }}
                    disabled={procesando}
                  >
                    {procesando ? 'Procesando...' : 'Finalizar Compra'}
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default CartPage;