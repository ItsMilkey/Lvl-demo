// src/pages/RegisterPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AUTH_URL = import.meta.env.VITE_API_URL + '/api/auth';

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthdate: '',
    terms: false,
  });

  // --- Validaciones (Se mantienen igual) ---
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isStrongPassword = (pwd) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(pwd);
  const isValidUsername = (u) => /^[a-zA-Z0-9_]{3,20}$/.test(u);
  // ---------------------------------------

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];

    // Extracción de datos
    const username = (formData.username || '').trim();
    const email = (formData.email || '').trim().toLowerCase();
    const password = formData.password || '';
    const confirmPassword = formData.confirmPassword || '';
    const birthdate = formData.birthdate;

    // --- Ejecución de Validaciones ---
    if (!username) errors.push('El usuario es obligatorio.');
    else if (!isValidUsername(username)) errors.push('El usuario debe tener 3-20 caracteres (letras, números, _).');
    
    if (!email) errors.push('El correo es obligatorio.');
    else if (!isValidEmail(email)) errors.push('Formato de correo inválido.');
    
    if (!password) errors.push('La contraseña es obligatoria.');
    if (password !== confirmPassword) errors.push('Las contraseñas no coinciden.');
    if (password && !isStrongPassword(password)) errors.push('La contraseña debe tener mayúsculas, minúsculas, números y símbolos.');
    
    if (!birthdate) {
      errors.push('Ingresa tu fecha de nacimiento.');
    } else {
      const birth = new Date(birthdate);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
      if (age < 18) errors.push('Debes ser mayor de 18 años.');
    }
    
    if (!formData.terms) errors.push('Acepta los términos y condiciones.');

    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    // Datos para el backend
    const registerData = {
      name: username,
      email: email,
      password: password
    };

    try {
      // LLAMADA AL BACKEND
      const response = await axios.post(`${AUTH_URL}/register`, registerData);
      
      // --- CAMBIO CLAVE: AUTO-LOGIN ---
      // Como el backend devuelve el token al registrarse, lo usamos de inmediato.
      const { token, role } = response.data;

      if (token) {
          // 1. Guardamos la sesión
          localStorage.setItem('token', token);
          localStorage.setItem('role', role);

          alert(`¡Bienvenido ${username}! Tu cuenta ha sido creada.`);

          // 2. Redirección inteligente
          if (role === 'ROLE_ADMIN') {
              navigate('/admin');
          } else {
              navigate('/'); // Vamos al inicio para comprar
          }

          // 3. Forzamos recarga para que el Navbar detecte el login y muestre el Carrito/Historial
          window.location.reload();
      } else {
          // Fallback por si el backend solo devuelve un mensaje de éxito sin token
          alert('Cuenta creada. Por favor inicia sesión.');
          navigate('/login');
      }

    } catch (error) {
      console.error("Error registro:", error);
      if (error.response && (error.response.status === 500 || error.response.status === 400)) {
         alert('Error: Es posible que el correo ya esté registrado.');
      } else if (error.code === "ERR_NETWORK") {
         alert('Error de conexión con el servidor.');
      } else {
        alert('Ocurrió un error inesperado.');
      }
    }
  };

  return (
    <div className="auth-container">
      <h1>Registro</h1>
      <form noValidate onSubmit={handleSubmit}>
        <label htmlFor="username">Usuario</label>
        <input type="text" id="username" placeholder="Tu usuario" value={formData.username} onChange={handleChange} required />

        <label htmlFor="email">Correo electrónico</label>
        <input type="email" id="email" placeholder="ejemplo@correo.com" value={formData.email} onChange={handleChange} required />

        <label htmlFor="password">Contraseña</label>
        <input type="password" id="password" placeholder="********" value={formData.password} onChange={handleChange} required />

        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
        <input type="password" id="confirmPassword" placeholder="********" value={formData.confirmPassword} onChange={handleChange} required />

        <label htmlFor="birthdate">Fecha de nacimiento</label>
        <input type="date" id="birthdate" value={formData.birthdate} onChange={handleChange} required />

        <div className="terms">
          <input type="checkbox" id="terms" checked={formData.terms} onChange={handleChange} required />
          <label htmlFor="terms">Acepto los términos y condiciones</label>
        </div>

        <button type="submit" className="btn">Crear cuenta</button>
      </form>
      <p className="switch">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
    </div>
  );
}

export default RegisterPage;