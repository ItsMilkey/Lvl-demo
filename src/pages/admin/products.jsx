// src/pages/admin/products.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/products";

// Lista de categorías disponibles para seleccionar
const CATEGORIES = [
  "Juegos de Mesa",
  "Accesorios",
  "Consolas",
  "Computadores Gamers",
  "Sillas Gamers",
  "Mouse",
  "Mousepad",
  "Poleras Personalizadas"
];

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) return {};
  return { headers: { Authorization: `Bearer ${token}` } };
};

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  
  // Estado actualizado con category
  const [newProduct, setNewProduct] = useState({ 
    name: "", 
    price: "", 
    image: "", 
    category: "" // Nuevo campo
  });

  const formatPrice = (price) => {
    if (typeof price !== 'number') return price;
    return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", minimumFractionDigits: 0 }).format(price);
  };

  const handleListProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Error al listar productos:", error);
    }
  };

  useEffect(() => { handleListProducts(); }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    // Validación actualizada
    if (!newProduct.name || !newProduct.price || !newProduct.image || !newProduct.category) { 
        alert("Por favor completa todos los campos, incluyendo la categoría."); 
        return; 
    }

    const productToSend = {
      ...newProduct,
      price: parseFloat(newProduct.price),
    };

    try {
      await axios.post(API_URL, productToSend, getAuthHeaders());
      alert("Producto agregado");
      setNewProduct({ name: "", price: "", image: "", category: "" }); // Reset
      setShowForm(false);
      handleListProducts();
    } catch (error) { 
        console.error(error);
        alert("Error: Verifica permisos de admin"); 
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("¿Eliminar producto?")) {
      try {
        await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
        alert("Eliminado");
        handleListProducts();
      } catch (error) { alert("Error al eliminar"); }
    }
  };

  const handleEdit = (id) => alert("Próximamente...");

  return (
    <div className="main-content">
      
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button onClick={() => navigate(-1)} className="btn" style={{ background: "#f7e8a9", color: "#333", border: "2px solid #000", cursor: "pointer", fontWeight: "bold" }}>Volver</button>
      </div>

      <section className="responsive-section">
        <h1 style={{ color: "#000", marginBottom: "2rem", fontSize: "2.2rem", fontWeight: "900", textAlign: "center", textTransform: "uppercase" }}>
          Inventario de Productos
        </h1>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", borderBottom: "2px solid #ddd", paddingBottom: "1rem", flexWrap: "wrap", gap: "1rem" }}>
          <h3 style={{ margin: 0, fontSize: "1.2rem", color: "#555", fontWeight: "bold" }}>Total: {products.length} productos</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
             <button onClick={handleListProducts} style={{ background: "#2196f3", color: "#fff", border: "2px solid #000", fontWeight: "bold", padding: "10px 20px", borderRadius: "6px", cursor: "pointer" }}>↻ Refrescar</button>
            <button onClick={() => setShowForm(!showForm)} style={{ background: showForm ? "#ff5722" : "#25d366", color: "#fff", border: "2px solid #000", fontWeight: "bold", padding: "10px 20px", borderRadius: "6px", cursor: "pointer" }}>{showForm ? "✖ Cancelar" : "✚ Nuevo Producto"}</button>
          </div>
        </div>

        {/* Formulario */}
        {showForm && (
          <div style={{ background: "#fff", border: "2px solid #000", borderRadius: "8px", padding: "2rem", marginBottom: "2rem", display: "flex", gap: "2rem", alignItems: "flex-start", flexWrap: "wrap", boxShadow: "inset 0 0 10px rgba(0,0,0,0.05)" }}>
             <div style={{ width: "150px", height: "150px", border: "2px dashed #ccc", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#f9f9f9", flexShrink: 0, margin: "0 auto" }}>
                 {newProduct.image ? <img src={newProduct.image} alt="Vista previa" style={{width: "100%", height: "100%", objectFit: "cover"}} /> : <span style={{color: "#aaa", fontSize: "0.8rem"}}>Sin imagen</span>}
             </div>
             
             <form onSubmit={handleAddProduct} style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1rem", minWidth: "250px" }}>
                
                <label style={{fontWeight: "bold"}}>Nombre</label>
                <input type="text" name="name" placeholder="Ej: PC Gamer" value={newProduct.name} onChange={handleFormChange} style={{ width: "100%", padding: "10px", border: "2px solid #000", borderRadius: "5px" }} />
                
                <label style={{fontWeight: "bold"}}>Precio (CLP)</label>
                <input type="number" name="price" placeholder="Ej: 50000" value={newProduct.price} onChange={handleFormChange} style={{ width: "100%", padding: "10px", border: "2px solid #000", borderRadius: "5px" }} />

                {/* NUEVO SELECTOR DE CATEGORÍA */}
                <label style={{fontWeight: "bold"}}>Categoría</label>
                <select 
                    name="category" 
                    value={newProduct.category} 
                    onChange={handleFormChange}
                    style={{ width: "100%", padding: "10px", border: "2px solid #000", borderRadius: "5px", background: "#fff" }}
                >
                    <option value="">-- Selecciona una Categoría --</option>
                    {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                <label style={{fontWeight: "bold"}}>URL Imagen</label>
                <input type="text" name="image" placeholder="https://..." value={newProduct.image} onChange={handleFormChange} style={{ width: "100%", padding: "10px", border: "2px solid #000", borderRadius: "5px" }} />

                <button type="submit" style={{ marginTop: "10px", background: "#000", color: "#fff", border: "none", fontWeight: "bold", padding: "12px", borderRadius: "6px", cursor: "pointer" }}>Guardar</button>
             </form>
          </div>
        )}

        {/* Tabla Responsiva */}
        <div className="table-responsive" style={{ background: "#fff", boxShadow: "4px 4px 0px #ddd" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: "700px" }}>
            <thead style={{ background: "#222", color: "#fff", textTransform: "uppercase", fontSize: "0.9rem" }}>
              <tr>
                <th style={{ padding: "15px" }}>Producto</th>
                <th style={{ padding: "15px" }}>Categoría</th> {/* Columna Nueva */}
                <th style={{ padding: "15px" }}>Precio</th>
                <th style={{ padding: "15px", textAlign: "center" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(products) && products.length > 0 ? products.map((product) => (
                <tr key={product.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "15px", display: "flex", alignItems: "center", gap: "15px" }}>
                    <div style={{ width: "60px", height: "60px", border: "1px solid #ccc", borderRadius: "6px", overflow: "hidden", background: "#f0f0f0", flexShrink: 0 }}>
                         <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => {e.target.src='https://via.placeholder.com/60'}} />
                    </div>
                    <div><span style={{fontWeight: "bold", display: "block"}}>{product.name}</span><span style={{fontSize: "0.8rem", color: "#888"}}>ID: {product.id}</span></div>
                  </td>
                  
                  {/* Columna Categoría */}
                  <td style={{ padding: "15px", color: "#555" }}>
                    <span style={{background: "#eee", padding: "4px 8px", borderRadius: "4px", fontSize: "0.9rem", border: "1px solid #ddd"}}>
                        {product.category || "Sin categoría"}
                    </span>
                  </td>

                  <td style={{ padding: "15px", fontWeight: "bold", color: "#25d366" }}>{formatPrice(product.price)}</td>
                  <td style={{ padding: "15px", textAlign: "center" }}>
                    <button onClick={() => handleEdit(product.id)} style={{ background: "#fff", border: "1px solid #25d366", color: "#25d366", fontWeight: "bold", padding: "5px 10px", borderRadius: "6px", marginRight: "8px", cursor: "pointer" }}>✎</button>
                    <button onClick={() => handleDeleteProduct(product.id)} style={{ background: "#fff", border: "1px solid #d32f2f", color: "#d32f2f", fontWeight: "bold", padding: "5px 10px", borderRadius: "6px", cursor: "pointer" }}>🗑</button>
                  </td>
                </tr>
              )) : <tr><td colSpan="4" style={{padding: "3rem", textAlign: "center", color: "#888"}}>No hay productos registrados.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Products;