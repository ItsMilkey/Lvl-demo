// src/pages/admin/Admin.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    navigate('/login');
  };

  const goTo = (path) => {
    // Rutas mock para las secciones administrativas
    navigate(path);
  };

  return (
    <div
      className="admin-page"
      style={{
        padding: '3rem',
        paddingLeft: '25rem', // mover todo hacia la derecha bastante
        minHeight: '100vh',
        boxSizing: 'border-box',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start', // alinear al inicio para respetar el offset
        background: 'transparent',
      }}
    >
      {/* Botón Cerrar sesión en esquina superior derecha */}
      <button
        onClick={handleLogout}
        className="btn"
        style={{
          position: 'fixed', // fijado al viewport para estar siempre en la esquina derecha
          top: '16px',
          right: '16px',
          padding: '0.8rem 1.2rem', // fondo más grande
          background: '#25a85a',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          zIndex: 1000,
          fontSize: '1rem', // texto a tamaño normal
        }}
      >
        Cerrar sesión
      </button>

      <header style={{ width: '100%', maxWidth: 1100, marginBottom: '1.5rem', textAlign: 'center' }}>
        <h1 style={{ margin: 0 }}>Panel de Administración</h1>
        <p style={{ margin: '0.5rem 0 0', color: '#666' }}>Bienvenido, administrador. Usa los botones para acceder a las herramientas.</p>
      </header>

      <section
        className="admin-grid"
        style={{
          width: '100%',
          maxWidth: 700, // limitar ancho para centrar en 2 columnas
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(260px, 1fr))', // forzar 2 columnas
          gap: '1.25rem',
          justifyItems: 'center',
          alignItems: 'center',
        }}
      >
  <button className="admin-card" onClick={() => goTo('/admin/users')} style={{ width: '100%', padding: '2rem', minHeight: '140px', textAlign: 'left', borderRadius: '12px', border: '1px solid #eaeaea', background: '#fff', cursor: 'pointer', boxShadow: '0 6px 18px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <IconUsers />
            <div>
                <h3 style={{ margin: 0, fontSize: '1.05rem' }}>Usuarios</h3>
                <p style={{ margin: '0.35rem 0 0', color: '#666', fontSize: '0.9rem' }}>Crear, editar o eliminar usuarios.</p>
            </div>
          </div>
        </button>

  <button className="admin-card" onClick={() => goTo('/admin/products')} style={{ width: '100%', padding: '2rem', minHeight: '140px', textAlign: 'left', borderRadius: '12px', border: '1px solid #e6e6e6', background: '#fff', cursor: 'pointer', boxShadow: '0 6px 18px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <IconProducts />
            <div>
              <h3 style={{ margin: 0, fontSize: '1.05rem' }}>Productos</h3>
              <p style={{ margin: '0.35rem 0 0', color: '#666', fontSize: '0.9rem' }}>Agregar, actualizar o quitar productos.</p>
            </div>
          </div>
        </button>

  <button className="admin-card" onClick={() => goTo('/admin/reviews')} style={{ width: '100%', padding: '2rem', minHeight: '140px', textAlign: 'left', borderRadius: '12px', border: '1px solid #e6e6e6', background: '#fff', cursor: 'pointer', boxShadow: '0 6px 18px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <IconReviews />
            <div>
              <h3 style={{ margin: 0, fontSize: '1.05rem' }}>Reseñas</h3>
              <p style={{ margin: '0.35rem 0 0', color: '#666', fontSize: '0.9rem' }}>Revisar y moderar reseñas de usuarios.</p>
            </div>
          </div>
        </button>

  <button className="admin-card" onClick={() => goTo('/admin/referrals')} style={{ width: '100%', padding: '2rem', minHeight: '140px', textAlign: 'left', borderRadius: '12px', border: '1px solid #e6e6e6', background: '#fff', cursor: 'pointer', boxShadow: '0 6px 18px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <IconReferrals />
            <div>
              <h3 style={{ margin: 0, fontSize: '1.05rem' }}>Referidos</h3>
              <p style={{ margin: '0.35rem 0 0', color: '#666', fontSize: '0.9rem' }}>Ver y gestionar código de referidos y recompensas.</p>
            </div>
          </div>
        </button>
      </section>
    </div>
  );
}

export default Admin;
