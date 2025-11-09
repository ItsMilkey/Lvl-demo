import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Catan",
      price: "$29.990",
      image: "/assets/productos/catan.png",
    },
    {
      id: 2,
      name: "Carcassonne",
      price: "$24.990",
      image: "/assets/productos/carcassonne.png",
    },
    {
      id: 3,
      name: "Controlador Inalámbrico Xbox Series X",
      price: "$59.990",
      image: "/assets/productos/xbox_controller.png",
    },
    {
      id: 4,
      name: "Audífonos Gamer HyperX Cloud II",
      price: "$79.990",
      image: "/assets/productos/hyperx.png",
    },
    {
      id: 5,
      name: "PlayStation 5",
      price: "$549.990",
      image: "/assets/productos/ps5.png",
    },
  ]);

  const handleEdit = (id) => {
    console.log("Editar producto:", id);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleList = () => {
    console.log("Listar productos");
  };

  const handleAdd = () => {
    console.log("Agregar producto");
  };

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
          maxWidth: "1600px", // ancho máximo amplio
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
            onClick={handleList}
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
            onClick={handleAdd}
            style={{
              background: "#25d366",
              color: "#fff",
              border: "2px solid #000",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "6px",
            }}
          >
            Agregar
          </button>
        </div>

        {/* Tabla centrada y más ancha */}
        <div
          style={{
            border: "2px solid #000",
            borderRadius: "10px",
            overflow: "hidden",
            background: "#fff",
            width: "100%",
            maxHeight: "450px", // menor altura
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
              {products.map((product) => (
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
                    {product.price}
                  </td>
                  <td style={{ padding: "10px", borderRight: "2px solid #000" }}>
                    <img
                      src={product.image}
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
                      onClick={() => handleDelete(product.id)}
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
