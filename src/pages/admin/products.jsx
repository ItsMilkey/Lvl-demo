import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Ejemplo de datos de productos - Después deberás reemplazarlo con datos reales
  const [products, setProducts] = useState([
    { id: 1, name: 'Producto 1', price: '$19.99', stock: 50 },
    { id: 2, name: 'Producto 2', price: '$29.99', stock: 30 },
    { id: 3, name: 'Producto 3', price: '$39.99', stock: 25 },
  ]);

  const handleAddProduct = () => {
    // Aquí implementarás la lógica para agregar producto
    console.log('Agregar producto');
  };

  const handleEditProduct = () => {
    if (!selectedProduct) {
      alert('Por favor selecciona un producto para editar');
      return;
    }
    // Aquí implementarás la lógica para editar producto
    console.log('Editar producto:', selectedProduct);
  };

  const handleDeleteProduct = () => {
    if (!selectedProduct) {
      alert('Por favor selecciona un producto para eliminar');
      return;
    }
    // Aquí implementarás la lógica para eliminar producto
    setProducts(products.filter(product => product.id !== selectedProduct));
    setSelectedProduct(null);
  };

  const handleProductSelect = (productId) => {
    setSelectedProduct(productId === selectedProduct ? null : productId);
  };

  return (
    <div className="main-content">
      {/* Botón Volver fijo en la esquina superior derecha */}
      <button
        onClick={() => navigate(-1)}
        className="btn"
        style={{ 
          position: 'fixed',
          top: '16px',
          right: '16px',
          background: '#f7e8a9',
          color: '#333',
          border: '2px solid #000',
          zIndex: 1000
        }}
      >
        Volver
      </button>

      <section style={{ 
        padding: '3rem',
        paddingLeft: '20rem'
      }}>
        {/* Header con título y botones */}
        <div style={{ maxWidth: '800px', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h1>Gestión de Productos</h1>
          </div>

          {/* Botones de acción */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginBottom: '2rem' }}>
            <button
              onClick={handleAddProduct}
              className="btn"
              style={{ 
                background: '#25d366',
                border: '2px solid #000'
              }}
            >
              Agregar Producto
            </button>
            <button
              onClick={handleEditProduct}
              className="btn"
              style={{ 
                background: '#3b82f6',
                border: '2px solid #000'
              }}
            >
              Editar
            </button>
            <button
              onClick={handleDeleteProduct}
              className="btn"
              style={{ 
                background: '#d32f2f',
                border: '2px solid #000'
              }}
            >
              Eliminar
            </button>
          </div>

          {/* Lista de usuarios */}
          <div style={{ 
            background: '#fdf6d9',
            borderRadius: '10px',
            border: '2px solid #000',
            overflow: 'hidden'
          }}>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {products.map((product) => (
                <li
                  key={product.id}
                  style={{
                    padding: '1rem',
                    cursor: 'pointer',
                    borderBottom: '2px solid #000',
                    background: selectedProduct === product.id ? '#ffe680' : '#fdf6d9',
                    transition: 'background 0.2s ease'
                  }}
                  onClick={() => handleProductSelect(product.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ margin: 0, color: '#333' }}>{product.name}</h3>
                      <p style={{ margin: '0.5rem 0 0', color: '#666' }}>
                        Precio: {product.price} | Stock: {product.stock} unidades
                      </p>
                    </div>
                    {selectedProduct === product.id && (
                      <span style={{ color: '#25d366', fontSize: '1.2rem' }}>✓</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
