import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);

  const [users, setUsers] = useState([
    { id: 1, name: "Usuario 1", email: "usuario1@example.com", password: "123456" },
    { id: 2, name: "Usuario 2", email: "usuario2@example.com", password: "abcdef" },
    { id: 3, name: "Usuario 3", email: "usuario3@example.com", password: "qwerty" },
  ]);

  const handleAddUser = () => {
    console.log("Agregar usuario");
  };

  const handleDeleteUser = () => {
    if (!selectedUser) {
      alert("Por favor selecciona un usuario para eliminar");
      return;
    }
    setUsers(users.filter((user) => user.id !== selectedUser));
    setSelectedUser(null);
  };

  const handleListUsers = () => {
    console.log("Listar usuarios");
  };

  const handleUserSelect = (userId) => {
    setSelectedUser(userId === selectedUser ? null : userId);
  };

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
                <th style={{ padding: "16px", border: "2px solid #000" }}>ID Usuario</th>
                <th style={{ padding: "16px", border: "2px solid #000" }}>Nombre</th>
                <th style={{ padding: "16px", border: "2px solid #000" }}>Email</th>
                <th style={{ padding: "16px", border: "2px solid #000" }}>Contraseña</th>
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
                    {"*".repeat(user.password.length)}
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
