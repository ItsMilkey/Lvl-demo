// src/components/Navbar.jsx
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navbar({ isCollapsed, toggleSidebar }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // Estados de sesión
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Nuevo estado para Admin

  useEffect(() => {
    // 1. Leemos Token y Rol
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // 2. Actualizamos estados
    setIsLoggedIn(!!token);           // true si hay token
    setIsAdmin(role === 'ROLE_ADMIN'); // true si el rol es exactamente ADMIN
  }, []);

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);
  const closeMobile = () => setIsMobileOpen(false);

  return (
    <>
      <button className="menu-toggle-mobile" onClick={toggleMobile}>☰</button>

      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
        <button className="collapse-btn-desktop" onClick={toggleSidebar}>
           {isCollapsed ? '➤' : '◀'}
        </button>

        <h2 className="logo">{isCollapsed ? 'LvL' : 'LvL-UP Gamer'}</h2>
        
        <nav>
          <ul>
            <li><NavLink to="/" onClick={closeMobile} title="Inicio">{isCollapsed ? '🏠' : '🏠 Inicio'}</NavLink></li>
            
            {/* --- SOLO SI ES ADMIN --- */}
            {isAdmin && (
              <li>
                <NavLink to="/admin" onClick={closeMobile} title="Panel Admin" style={{color: '#ff9800'}}>
                  {isCollapsed ? '⚙️' : '⚙️ Panel Admin'}
                </NavLink>
              </li>
            )}
            {/* ----------------------- */}

            <li><NavLink to="/productos" onClick={closeMobile} title="Productos">{isCollapsed ? '📦' : '📦 Productos'}</NavLink></li>
            
            {/* --- SOLO SI ESTÁ LOGUEADO (Cualquiera) --- */}
            {isLoggedIn && (
              <>
                <li><NavLink to="/carrito" onClick={closeMobile} title="Carrito">{isCollapsed ? '🛒' : '🛒 Carrito'}</NavLink></li>
                <li><NavLink to="/historial" onClick={closeMobile} title="Historial">{isCollapsed ? '📜' : '📜 Historial'}</NavLink></li>
              </>
            )}
            {/* ------------------------------------------ */}

            <li><NavLink to="/reseñas" onClick={closeMobile} title="Reseñas">{isCollapsed ? '⭐' : '⭐ Reseñas'}</NavLink></li>
            <li><NavLink to="/referidos" onClick={closeMobile} title="Referidos">{isCollapsed ? '👥' : '👥 Referidos'}</NavLink></li>
            <li><NavLink to="/comunidad" onClick={closeMobile} title="Comunidad">{isCollapsed ? '🌍' : '🌍 Comunidad'}</NavLink></li>
            
            {/* Perfil o Login */}
            {isLoggedIn ? (
                 <li><NavLink to="/perfil" onClick={closeMobile} title="Perfil">{isCollapsed ? '👤' : '👤 Perfil'}</NavLink></li>
            ) : (
                 <li><NavLink to="/login" onClick={closeMobile} title="Iniciar Sesión">{isCollapsed ? '🔐' : '🔐 Ingresar'}</NavLink></li>
            )}
            
          </ul>
        </nav>
      </aside>

      {isMobileOpen && <div className="menu-overlay" onClick={closeMobile}></div>}
    </>
  );
}

export default Navbar;