// src/pages/LoginPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // 1. IMPORTAMOS AXIOS

// 2. DEFINIMOS LA RUTA DE LA API DE AUTENTICACIÓN
// (Usando el 'process.env' que configuramos para Render)
const AUTH_URL = process.env.VITE_API_URL + '/api/auth';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 3. ACTUALIZAMOS LA FUNCIÓN 'handleSubmit' PARA QUE SEA ASÍNCRONA
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 4. DATOS QUE ENVIAREMOS AL BACKEND (coincide con LoginDTO.java)
    const loginData = {
      email: email,
      password: password
    };

    try {
      // 5. LLAMAMOS AL ENDPOINT DE LOGIN
      const response = await axios.post(`${AUTH_URL}/login`, loginData);

      // 6. SI EL LOGIN ES EXITOSO (TENEMOS UN TOKEN Y ROL)
      const { token, role } = response.data;

      // 7. GUARDAMOS EL TOKEN EN LOCALSTORAGE
      // (El backend se encargará de verificar este token en las rutas protegidas)
      localStorage.setItem('token', token);
      
      // 8. LÓGICA DE REDIRECCIÓN BASADA EN EL ROL (DEVUELTO POR EL BACKEND)
      // (Ya no simulamos con 'admin@lvlup.com')
      if (role === 'ROLE_ADMIN') {
        alert('¡Bienvenido Administrador!');
        navigate('/admin'); // Redirige al panel de admin
      } else {
        alert('¡Inicio de sesión exitoso!');
        navigate('/'); // Redirige a la página de inicio
      }

    } catch (error) {
      // 9. SI EL LOGIN FALLA (401, 403, 500, etc.)
      console.error("Error en el inicio de sesión:", error);
      // Usamos un mensaje genérico por seguridad
      alert('Error: Email o contraseña incorrectos.');
    }
  };

  // --- TU CÓDIGO JSX (return) NO CAMBIA, YA ESTÁ PERFECTO ---
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