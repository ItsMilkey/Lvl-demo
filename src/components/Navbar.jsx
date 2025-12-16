// src/components/Navbar.jsx
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Agregamos useEffect

function Navbar({ isCollapsed, toggleSidebar }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // Estado para saber si el usuario está logueado
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verificamos el token cada vez que el componente se monta o actualiza
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Convierte el string a boolean (true si existe, false si no)
  }, []); // Se ejecuta al montar. Nota: Si haces logout, idealmente refresca la página.

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
            <li><NavLink to="/productos" onClick={closeMobile} title="Productos">{isCollapsed ? '📦' : '📦 Productos'}</NavLink></li>
            
            {/* --- SOLO MOSTRAR SI ESTÁ LOGUEADO --- */}
            {isLoggedIn && (
              <>
                <li><NavLink to="/carrito" onClick={closeMobile} title="Carrito">{isCollapsed ? '🛒' : '🛒 Carrito'}</NavLink></li>
                <li><NavLink to="/historial" onClick={closeMobile} title="Historial">{isCollapsed ? '📜' : '📜 Historial'}</NavLink></li>
              </>
            )}
            {/* ----------------------------------- */}

            <li><NavLink to="/reseñas" onClick={closeMobile} title="Reseñas">{isCollapsed ? '⭐' : '⭐ Reseñas'}</NavLink></li>
            <li><NavLink to="/referidos" onClick={closeMobile} title="Referidos">{isCollapsed ? '👥' : '👥 Referidos'}</NavLink></li>
            <li><NavLink to="/comunidad" onClick={closeMobile} title="Comunidad">{isCollapsed ? '🌍' : '🌍 Comunidad'}</NavLink></li>
            
            {/* Si está logueado va al Perfil, si no, al Login */}
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