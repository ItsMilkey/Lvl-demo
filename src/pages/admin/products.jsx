// src/pages/admin/products.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 3. DEFINIMOS LA RUTA DE LA API
const API_URL = import.meta.env.VITE_API_URL + "/api/products";

// --- FUNCIÓN HELPER PARA LOS HEADERS DE AUTORIZACIÓN ---
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) return {};
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  
  // Estado para los datos del nuevo producto
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "", 
  });

  // --- FUNCIONES DE FORMATO ---
  const formatPrice = (price) => {
    if (typeof price !== 'number') return price;
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // --- FUNCIONES DE API ---
  const handleListProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Error al listar productos:", error);
    }
  };

  useEffect(() => {
    handleListProducts();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
        alert("Por favor completa todos los campos.");
        return;
    }

    const productToSend = {
      ...newProduct,
      price: parseFloat(newProduct.price),
    };

    try {
      await axios.post(API_URL, productToSend, getAuthHeaders());
      alert("Producto agregado con éxito");
      setNewProduct({ name: "", price: "", image: "" });
      setShowForm(false);
      handleListProducts();
    } catch (error) {
      console.error("Error al agregar producto:", error);
      alert("Error al guardar: Verifica que seas administrador.");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
        alert("Producto eliminado.");
        handleListProducts();
      } catch (error) {
        console.error("Error al eliminar producto:", error);
        alert("No se pudo eliminar. Verifica permisos.");
      }
    }
  };

  const handleEdit = (id) => {
    alert(`La función de editar el ID ${id} estará disponible pronto.`);
  };

  // --- RENDERIZADO ---

  return (
    <div
      className="main-content"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100vh',
        background: '#fffbea',
        paddingTop: '2rem',
        // --- AQUÍ ESTÁ EL CAMBIO CLAVE ---
        paddingLeft: '20rem', // Aumentado de 10rem a 17rem para empujarlo a la derecha
        paddingBottom: '4rem'
      }}
    >
      {/* Botón Volver fijo */}
      <button
        onClick={() => navigate(-1)}
        className="btn"
        style={{
          position: "fixed",
          top: "16px",
          right: "16px",
          background: "#f7e8a9",
          color: "#333",
          border: "2px solid #000",
          zIndex: 1000,
        }}
      >
        Volver
      </button>

      {/* Contenedor de Sección */}
      <section
        style={{
            // Ajustamos el ancho para que se vea bien centrado en el espacio restante
            width: '80%', 
            maxWidth: '1200px',
            background: '#fffdf0',
            border: '2px solid #000',
            borderRadius: '10px',
            padding: '2.5rem',
            boxShadow: '4px 4px 8px rgba(0,0,0,0.15)',
        }}
      >
        <h1
          style={{
            color: "#000",
            marginBottom: "2rem",
            fontSize: "2.2rem",
            fontWeight: "900",
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}
        >
          Inventario de Productos
        </h1>

        {/* Botones Superiores */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
            borderBottom: "2px solid #ddd",
            paddingBottom: "1rem"
          }}
        >
          <h3 style={{margin: 0, fontSize: "1.2rem", color: "#555", fontWeight: "bold"}}>
            Total: {products.length} productos
          </h3>

          <div style={{ display: 'flex', gap: '10px'}}>
             <button
                onClick={handleListProducts}
                style={{
                background: "#2196f3",
                color: "#fff",
                border: "2px solid #000",
                fontWeight: "bold",
                padding: "10px 20px",
                borderRadius: "6px",
                cursor: "pointer",
                boxShadow: "2px 2px 0px #000"
                }}
            >
                ↻ Refrescar
            </button>

            <button
                onClick={() => setShowForm(!showForm)}
                style={{
                background: showForm ? "#ff5722" : "#25d366",
                color: "#fff",
                border: "2px solid #000",
                fontWeight: "bold",
                padding: "10px 20px",
                borderRadius: "6px",
                cursor: "pointer",
                boxShadow: "2px 2px 0px #000"
                }}
            >
                {showForm ? "✖ Cancelar" : "✚ Nuevo Producto"}
            </button>
          </div>
        </div>

        {/* FORMULARIO PARA AGREGAR PRODUCTO */}
        {showForm && (
          <div style={{
            background: "#fff",
            border: "2px solid #000",
            borderRadius: "8px",
            padding: "2rem",
            marginBottom: "2rem",
            display: "flex",
            gap: "2rem",
            alignItems: "flex-start",
            boxShadow: "inset 0 0 10px rgba(0,0,0,0.05)"
          }}>
             {/* Previsualización de Imagen */}
             <div style={{
                 width: "150px",
                 height: "150px",
                 border: "2px dashed #ccc",
                 borderRadius: "8px",
                 display: "flex",
                 alignItems: "center",
                 justifyContent: "center",
                 overflow: "hidden",
                 background: "#f9f9f9",
                 flexShrink: 0
             }}>
                 {newProduct.image ? (
                     <img src={newProduct.image} alt="Vista previa" style={{width: "100%", height: "100%", objectFit: "cover"}} />
                 ) : (
                     <span style={{color: "#aaa", fontSize: "0.8rem", textAlign: "center"}}>Sin imagen</span>
                 )}
             </div>

             {/* Inputs del Formulario */}
             <form onSubmit={handleAddProduct} style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                    <label style={{display: "block", fontWeight: "bold", marginBottom: "5px"}}>Nombre del Producto</label>
                    <input
                    type="text"
                    name="name"
                    placeholder="Ej: PC Gamer Ultra"
                    value={newProduct.name}
                    onChange={handleFormChange}
                    style={{ width: "100%", padding: "10px", border: "2px solid #000", borderRadius: "5px", background: "#fffbea" }}
                    />
                </div>
                
                <div>
                     <label style={{display: "block", fontWeight: "bold", marginBottom: "5px"}}>Precio (CLP)</label>
                     <input
                     type="number"
                     name="price"
                     placeholder="Ej: 50000"
                     value={newProduct.price}
                     onChange={handleFormChange}
                     style={{ width: "100%", padding: "10px", border: "2px solid #000", borderRadius: "5px", background: "#fffbea" }}
                     />
                </div>

                <div>
                    <label style={{display: "block", fontWeight: "bold", marginBottom: "5px"}}>URL de la Imagen</label>
                    <input
                    type="text"
                    name="image"
                    placeholder="https://..."
                    value={newProduct.image}
                    onChange={handleFormChange}
                    style={{ width: "100%", padding: "10px", border: "2px solid #000", borderRadius: "5px", background: "#fffbea" }}
                    />
                </div>

                <button
                type="submit"
                style={{
                    marginTop: "10px",
                    background: "#000",
                    color: "#fff",
                    border: "none",
                    fontWeight: "bold",
                    padding: "12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "1rem",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                }}
                >
                Guardar en Base de Datos
                </button>
             </form>
          </div>
        )}

        {/* Tabla de productos */}
        <div
          style={{
            border: "2px solid #000",
            borderRadius: "10px",
            overflow: "hidden",
            background: "#fff",
            boxShadow: "4px 4px 0px #ddd"
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead
              style={{
                background: "#222",
                color: "#fff",
                textTransform: "uppercase",
                fontSize: "0.9rem",
              }}
            >
              <tr>
                <th style={{ padding: "15px" }}>Producto</th>
                <th style={{ padding: "15px" }}>Precio</th>
                <th style={{ padding: "15px", textAlign: "center" }}>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(products) && products.length > 0 ? (
                  products.map((product) => (
                <tr
                  key={product.id}
                  style={{ borderBottom: "1px solid #eee" }}
                >
                  <td style={{ padding: "15px", display: "flex", alignItems: "center", gap: "15px" }}>
                    <div style={{
                        width: "60px", 
                        height: "60px", 
                        border: "1px solid #ccc", 
                        borderRadius: "6px",
                        overflow: "hidden",
                        background: "#f0f0f0",
                        flexShrink: 0
                    }}>
                         <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            onError={(e) => {e.target.src='https://via.placeholder.com/60?text=IMG'}} 
                        />
                    </div>
                    <div>
                        <span style={{fontWeight: "bold", fontSize: "1.1rem", display: "block"}}>{product.name}</span>
                        <span style={{fontSize: "0.8rem", color: "#888"}}>ID: {product.id}</span>
                    </div>
                  </td>

                  <td style={{ padding: "15px", fontWeight: "bold", color: "#25d366", fontSize: "1.1rem" }}>
                    {formatPrice(product.price)}
                  </td>

                  <td style={{ padding: "15px", textAlign: "center" }}>
                    <button
                      onClick={() => handleEdit(product.id)}
                      style={{
                        background: "#fff",
                        border: "2px solid #25d366",
                        color: "#25d366",
                        fontWeight: "bold",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginRight: "8px",
                      }}
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      style={{
                        background: "#fff",
                        border: "2px solid #d32f2f",
                        color: "#d32f2f",
                        fontWeight: "bold",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))
            ) : (
                <tr>
                    <td colSpan="3" style={{padding: "3rem", textAlign: "center", color: "#888"}}>
                        No hay productos registrados. ¡Agrega uno nuevo!
                    </td>
                </tr>
            )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Products;