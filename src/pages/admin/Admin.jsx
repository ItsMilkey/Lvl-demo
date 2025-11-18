// src/pages/admin/Admin.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

// --- ICONOS SVG (Se mantienen igual) ---
function IconUsers() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 11C18.2091 11 20 9.20914 20 7C20 4.79086 18.2091 3 16 3C13.7909 3 12 4.79086 12 7C12 9.20914 13.7909 11 16 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 11C8.20914 11 10 9.20914 10 7C10 4.79086 8.20914 3 6 3C3.79086 3 2 4.79086 2 7C2 9.20914 3.79086 11 6 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 21C2 17.6863 4.68629 15 8 15H14C17.3137 15 20 17.6863 20 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconProducts() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function IconReviews() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 9h10M7 13h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconReferrals() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 7h3a2 2 0 1 1 0 4h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 17H6a2 2 0 1 1 0-4h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 7l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Admin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('usuarioActivo');
    localStorage.removeItem('token'); // Aseguramos borrar el token también
    localStorage.removeItem('role');
    navigate('/login');
  };

  const goTo = (path) => {
    navigate(path);
  };

  // Estilos comunes para las tarjetas
  const cardStyle = {
    width: '100%',
    padding: '2rem',
    minHeight: '140px',
    textAlign: 'left',
    borderRadius: '12px',
    border: '2px solid #000', // Borde negro para consistencia con tu tema
    background: '#fff',
    cursor: 'pointer',
    boxShadow: '4px 4px 0px rgba(0,0,0,0.1)', // Sombra ligera
    transition: 'transform 0.2s, box-shadow 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  };

  return (
    // 1. USAMOS LA CLASE "main-content" (Esto aplica el margen inteligente y responsividad)
    <div className="main-content">
      
      {/* Botón Cerrar sesión */}
      <button
        onClick={handleLogout}
        className="btn"
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: '#d32f2f', // Rojo para logout
          color: '#fff',
          zIndex: 2000, // Por encima de todo
          border: '2px solid #000'
        }}
      >
        Cerrar sesión
      </button>

      <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', marginTop: '2rem' }}>
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Panel de Administración</h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>Bienvenido, administrador. Selecciona una herramienta.</p>
        </header>

        {/* 2. GRID RESPONSIVO AUTOMÁTICO 
           repeat(auto-fit, minmax(300px, 1fr)) -> Crea tantas columnas como quepan.
           Si la pantalla es pequeña, baja a 1 columna automáticamente.
        */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            width: '100%'
          }}
        >
          {/* Tarjeta Usuarios */}
          <button 
            onClick={() => goTo('/admin/users')} 
            style={cardStyle}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '6px 6px 0px #000'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '4px 4px 0px rgba(0,0,0,0.1)'; }}
          >
            <IconUsers />
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>Usuarios</h3>
              <p style={{ margin: '0.5rem 0 0', color: '#555' }}>Gestionar cuentas y accesos.</p>
            </div>
          </button>

          {/* Tarjeta Productos */}
          <button 
            onClick={() => goTo('/admin/products')} 
            style={cardStyle}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '6px 6px 0px #000'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '4px 4px 0px rgba(0,0,0,0.1)'; }}
          >
            <IconProducts />
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>Productos</h3>
              <p style={{ margin: '0.5rem 0 0', color: '#555' }}>Agregar o eliminar inventario.</p>
            </div>
          </button>

          {/* Tarjeta Reseñas */}
          <button 
            onClick={() => goTo('/admin/reviews')} 
            style={cardStyle}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '6px 6px 0px #000'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '4px 4px 0px rgba(0,0,0,0.1)'; }}
          >
            <IconReviews />
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>Reseñas</h3>
              <p style={{ margin: '0.5rem 0 0', color: '#555' }}>Moderar comentarios de clientes.</p>
            </div>
          </button>

          {/* Tarjeta Referidos */}
          <button 
            onClick={() => goTo('/admin/referrals')} 
            style={cardStyle}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '6px 6px 0px #000'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '4px 4px 0px rgba(0,0,0,0.1)'; }}
          >
            <IconReferrals />
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>Referidos</h3>
              <p style={{ margin: '0.5rem 0 0', color: '#555' }}>Códigos y recompensas.</p>
            </div>
          </button>

        </section>
      </div>
    </div>
  );
}

export default Admin;