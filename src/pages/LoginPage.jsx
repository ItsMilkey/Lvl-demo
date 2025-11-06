// src/pages/LoginPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // En una app real, verificaríamos el email y contraseña.
    // Aquí, solo simulamos un login exitoso si los campos no están vacíos.
    if (email && password) {
      // Redirección especial para el administrador
      if (email === 'admin@lvlup.com') {
        alert('¡Inicio de sesión de administrador! Serás redirigido al panel de administración.');
        // Guardamos la sesión del admin (simulado)
        localStorage.setItem('usuarioActivo', JSON.stringify({ email }));
        navigate('/admin'); // Redirige a adminPage (la crearemos después)
        return;
      }

      alert('¡Inicio de sesión exitoso! Serás redirigido a la página principal.');
      // Simulamos guardar la sesión del usuario en localStorage
      localStorage.setItem('usuarioActivo', JSON.stringify({ email: email }));
      navigate('/'); // Redirigir a la página de inicio
    } else {
      alert('Por favor, ingresa tu correo y contraseña.');
    }
  };

  return (
    <div className="auth-container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Correo electrónico</label>
        <input type="email" id="email" placeholder="ejemplo@correo.com" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label htmlFor="password">Contraseña</label>
        <input type="password" id="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
        
        <div className="remember">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Recordar sesión</label>
        </div>

        <button type="submit" className="btn">Entrar</button>
        <p><Link to="#">¿Olvidaste tu contraseña?</Link></p>
      </form>
      <p className="switch">¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
    </div>
  );
}

export default LoginPage;