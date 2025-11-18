// src/components/Navbar.jsx
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  // Estado para controlar si el menú está abierto o cerrado en móvil
  const [isOpen, setIsOpen] = useState(false);

  // Función para alternar el menú
  const toggleMenu = () => setIsOpen(!isOpen);

  // Función para cerrar el menú al hacer clic en un enlace
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* 1. BOTÓN HAMBURGUESA (Visible solo en móvil) */}
      <button 
        className={`menu-toggle ${isOpen ? 'active' : ''}`} 
        onClick={toggleMenu}
        aria-label="Abrir menú"
      >
        {isOpen ? '✖' : '☰'}
      </button>

      {/* 2. SIDEBAR (Añadimos la clase 'open' si el estado es true) */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h2 className="logo">LvL-UP Gamer</h2>
        <nav>
          <ul>
            <li><NavLink to="/" onClick={closeMenu}>🏠 Inicio</NavLink></li>
            <li><NavLink to="/productos" onClick={closeMenu}>📦 Productos</NavLink></li>
            <li><NavLink to="/reseñas" onClick={closeMenu}>⭐ Reseñas</NavLink></li>
            <li><NavLink to="/referidos" onClick={closeMenu}>👥 Referidos</NavLink></li>
            <li><NavLink to="/comunidad" onClick={closeMenu}>🌍 Comunidad</NavLink></li>
            <li><NavLink to="/perfil" onClick={closeMenu}>👤 Perfil</NavLink></li>
          </ul>
        </nav>
      </aside>

      {/* 3. OVERLAY (Fondo oscuro al abrir menú en móvil) */}
      {isOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
    </>
  );
}

export default Navbar;