// src/pages/ProductsPage.jsx
import { useContext } from 'react'; // 1. Importar useContext
import { CartContext } from '../context/CartContext'; // 2. Importar el contexto
import productos from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';

function ProductsPage() {
  const { agregarAlCarrito } = useContext(CartContext); // 3. Obtener la función

  return (
    <>
      <header className="topbar">
        <input type="text" placeholder="Buscar productos..." />
      </header>
      
      <section>
        <h2>Catálogo de Productos</h2>
        <div className="category-grid">
          {productos.map(p => (
            // 4. Modificamos el ProductCard para que el botón agregue al carrito
            <div key={p.codigo} className="card">
              <img src={p.img} alt={p.nombre} />
              <h3>{p.nombre}</h3>
              <p className="price">${p.precio.toLocaleString("es-CL")}</p>
              <button onClick={() => agregarAlCarrito(p)} className="btn">
                Agregar al Carrito
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default ProductsPage;