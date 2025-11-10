import React, { useState, useEffect } from "react"; // 1. IMPORTAMOS HOOKS
import { useNavigate } from "react-router-dom";
import axios from "axios"; // 2. IMPORTAMOS AXIOS

// 3. DEFINIMOS LA RUTA DE LA API DE PRODUCTOS
const API_URL = "http://localhost:8080/api/products";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]); // 4. INICIA VACÍO
  const [showForm, setShowForm] = useState(false); // 5. ESTADO PARA MOSTRAR/OCULTAR FORMULARIO
  
  // 6. ESTADO PARA LOS DATOS DEL NUEVO PRODUCTO
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    image: "", // Aquí guardaremos el link (URL) de la imagen
  });

  // --- FUNCIONES DE FORMATO ---

  /**
   * Formatea un número a moneda local (Peso Chileno)
   * Ej: 29990 -> "$29.990"
   */
  const formatPrice = (price) => {
    if (typeof price !== 'number') {
      return price; // Devuelve el valor original si no es un número
    }
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0, // Sin decimales
    }).format(price);
  };

  // --- FUNCIONES DE API ---

  /**
   * Carga la lista de productos desde el backend
   */
  const handleListProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Error al listar productos:", error);
      alert("No se pudieron cargar los productos.");
    }
  };

  /**
   * Carga los productos al iniciar el componente
   */
  useEffect(() => {
    handleListProducts();
  }, []);

  /**
   * Maneja el cambio en los inputs del formulario
   */
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  /**
   * Maneja el envío del formulario para crear un producto
   */
  const handleAddProduct = async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Preparamos el objeto a enviar
    const productToSend = {
      ...newProduct,
      price: parseFloat(newProduct.price), // Aseguramos que el precio sea un número
    };

    try {
      await axios.post(API_URL, productToSend);
      alert("Producto agregado con éxito");
      setNewProduct({ name: "", price: 0, image: "" }); // Limpia el formulario
      setShowForm(false); // Oculta el formulario
      handleListProducts(); // Refresca la lista
    } catch (error) {
      console.error("Error al agregar producto:", error);
      alert("Error al guardar el producto.");
    }
  };

  /**
   * Elimina un producto
   */
  const handleDeleteProduct = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        alert("Producto eliminado.");
        handleListProducts(); // Refresca la lista
      } catch (error) {
        console.error("Error al eliminar producto:", error);
        alert("No se pudo eliminar el producto.");
      }
    }
  };

  const handleEdit = (id) => {
    console.log("Editar producto:", id);
    // Lógica de edición (abrir modal/formulario de edición)
  };

  // --- RENDERIZADO DEL COMPONENTE ---

  return (
    <div
      className="main-content"
      style={{
        minHeight: "100vh",
        background: "#fdf6d9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "6rem", // Espacio para el botón volver
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

      <section
        style={{
          width: "90%",
          maxWidth: "1600px",
          background: "#fffbea",
          border: "2px solid #000",
          borderRadius: "10px",
          padding: "2rem",
          boxShadow: "3px 3px 6px rgba(0,0,0,0.15)",
        }}
      >
        <h1
          style={{
            color: "#000",
            marginBottom: "1.5rem",
            fontSize: "1.8rem",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          ADMINISTRAR PRODUCTOS
        </h1>

        {/* Botones Listar y Agregar */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1.5rem",
            gap: "10px",
          }}
        >
          <button
            onClick={handleListProducts} // Refresca la lista
            style={{
              background: "#2196f3",
              color: "#fff",
              border: "2px solid #000",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "6px",
            }}
          >
            Listar
          </button>

          <button
            onClick={() => setShowForm(!showForm)} // Muestra/oculta el formulario
            style={{
              background: "#25d366",
              color: "#fff",
              border: "2px solid #000",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "6px",
            }}
          >
            {showForm ? "Cancelar" : "Agregar"}
          </button>
        </div>

        {/* 7. FORMULARIO PARA AGREGAR PRODUCTO (CONDICIONAL) */}
        {showForm && (
          <form
            onSubmit={handleAddProduct}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              margin: "0 auto 2rem auto",
              padding: "1.5rem",
              border: "2px solid #000",
              borderRadius: "8px",
              background: "#fdf6d9",
              maxWidth: "600px",
            }}
          >
            <h3 style={{ textAlign: "center", margin: 0, fontWeight: "bold" }}>
              Nuevo Producto
            </h3>
            <input
              type="text"
              name="name"
              placeholder="Nombre del Producto"
              value={newProduct.name}
              onChange={handleFormChange}
              required
              style={{ padding: "10px", border: "2px solid #000", borderRadius: "5px" }}
            />
            <input
              type="number"
              name="price"
              placeholder="Precio (Ej: 29990)"
              value={newProduct.price}
              onChange={handleFormChange}
              required
              style={{ padding: "10px", border: "2px solid #000", borderRadius: "5px" }}
            />
            <input
              type="text"
              name="image"
              placeholder="Link (URL) de la imagen"
              value={newProduct.image}
              onChange={handleFormChange}
              required
              style={{ padding: "10px", border: "2px solid #000", borderRadius: "5px" }}
            />
            <button
              type="submit"
              style={{
                background: "#25d366",
                color: "#fff",
                border: "2px solid #000",
                fontWeight: "bold",
                padding: "12px",
                borderRadius: "6px",
              }}
            >
              Guardar Producto
            </button>
          </form>
        )}

        {/* Tabla de productos */}
        <div
          style={{
            border: "2px solid #000",
            borderRadius: "10px",
            overflow: "hidden",
            background: "#fff",
            width: "100%",
            maxHeight: "450px",
            overflowY: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "center",
            }}
          >
            <thead
              style={{
                background: "#333",
                color: "#00b300",
                fontSize: "1rem",
              }}
            >
              <tr>
                <th style={{ padding: "12px", border: "2px solid #000" }}>ID</th>
                <th style={{ padding: "12px", border: "2px solid #000" }}>
                  Nombre
                </th>
                <th style={{ padding: "12px", border: "2px solid #000" }}>
                  Precio
                </th>
                <th style={{ padding: "12px", border: "2px solid #000" }}>
                  Imagen
                </th>
                <th style={{ padding: "12px", border: "2px solid #000" }}>
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>
              {/* 8. MAPEO DEFENSIVO */}
              {Array.isArray(products) && products.map((product) => (
                <tr
                  key={product.id}
                  style={{
                    background: "#fffbea",
                    borderBottom: "2px solid #000",
                  }}
                >
                  <td style={{ padding: "10px", borderRight: "2px solid #000" }}>
                    {product.id}
                  </td>
                  <td style={{ padding: "10px", borderRight: "2px solid #000" }}>
                    {product.name}
                  </td>
                  <td style={{ padding: "10px", borderRight: "2px solid #000" }}>
                    {formatPrice(product.price)} {/* 9. PRECIO FORMATEADO */}
                  </td>
                  <td style={{ padding: "10px", borderRight: "2px solid #000" }}>
                    <img
                      src={product.image} // 10. IMAGEN DESDE URL
                      alt={product.name}
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                        borderRadius: "5px",
                        border: "2px solid #000",
                      }}
                    />
                  </td>
                  <td style={{ padding: "10px" }}>
                    <button
                      onClick={() => handleEdit(product.id)}
                      style={{
                        background: "#25d366",
                        marginRight: "10px",
                        border: "2px solid #000",
                        fontWeight: "bold",
                        padding: "5px 10px",
                      }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)} // 11. CONECTADO A API
                      style={{
                        background: "#d32f2f",
                        border: "2px solid #000",
                        fontWeight: "bold",
                        padding: "5px 10px",
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Products;