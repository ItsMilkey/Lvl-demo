// src/pages/ProductsPage.jsx
import { useContext, useState, useEffect, useMemo } from 'react'; 
import { CartContext } from '../context/CartContext'; 
import axios from 'axios'; // Importamos Axios
import './products.css';

// URL de la API (Usamos la variable de entorno correcta)
const API_URL = import.meta.env.VITE_API_URL + '/api/products';

function ProductsPage() {
  const { agregarAlCarrito } = useContext(CartContext); 
  
  // Estado para los productos que vienen del backend
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estado para búsqueda
  const [search, setSearch] = useState('');

  // --- CARGAR PRODUCTOS DESDE EL BACKEND ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        // El backend devuelve un array de objetos: { id, name, price, image }
        setProducts(response.data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // --- FILTRADO POR BÚSQUEDA ---
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return products;

    return products.filter(p => 
      p.name.toLowerCase().includes(term)
    );
  }, [search, products]);

  // Helper para formatear precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Helper para adaptar el producto al formato que espera el carrito
  // Tu contexto de carrito probablemente espera { codigo, nombre, precio, img }
  // Pero el backend devuelve { id, name, price, image }
  const handleAddToCart = (productoBackend) => {
    const productoAdaptado = {
        codigo: productoBackend.id, // Adaptamos id -> codigo
        nombre: productoBackend.name, // Adaptamos name -> nombre
        precio: productoBackend.price, 
        img: productoBackend.image // Adaptamos image -> img
    };
    agregarAlCarrito(productoAdaptado);
  };

  if (loading) {
      return (
        <div style={{textAlign: 'center', padding: '4rem', fontSize: '1.5rem'}}>
            Cargando catálogo...
        </div>
      );
  }

  return (
    <>
      <header className="topbar">
        <h1>Catálogo de Productos</h1>
        <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
            <input
            id="searchBar"
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{maxWidth: '500px'}} 
            />
        </div>
      </header>

      <section>
        {/* Grid de productos filtrados */}
        <div id="productGrid" className="product-grid" style={{ marginTop: 40 }}>
          {filtered.length > 0 ? (
            filtered.map(p => (
                <div key={p.id} className="product-card">
                <div className="image-container" style={{height: '200px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <img 
                        src={p.image} 
                        alt={p.name} 
                        style={{maxHeight: '100%', objectFit: 'contain'}}
                        onError={(e) => {e.target.src='https://via.placeholder.com/300?text=Sin+Imagen'}}
                    />
                </div>
                <h3>{p.name}</h3>
                <p className="price">{formatPrice(p.price)}</p>
                
                <button 
                    onClick={() => handleAddToCart(p)} 
                    className="btn-add"
                >
                    Agregar al Carrito
                </button>
                </div>
            ))
          ) : (
              <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: '#666'}}>
                  No se encontraron productos que coincidan con tu búsqueda.
              </div>
          )}
        </div>
      </section>
    </>
  );
}

export default ProductsPage;