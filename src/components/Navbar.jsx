// src/components/Navbar.jsx
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function Navbar({ isCollapsed, toggleSidebar }) {
  // Estado local solo para móvil
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);
  const closeMobile = () => setIsMobileOpen(false);

  return (
    <>
      {/* BOTÓN HAMBURGUESA MÓVIL */}
      <button className="menu-toggle-mobile" onClick={toggleMobile}>
        ☰
      </button>

      {/* SIDEBAR (Desktop + Móvil unificados) */}
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
        
        {/* Botón para colapsar en Desktop */}
        <button className="collapse-btn-desktop" onClick={toggleSidebar}>
           {isCollapsed ? '➤' : '◀'}
        </button>

        <h2 className="logo">{isCollapsed ? 'LvL' : 'LvL-UP Gamer'}</h2>
        
        <nav>
          <ul>
            <li><NavLink to="/" onClick={closeMobile} title="Inicio">{isCollapsed ? '🏠' : '🏠 Inicio'}</NavLink></li>
            <li><NavLink to="/productos" onClick={closeMobile} title="Productos">{isCollapsed ? '📦' : '📦 Productos'}</NavLink></li>
            
            {/* --- NUEVOS ENLACES AGREGADOS --- */}
            <li><NavLink to="/carrito" onClick={closeMobile} title="Carrito">{isCollapsed ? '🛒' : '🛒 Carrito'}</NavLink></li>
            <li><NavLink to="/historial" onClick={closeMobile} title="Historial">{isCollapsed ? '📜' : '📜 Historial'}</NavLink></li>
            {/* -------------------------------- */}

            <li><NavLink to="/reseñas" onClick={closeMobile} title="Reseñas">{isCollapsed ? '⭐' : '⭐ Reseñas'}</NavLink></li>
            <li><NavLink to="/referidos" onClick={closeMobile} title="Referidos">{isCollapsed ? '👥' : '👥 Referidos'}</NavLink></li>
            <li><NavLink to="/comunidad" onClick={closeMobile} title="Comunidad">{isCollapsed ? '🌍' : '🌍 Comunidad'}</NavLink></li>
            <li><NavLink to="/perfil" onClick={closeMobile} title="Perfil">{isCollapsed ? '👤' : '👤 Perfil'}</NavLink></li>
          </ul>
        </nav>
      </aside>

      {/* Overlay Móvil */}
      {isMobileOpen && <div className="menu-overlay" onClick={closeMobile}></div>}
    </>
  );
}

export default Navbar;