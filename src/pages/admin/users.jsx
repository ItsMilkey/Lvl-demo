import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Ejemplo de datos de usuarios - Después deberás reemplazarlo con datos reales
  const [users, setUsers] = useState([
    { id: 1, name: 'Usuario 1', email: 'usuario1@example.com' },
    { id: 2, name: 'Usuario 2', email: 'usuario2@example.com' },
    { id: 3, name: 'Usuario 3', email: 'usuario3@example.com' },
  ]);

  const handleAddUser = () => {
    // Aquí implementarás la lógica para agregar usuario
    console.log('Agregar usuario');
  };

  const handleDeleteUser = () => {
    if (!selectedUser) {
      alert('Por favor selecciona un usuario para eliminar');
      return;
    }
    // Aquí implementarás la lógica para eliminar usuario
    setUsers(users.filter(user => user.id !== selectedUser));
    setSelectedUser(null);
  };

  const handleUserSelect = (userId) => {
    setSelectedUser(userId === selectedUser ? null : userId);
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
            <h1>Gestión de Usuarios</h1>
          </div>

          {/* Botones de acción */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginBottom: '2rem' }}>
            <button
              onClick={handleAddUser}
              className="btn"
              style={{ 
                background: '#25d366',
                border: '2px solid #000'
              }}
            >
              Agregar Usuario
            </button>
            <button
              onClick={handleDeleteUser}
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
              {users.map((user) => (
                <li
                  key={user.id}
                  style={{
                    padding: '1rem',
                    cursor: 'pointer',
                    borderBottom: '2px solid #000',
                    background: selectedUser === user.id ? '#ffe680' : '#fdf6d9',
                    transition: 'background 0.2s ease'
                  }}
                  onClick={() => handleUserSelect(user.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ margin: 0, color: '#333' }}>{user.name}</h3>
                      <p style={{ margin: '0.5rem 0 0', color: '#666' }}>{user.email}</p>
                    </div>
                    {selectedUser === user.id && (
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

export default Users;
