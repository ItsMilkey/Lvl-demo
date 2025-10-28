// src/pages/ProductsPage.jsx
import { useContext, useState, useMemo } from 'react'; // 1. Importar hooks
import { CartContext } from '../context/CartContext'; // 2. Importar el contexto
import productos from '../data/products.js';
import './products.css';

function ProductsPage() {
  const { agregarAlCarrito } = useContext(CartContext); // 3. Obtener la función

  // Estado para búsqueda y categoría
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  // Lista de categorías única (incluye 'all')
  const categories = useMemo(() => {
    const cats = Array.from(new Set(productos.map(p => p.categoria)));
    return ['all', ...cats];
  }, []);

  // Productos filtrados por categoría y término de búsqueda
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return productos.filter(p => {
      const matchesCategory = category === 'all' ? true : p.categoria === category;
      const matchesSearch = term === '' ? true : (
        p.nombre.toLowerCase().includes(term) ||
        (p.descripcion && p.descripcion.toLowerCase().includes(term))
      );
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <>
      <header className="topbar">
        <h1>Catálogo de Productos</h1>
        <input
          id="searchBar"
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </header>

      <section>

        {/* Botones de categoría */}
        <div className="category-grid">
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-btn ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
              data-category={cat}
            >
              {cat === 'all' ? 'Todos' : cat}
            </button>
          ))}
        </div>

  {/* Grid de productos filtrados */}
  <div id="productGrid" className="product-grid" style={{ marginTop: 20 }}>
          {filtered.map(p => (
            <div key={p.codigo} className="product-card">
              <img src={p.img} alt={p.nombre} />
              <h3>{p.nombre}</h3>
              <p className="price">${p.precio.toLocaleString('es-CL')}</p>
              <button onClick={() => agregarAlCarrito(p)} className="btn-add">
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