// src/components/Navbar.jsx
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">LvL-UP Gamer</h2>
      <nav>
        <ul>
          <li><NavLink to="/">🏠 Inicio</NavLink></li>
          <li><NavLink to="/productos">📦 Productos</NavLink></li>
          <li><NavLink to="/reseñas">⭐ Reseñas</NavLink></li>
          <li><NavLink to="/referidos">👥 Referidos</NavLink></li>
          <li><NavLink to="/comunidad">🌍 Comunidad</NavLink></li>
          {/* --- Enlace añadido --- */}
          <li><NavLink to="/perfil">👤 Perfil</NavLink></li>
        </ul>
      </nav>
    </aside>
  );
}

export default Navbar;