// src/pages/ProductsPage.jsx
import { useContext, useState, useEffect, useMemo } from 'react'; 
import { CartContext } from '../context/CartContext'; 
import axios from 'axios'; 
import './products.css'; // Asegúrate de que este archivo tenga el CSS de 5 columnas que hicimos

const API_URL = import.meta.env.VITE_API_URL + '/api/products';

// Categorías disponibles
const CATEGORIES = ["Todos", "Juegos de Mesa", "Accesorios", "Consolas", "Computadores Gamers", "Mouse", "Mousepad", "Poleras Personalizadas"];

function ProductsPage() {
  const { agregarAlCarrito } = useContext(CartContext); 
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- ESTADOS DE FILTRO ---
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [maxPrice, setMaxPrice] = useState(2000000); 

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
      const matchesSearch = p.name.toLowerCase().includes(term);
      const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
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

  if (loading) return <div className="main-content" style={{textAlign: 'center', paddingTop: '4rem', fontSize: '1.5rem'}}>Cargando...</div>;

  return (
    <div className="main-content">
      
      {/* HEADER: Mismo estilo que tenías (Amarillo con borde) */}
      <header className="topbar" style={{ flexDirection: 'column', gap: '1rem', alignItems: 'center', paddingBottom: '1.5rem' }}>
        <h1 style={{margin: 0}}>CATÁLOGO DE PRODUCTOS</h1>
        <input
          id="searchBar"
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{maxWidth: '600px', width: '100%'}} 
        />
      </header>

      {/* --- SECCIÓN DE FILTROS (Integrada al diseño) --- */}
      <section style={{ padding: '0 2rem 2rem 2rem' }}>
        
        {/* 1. Filtros de Categoría (Estilo Botones Retro) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '2rem' }}>
            {CATEGORIES.map(cat => (
                <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '6px', // Bordes un poco más cuadrados como tu tema
                        border: '2px solid #000',
                        // Si está activo: Amarillo (tu color primario). Si no: Blanco.
                        background: selectedCategory === cat ? '#f7e8a9' : '#fff',
                        color: '#000',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'transform 0.1s',
                        fontSize: '0.9rem'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* 2. Filtro de Precio (Barra simple centrada) */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <label style={{fontWeight: 'bold', fontSize: '1.1rem'}}>
                Precio Máx: <span style={{color: '#25d366', background: '#fff', border: '1px solid #000', padding: '2px 6px', borderRadius: '4px'}}>{formatPrice(maxPrice)}</span>
            </label>
            <input 
                type="range" 
                min="0" 
                max="2000000" 
                step="10000" 
                value={maxPrice} 
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', maxWidth: '300px', cursor: 'pointer', accentColor: '#000' }}
            />
        </div>
      </section>

      {/* --- GRID DE PRODUCTOS (Tu Grid de 5 columnas intacto) --- */}
      <section>
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
                    
                    {/* Pequeña etiqueta de categoría */}
                    <div style={{marginBottom: '5px'}}>
                        <span style={{fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 'bold', color: '#666', border: '1px solid #ccc', padding: '2px 6px', borderRadius: '4px', background: '#f9f9f9'}}>
                            {p.category || 'General'}
                        </span>
                    </div>

                    <h3>{p.name}</h3>
                    <p className="price">{formatPrice(p.price)}</p>
                    
                    <button onClick={() => handleAddToCart(p)} className="btn-add">
                        Agregar al Carrito
                    </button>
                </div>
            ))
          ) : (
              <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: '#666', fontSize: '1.2rem'}}>
                  <p>🚫 No se encontraron productos.</p>
                  <button onClick={() => {setSearch(''); setSelectedCategory('Todos'); setMaxPrice(2000000)}} className="btn" style={{marginTop: '1rem'}}>
                    Limpiar Filtros
                  </button>
              </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ProductsPage;