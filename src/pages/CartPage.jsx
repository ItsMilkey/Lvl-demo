// src/pages/CartPage.jsx
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function CartPage() {
  // Usamos useContext para acceder a los datos y funciones del carrito
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useContext(CartContext);

  // Calculamos el total
  const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);

  // Función auxiliar para formatear dinero
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Lógica de Finalizar Compra (Simulada)
  const handleCheckout = () => {
    if (carrito.length === 0) {
      alert("⚠️ Error: Agrega al menos un producto al carrito para comprar.");
      return;
    }

    // Si hay productos, simulamos éxito
    alert(`✅ ¡Compra completada con éxito!\n\nTotal pagado: ${formatPrice(total)}\n\nGracias por tu compra en LvL-UP Gamer.`);
    
    // Vaciamos el carrito automáticamente
    vaciarCarrito();
  };

  return (
    // 1. Wrapper principal para responsividad y Sidebar
    <div className="main-content">
      
      {/* Centramos el contenido */}
      <div className="content-centered">
        
        {/* 2. Contenedor blanco responsivo */}
        <section className="responsive-section cart-container">
          <h1 style={{textAlign: 'center', marginBottom: '2rem', textTransform: 'uppercase'}}>
            Tu Carrito de Compras
          </h1>

          {carrito.length === 0 ? (
            <div style={{textAlign: 'center', padding: '3rem', color: '#666'}}>
              <p style={{fontSize: '1.2rem'}}>Tu carrito está vacío 🛒</p>
              <p>¡Ve a la tienda y agrega algunos productos!</p>
            </div>
          ) : (
            <>
              {/* Lista de Items */}
              <div className="cart-items">
                {carrito.map((producto, index) => (
                  <div key={index} className="cart-item">
                    {/* Imagen con fallback por si falla */}
                    <img 
                        src={producto.img} 
                        alt={producto.nombre} 
                        onError={(e) => {e.target.src='https://via.placeholder.com/80?text=IMG'}}
                    />
                    
                    <div className="item-info">
                      <h3>{producto.nombre}</h3>
                      <p className="price">{formatPrice(producto.precio)}</p>
                    </div>
                    
                    <button 
                        onClick={() => eliminarDelCarrito(index)} 
                        className="btn-remove"
                        title="Eliminar producto"
                    >
                        🗑 Eliminar
                    </button>
                  </div>
                ))}
              </div>

              {/* Resumen y Botones de Acción */}
              <div className="cart-summary" style={{marginTop: '2rem', borderTop: '2px solid #000', paddingTop: '1rem'}}>
                <h3 style={{fontSize: '1.5rem', marginBottom: '1.5rem'}}>
                    Total: <span style={{color: '#25d366'}}>{formatPrice(total)}</span>
                </h3>
                
                <div className="cart-actions">
                  <button 
                    onClick={vaciarCarrito} 
                    className="btn btn-logout" // Usa el estilo rojo definido en index.css
                    style={{marginTop: 0}} // Ajuste fino
                  >
                    Vaciar Carrito
                  </button>
                  
                  <button 
                    onClick={handleCheckout} 
                    className="btn"
                    style={{marginTop: 0}}
                  >
                    Finalizar Compra
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