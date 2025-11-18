// src/pages/ProductsPage.jsx
import { useContext, useState, useEffect, useMemo } from 'react'; 
import { CartContext } from '../context/CartContext'; 
import axios from 'axios'; 
import './products.css';

const API_URL = import.meta.env.VITE_API_URL + '/api/products';

// Lista de categorías disponibles (Puedes ajustarlas o traerlas del backend si tuvieras un endpoint)
const CATEGORIES = ["Todos", "Juegos de Mesa", "Accesorios", "Consolas", "Computadores Gamers", "Mouse", "Mousepad"];

function ProductsPage() {
  const { agregarAlCarrito } = useContext(CartContext); 
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- ESTADOS DE FILTRO ---
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [maxPrice, setMaxPrice] = useState(2000000); // Rango de precio inicial alto

  // Cargar productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        setProducts(response.data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // --- LÓGICA DE FILTRADO UNIFICADA ---
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    
    return products.filter(p => {
      // 1. Filtro por Búsqueda (Nombre)
      const matchesSearch = p.name.toLowerCase().includes(term);
      
      // 2. Filtro por Categoría
      // Si es "Todos", pasa siempre. Si no, debe coincidir exactamente.
      const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;

      // 3. Filtro por Precio
      const matchesPrice = p.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [search, selectedCategory, maxPrice, products]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", minimumFractionDigits: 0 }).format(price);
  };

  const handleAddToCart = (productoBackend) => {
    const productoAdaptado = {
        codigo: productoBackend.id,
        nombre: productoBackend.name,
        precio: productoBackend.price, 
        img: productoBackend.image
    };
    agregarAlCarrito(productoAdaptado);
  };

  if (loading) return <div style={{textAlign: 'center', padding: '4rem', fontSize: '1.5rem'}}>Cargando catálogo...</div>;

  return (
    <div className="main-content">
      <header className="topbar" style={{flexDirection: 'column', alignItems: 'center', gap: '1rem'}}>
        <h1>Catálogo de Productos</h1>
        
        {/* Barra de Búsqueda */}
        <input
          id="searchBar"
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{maxWidth: '500px', width: '100%'}} 
        />
      </header>

      {/* --- SECCIÓN DE FILTROS --- */}
      <section style={{ marginBottom: '2rem', padding: '1rem', background: '#fff', borderRadius: '8px', border: '2px solid #000' }}>
        
        {/* 1. Botones de Categoría */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '1.5rem' }}>
            {CATEGORIES.map(cat => (
                <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                        padding: '8px 15px',
                        borderRadius: '20px',
                        border: '2px solid #000',
                        background: selectedCategory === cat ? '#000' : '#fff',
                        color: selectedCategory === cat ? '#fff' : '#000',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'all 0.2s'
                    }}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* 2. Filtro de Rango de Precio */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <label style={{fontWeight: 'bold'}}>
                Precio Máximo: <span style={{color: '#25d366'}}>{formatPrice(maxPrice)}</span>
            </label>
            <input 
                type="range" 
                min="0" 
                max="2000000" 
                step="10000" 
                value={maxPrice} 
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', maxWidth: '400px', accentColor: '#000' }}
            />
        </div>

      </section>

      <section>
        {/* Grid de productos filtrados */}
        <div id="productGrid" className="product-grid">
          {filtered.length > 0 ? (
            filtered.map(p => (
                <div key={p.id} className="product-card">
                <div className="image-container">
                    <img 
                        src={p.image} 
                        alt={p.name} 
                        onError={(e) => {e.target.src='https://via.placeholder.com/300?text=Sin+Imagen'}}
                    />
                </div>
                
                {/* Badge de Categoría */}
                <span style={{fontSize: '0.8rem', background: '#eee', padding: '4px 8px', borderRadius: '4px', marginBottom: '5px', display: 'inline-block'}}>
                    {p.category || 'General'}
                </span>

                <h3>{p.name}</h3>
                <p className="price">{formatPrice(p.price)}</p>
                
                <button onClick={() => handleAddToCart(p)} className="btn-add">
                    Agregar al Carrito
                </button>
                </div>
            ))
          ) : (
              <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: '#666'}}>
                  No se encontraron productos que coincidan con tus filtros.
              </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ProductsPage;