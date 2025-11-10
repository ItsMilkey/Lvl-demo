import React, { useState, useEffect } from "react"; // Importamos useEffect
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Importamos axios

// URL base de la API (asegúrate que el puerto 8080 sea el correcto)
const API_URL = "http://localhost:8080/api/users";

const Users = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]); // El estado inicial ahora es un array vacío

  // --- FUNCIONES CONECTADAS AL BACKEND ---

  /**
   * Carga la lista de usuarios desde la API.
   * El botón "Listar" ahora funciona como un "Refrescar".
   */
  const handleListUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
      console.log("Usuarios cargados desde el backend.");
    } catch (error) {
      console.error("Error al listar usuarios:", error);
      alert("Error: No se pudieron cargar los usuarios.");
    }
  };

  /**
   * Carga los usuarios automáticamente la primera vez que el componente se renderiza.
   */
  useEffect(() => {
    handleListUsers();
  }, []); // El array vacío [] asegura que esto solo se ejecute una vez

  /**
   * Agrega un nuevo usuario.
   * Pide los datos con prompts simples (puedes cambiar esto por un formulario/modal).
   */
  const handleAddUser = async () => {
    const name = prompt("Ingresa el nombre del usuario:");
    const email = prompt("Ingresa el email del usuario:");
    const password = prompt("Ingresa la contraseña:");

    // Verifica que el usuario no haya cancelado ningún prompt
    if (!name || !email || !password) {
      console.log("Operación de agregar cancelada.");
      return;
    }

    const newUser = { name, email, password };

    try {
      await axios.post(API_URL, newUser);
      alert("¡Usuario agregado con éxito!");
      handleListUsers(); // Refresca la lista después de agregar
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      alert("Error: No se pudo agregar el usuario.");
    }
  };

  /**
   * Elimina el usuario que está actualmente seleccionado.
   */
  const handleDeleteUser = async () => {
    if (!selectedUser) {
      alert("Por favor selecciona un usuario para eliminar");
      return;
    }

    // Pedimos confirmación antes de eliminar
    if (window.confirm("¿Estás seguro de que quieres eliminar a este usuario?")) {
      try {
        await axios.delete(`${API_URL}/${selectedUser}`);
        alert("Usuario eliminado con éxito.");
        setSelectedUser(null); // Limpia la selección
        handleListUsers(); // Refresca la lista después de eliminar
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        alert("Error: No se pudo eliminar el usuario.");
      }
    }
  };

  /**
   * Maneja la selección de un usuario en la tabla.
   * (Esta función solo maneja estado local, no necesita API).
   */
  const handleUserSelect = (userId) => {
    setSelectedUser(userId === selectedUser ? null : userId);
  };

  // --- RENDERIZADO DEL COMPONENTE (JSX) ---
  // (Tu código JSX original está perfecto y no necesita cambios)

  return (
    <div className="main-content" style={{ padding: "2rem" }}>
      {/* Botón Volver */}
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
          background: "#fffbea",
          border: "2px solid #000",
          borderRadius: "10px",
          padding: "2rem",
          boxShadow: "3px 3px 6px rgba(0,0,0,0.15)",
          maxWidth: "95%",
          margin: "6rem auto 0 10rem", // Más abajo y más a la derecha
        }}
      >
        <h1
          style={{
            color: "#000",
            marginBottom: "2rem",
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          ADMINISTRAR USUARIOS
        </h1>

        {/* Botones */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1.5rem",
            gap: "1rem",
          }}
        >
          <button
            onClick={handleListUsers} // Ahora funciona como "Refrescar"
            style={{
              background: "#2196f3",
              color: "#fff",
              border: "2px solid #000",
              fontWeight: "bold",
              padding: "12px 24px",
              fontSize: "1.1rem",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Listar
          </button>

          <button
            onClick={handleAddUser}
            style={{
              background: "#25d366",
              color: "#fff",
              border: "2px solid #000",
              fontWeight: "bold",
              padding: "12px 24px",
              fontSize: "1.1rem",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Agregar Usuario
          </button>

          <button
            onClick={handleDeleteUser}
            style={{
              background: "#d32f2f",
              color: "#fff",
              border: "2px solid #000",
              fontWeight: "bold",
              padding: "12px 24px",
              fontSize: "1.1rem",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Eliminar
          </button>
        </div>

        {/* Tabla de usuarios */}
        <div
          style={{
            border: "2px solid #000",
            borderRadius: "10px",
            overflow: "hidden",
            background: "#fff",
            width: "100%",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "center",
              fontSize: "1.1rem",
            }}
          >
            <thead
              style={{
                background: "#333",
                color: "#00b300",
              }}
            >
              <tr>
                <th style={{ padding: "16px", border: "2px solid #000" }}>
                  ID Usuario
                </th>
                <th style={{ padding: "16px", border: "2px solid #000" }}>
                  Nombre
                </th>
                <th style={{ padding: "16px", border: "2px solid #000" }}>
                  Email
                </th>
                <th style={{ padding: "16px", border: "2px solid #000" }}>
                  Contraseña
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => handleUserSelect(user.id)}
                  style={{
                    background:
                      selectedUser === user.id ? "#ffe680" : "#fffbea",
                    borderBottom: "2px solid #000",
                    cursor: "pointer",
                    transition: "background 0.2s ease",
                  }}
                >
                  <td style={{ padding: "12px", borderRight: "2px solid #000" }}>
                    {user.id}
                  </td>
                  <td style={{ padding: "12px", borderRight: "2px solid #000" }}>
                    {user.name}
                  </td>
                  <td style={{ padding: "12px", borderRight: "2px solid #000" }}>
                    {user.email}
                  </td>
                  <td style={{ padding: "12px" }}>
                    {/* Mostramos asteriscos para la contraseña */}
                    {"*".repeat(8)}
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

export default Users;