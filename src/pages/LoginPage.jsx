// src/pages/LoginPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AUTH_URL = import.meta.env.VITE_API_URL + '/api/auth';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      const response = await axios.post(`${AUTH_URL}/login`, loginData);
      const { token, role } = response.data;

      // Guardamos credenciales
      localStorage.setItem('token', token);
      localStorage.setItem('role', role); 
      
      // --- LÓGICA DE REDIRECCIÓN ---
      if (role === 'ROLE_ADMIN') {
        alert('¡Bienvenido Administrador!');
        navigate('/admin'); 
      } else {
        // Cualquier otro usuario (incluyendo los que no son @lvlup.com)
        // se van al Inicio para poder comprar.
        alert('¡Inicio de sesión exitoso!');
        navigate('/'); 
        // Recargamos la página brevemente para que el Navbar actualice los botones
        window.location.reload(); 
      }

    } catch (error) {
      console.error("Error login:", error);
      alert('Error: Email o contraseña incorrectos.');
    }
  };

  return (
    <div className="auth-container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Correo electrónico</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label htmlFor="password">Contraseña</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        
        <button type="submit" className="btn">Entrar</button>
      </form>
      <p className="switch">¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
    </div>
  );
}

export default LoginPage;