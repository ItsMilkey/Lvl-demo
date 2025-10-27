// src/pages/ProfilePage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({ email: '', username: '', birthdate: '', preferencia: '' });

  // Cargar los datos del usuario desde localStorage al montar la página
  useEffect(() => {
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
    if (usuarioActivo) {
      setUsuario(prev => ({ ...prev, ...usuarioActivo }));
    }
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUsuario(prev => ({ ...prev, [id]: value }));
  };

  // Guardar cambios en el perfil
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('usuarioActivo', JSON.stringify(usuario));
    alert('✅ Perfil actualizado correctamente.');
  };

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('usuarioActivo');
    alert('👋 Sesión cerrada.');
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <h1>👤 Mi Perfil</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Nombre de usuario</label>
        <input type="text" id="username" value={usuario.username || ''} onChange={handleChange} required />

        <label htmlFor="email">Correo electrónico</label>
        <input type="email" id="email" value={usuario.email || ''} onChange={handleChange} required disabled />

        <label htmlFor="birthdate">Fecha de nacimiento</label>
        <input type="date" id="birthdate" value={usuario.birthdate || ''} onChange={handleChange} required />

        <label htmlFor="preferencia">Categoría favorita</label>
        <select id="preferencia" value={usuario.preferencia || ''} onChange={handleChange}>
          <option value="">Selecciona una</option>
          <option value="Juegos de Mesa">Juegos de Mesa</option>
          <option value="Accesorios">Accesorios</option>
          <option value="Consolas">Consolas</option>
          {/* ... (resto de opciones) ... */}
        </select>

        <button type="submit" className="btn">Guardar cambios</button>
      </form>

      <button onClick={handleLogout} className="btn btn-logout">Cerrar sesión</button>
    </div>
  );
}

export default ProfilePage;