// src/pages/admin/users.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// URL base de la API (esto ya está perfecto)
const API_URL = import.meta.env.VITE_API_URL + "/api/users";

// 1. --- FUNCIÓN HELPER PARA LOS HEADERS DE AUTORIZACIÓN ---
// Esta función lee el token del localStorage y prepara el header
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    // Si no hay token, la petición fallará (lo cual es correcto)
    console.error("No se encontró el token de autenticación.");
    return {};
  }
  return {
    headers: {
      Authorization: `Bearer ${token}` // Estándar 'Bearer Token'
    }
  };
};

const Users = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  // --- FUNCIONES CONECTADAS AL BACKEND (ACTUALIZADAS) ---

  /**
   * Carga la lista de usuarios desde la API.
   * Ahora envía el token de autenticación.
   */
  const handleListUsers = async () => {
    try {
      // 2. AÑADIMOS LOS HEADERS DE AUTENTICACIÓN A LA PETICIÓN GET
      const response = await axios.get(API_URL, getAuthHeaders());
      setUsers(response.data);
      console.log("Usuarios cargados desde el backend.");
    } catch (error) {
      console.error("Error al listar usuarios:", error);
      // Si el token es inválido o expiró, nos dará un error 401 o 403
      alert("Error: No se pudieron cargar los usuarios. ¿Iniciaste sesión como Admin?");
    }
  };

  /**
   * Carga los usuarios automáticamente la primera vez.
   */
  useEffect(() => {
    handleListUsers();
  }, []); // El array vacío [] asegura que esto solo se ejecute una vez

  /**
   * Agrega un nuevo usuario.
   * Ahora incluye la lógica de rol y envía el token.
   */
  const handleAddUser = async () => {
    const name = prompt("Ingresa el nombre del usuario:");
    const email = prompt("Ingresa el email del usuario:");
    const password = prompt("Ingresa la contraseña:");

    if (!name || !email || !password) {
      console.log("Operación de agregar cancelada.");
      return;
    }

    // 3. --- LÓGICA DE ROL REPLICADA EN EL FRONTEND ---
    // Determinamos el rol basado en el email
    const role = email.toLowerCase().endsWith("@lvlup.com") 
      ? "ROLE_ADMIN" 
      : "ROLE_USER";
    
    // El 'RegisterDTO' de tu backend espera 'name', 'email', 'password'.
    // Tu entidad 'Usuario' también necesita 'role'.
    const newUser = { 
      name, 
      email, 
      password,
      role // Añadimos el rol que determinamos
    };

    try {
      // 4. AÑADIMOS LOS HEADERS DE AUTENTICACIÓN A LA PETICIÓN POST
      await axios.post(API_URL, newUser, getAuthHeaders());
      alert(`¡Usuario ${role} agregado con éxito!`);
      handleListUsers(); // Refresca la lista
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      if (error.response && error.response.status === 500) {
        alert("Error: El email ya está en uso.");
      } else {
        alert("Error: No se pudo agregar el usuario.");
      }
    }
  };

  /**
   * Elimina el usuario que está actualmente seleccionado.
   * Ahora envía el token de autenticación.
   */
  const handleDeleteUser = async () => {
    if (!selectedUser) {
      alert("Por favor selecciona un usuario para eliminar");
      return;
    }

    if (window.confirm("¿Estás seguro de que quieres eliminar a este usuario?")) {
      try {
        // 5. AÑADIMOS LOS HEADERS DE AUTENTICACIÓN A LA PETICIÓN DELETE
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

  /**
   * Maneja la selección de un usuario en la tabla. (No cambia)
   */
  const handleUserSelect = (userId) => {
    setSelectedUser(userId === selectedUser ? null : userId);
  };

  // --- RENDERIZADO DEL COMPONENTE (JSX CON MEJORAS) ---

  return (
    <div className="main-content" style={{ padding: "2rem" }}>
      {/* Botón Volver (No cambia) */}
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
          margin: "6rem auto 0 10rem",
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

        {/* Botones (No cambian) */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1.5rem",
            gap: "1rem",
          }}
        >
          <button
            onClick={handleListUsers} // "Refrescar"
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

        {/* Tabla de usuarios (ACTUALIZADA) */}
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
                {/* 6. --- MEJORA VISUAL: AÑADIMOS LA COLUMNA ROL --- */}
                <th style={{ padding: "16px", border: "2px solid #000" }}>
                  Rol
                </th>
                <th style={{ padding: "16px", border: "2px solid #0H0" }}>
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
                  {/* 7. --- MEJORA VISUAL: MOSTRAMOS EL ROL --- */}
                  <td style={{ padding: "12px", borderRight: "2px solid #000", fontWeight: "bold" }}>
                    {user.role === 'ROLE_ADMIN' ? 'Admin' : 'Usuario'}
                  </td>
                  <td style={{ padding: "12px" }}>
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