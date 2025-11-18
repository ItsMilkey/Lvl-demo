// src/pages/admin/users.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/users";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) return {};
  return { headers: { Authorization: `Bearer ${token}` } };
};

const Users = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  const handleListUsers = async () => {
    try {
      const response = await axios.get(API_URL, getAuthHeaders());
      setUsers(response.data);
      console.log("Usuarios cargados desde el backend.");
    } catch (error) {
      console.error("Error al listar usuarios:", error);
      alert("Error: No se pudieron cargar los usuarios. ¿Iniciaste sesión como Admin?");
    }
  };

  useEffect(() => {
    handleListUsers();
  }, []);

  const handleAddUser = async () => {
    const name = prompt("Ingresa el nombre del usuario:");
    const email = prompt("Ingresa el email del usuario:");
    const password = prompt("Ingresa la contraseña:");

    if (!name || !email || !password) return;

    const role = email.toLowerCase().endsWith("@lvlup.com") ? "ROLE_ADMIN" : "ROLE_USER";
    const newUser = { name, email, password, role };

    try {
      await axios.post(API_URL, newUser, getAuthHeaders());
      alert(`¡Usuario ${role} agregado con éxito!`);
      handleListUsers();
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      if (error.response && error.response.status === 500) {
        alert("Error: El email ya está en uso.");
      } else {
        alert("Error: No se pudo agregar el usuario.");
      }
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) {
      alert("Por favor selecciona un usuario para eliminar");
      return;
    }

    if (window.confirm("¿Estás seguro de que quieres eliminar a este usuario?")) {
      try {
        await axios.delete(`${API_URL}/${selectedUser}`, getAuthHeaders());
        alert("Usuario eliminado con éxito.");
        setSelectedUser(null);
        handleListUsers();
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        alert("Error: No se pudo eliminar el usuario.");
      }
    }
  };

  const handleUserSelect = (userId) => {
    setSelectedUser(userId === selectedUser ? null : userId);
  };

  return (
    // --- CAMBIO CLAVE: Usamos 'main-content' para responsividad automática ---
    <div className="main-content">
      
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

      {/* Usamos 'responsive-section' del CSS global para el contenedor blanco */}
      <section className="responsive-section">
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

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1.5rem",
            gap: "1rem",
            flexWrap: "wrap" // Permite que los botones bajen en móvil
          }}
        >
          <button
            onClick={handleListUsers}
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

        {/* Tabla Responsiva */}
        <div className="table-responsive">
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "center",
              fontSize: "1.1rem",
              minWidth: "600px" // Evita que se aplaste demasiado
            }}
          >
            <thead
              style={{
                background: "#333",
                color: "#00b300",
              }}
            >
              <tr>
                <th style={{ padding: "16px", border: "2px solid #000" }}>ID</th>
                <th style={{ padding: "16px", border: "2px solid #000" }}>Nombre</th>
                <th style={{ padding: "16px", border: "2px solid #000" }}>Email</th>
                <th style={{ padding: "16px", border: "2px solid #000" }}>Rol</th>
                <th style={{ padding: "16px", border: "2px solid #000" }}>Contraseña</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => handleUserSelect(user.id)}
                  style={{
                    background: selectedUser === user.id ? "#ffe680" : "#fffbea",
                    borderBottom: "2px solid #000",
                    cursor: "pointer",
                    transition: "background 0.2s ease",
                  }}
                >
                  <td style={{ padding: "12px", borderRight: "2px solid #000" }}>{user.id}</td>
                  <td style={{ padding: "12px", borderRight: "2px solid #000" }}>{user.name}</td>
                  <td style={{ padding: "12px", borderRight: "2px solid #000" }}>{user.email}</td>
                  <td style={{ padding: "12px", borderRight: "2px solid #000", fontWeight: "bold" }}>
                    {user.role === 'ROLE_ADMIN' ? 'Admin' : 'Usuario'}
                  </td>
                  <td style={{ padding: "12px" }}>{"*".repeat(8)}</td>
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