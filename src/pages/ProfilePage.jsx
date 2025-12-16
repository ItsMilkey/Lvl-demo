// src/pages/ProfilePage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// URL para obtener mis propios datos
const API_URL = import.meta.env.VITE_API_URL + '/api/users/me';

function ProfilePage() {
  const navigate = useNavigate();
  
  // Estado inicial
  const [usuario, setUsuario] = useState({ 
    name: '', 
    email: '', 
    birthdate: '', 
    preferencia: '' 
  });
  
  const [loading, setLoading] = useState(true);

  // --- LOGOUT REAL ---
  const handleLogout = () => {
    // 1. Borramos TODO rastro de la sesión
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
    // 2. Feedback
    alert('👋 Sesión cerrada correctamente.');
    
    // 3. Forzamos recarga para actualizar el Navbar
    window.location.reload(); // Esto recargará la app y, como no hay token, el Navbar se ocultará.
    
    // (Opcional, la recarga ya te lleva al inicio o login si tienes lógica global, 
    // pero navigate es seguro por si acaso)
    navigate('/login');
  };

  // --- CARGAR DATOS REALES DEL BACKEND ---
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login'); // Si no hay token, fuera
        return;
      }

      try {
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Llenamos el estado con los datos reales de la BD
        setUsuario(prev => ({
          ...prev,
          name: response.data.name,   // Nombre real de Oracle
          email: response.data.email, // Email real de Oracle
          // Nota: Si tu BD no tiene fecha/preferencia, estos seguirán vacíos
        }));
      } catch (error) {
        console.error("Error al cargar perfil:", error);
        // Si el token expiró o es inválido (403/401), cerramos sesión automáticamente
        if (error.response && (error.response.status === 403 || error.response.status === 401)) {
            alert("Tu sesión ha expirado. Por favor inicia sesión nuevamente.");
            handleLogout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Manejar cambios en el formulario (Solo visual por ahora)
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUsuario(prev => ({ ...prev, [id]: value }));
  };

  // Guardar cambios (Por ahora solo simulación visual o podrías hacer un PUT)
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('✅ Datos locales actualizados (Simulación).');
  };

  if (loading) return <div className="auth-container"><p>Cargando perfil...</p></div>;

  return (
    <div className="auth-container">
      <h1>👤 Mi Perfil</h1>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre de usuario</label>
        {/* Mostramos el nombre real traído del backend */}
        <input 
          type="text" 
          id="name" 
          value={usuario.name || ''} 
          onChange={handleChange} 
          // Si quieres que sea solo lectura, agrega: readOnly 
        />

        <label htmlFor="email">Correo electrónico</label>
        {/* El correo suele ser inmutable */}
        <input 
          type="email" 
          id="email" 
          value={usuario.email || ''} 
          readOnly 
          disabled 
          style={{ backgroundColor: '#e9ecef' }} 
        />

        <label htmlFor="birthdate">Fecha de nacimiento</label>
        <input 
          type="date" 
          id="birthdate" 
          value={usuario.birthdate || ''} 
          onChange={handleChange} 
        />

        <label htmlFor="preferencia">Categoría favorita</label>
        <select id="preferencia" value={usuario.preferencia || ''} onChange={handleChange}>
          <option value="">Selecciona una</option>
          <option value="Juegos de Mesa">Juegos de Mesa</option>
          <option value="Accesorios">Accesorios</option>
          <option value="Consolas">Consolas</option>
          <option value="Computadores Gamers">Computadores Gamers</option>
        </select>

        <button type="submit" className="btn">Guardar cambios</button>
      </form>

      <div style={{marginTop: '2rem', borderTop: '1px solid #ccc', paddingTop: '1rem'}}>
        <button 
            onClick={handleLogout} 
            className="btn" 
            style={{backgroundColor: '#d32f2f', border: '2px solid #000', color: 'white'}}
        >
            Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;