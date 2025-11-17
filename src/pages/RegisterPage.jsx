// src/pages/RegisterPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // 1. IMPORTAMOS AXIOS

// 2. DEFINIMOS LA RUTA DE LA API DE AUTENTICACIÓN
// (Esta ruta es PÚBLICA gracias a tu SecurityConfig)
const AUTH_URL = import.meta.env.VITE_API_URL + '/api/auth'; // <-- ¡CORREGIDO!

function RegisterPage() {
  const navigate = useNavigate(); // Hook para redirigir al usuario

  // Un solo estado para todos los campos del formulario
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthdate: '',
    terms: false,
  });

  // --- Tus funciones de validación (no cambian) ---
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const isStrongPassword = (pwd) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(pwd);
  };
  const isValidUsername = (u) => {
    return /^[a-zA-Z0-9_]{3,20}$/.test(u);
  };
  // ---------------------------------------------

  // Manejador para actualizar el estado (no cambia)
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  // 3. MANEJADOR PARA EL ENVÍO DEL FORMULARIO (ACTUALIZADO A ASYNC)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Recolectar errores para mostrarlos todos juntos
    const errors = [];

    const username = (formData.username || '').trim();
    const email = (formData.email || '').trim().toLowerCase();
    const password = formData.password || '';
    const confirmPassword = formData.confirmPassword || '';
    const birthdate = formData.birthdate;

    // --- Validaciones (Tus validaciones se mantienen) ---
    if (!username) {
      errors.push('El usuario es obligatorio.');
    } else if (!isValidUsername(username)) {
      errors.push('El usuario debe tener entre 3 y 20 caracteres y solo puede contener letras, números y guion bajo (_).');
    }
    if (!email) {
      errors.push('El correo electrónico es obligatorio.');
    } else if (!isValidEmail(email)) {
      errors.push('El correo electrónico no tiene un formato válido.');
    }
    if (!password) {
      errors.push('La contraseña es obligatoria.');
    }
    if (password !== confirmPassword) {
      errors.push('Las contraseñas no coinciden.');
    }
    if (password && !isStrongPassword(password)) {
      errors.push('La contraseña debe tener al menos 8 caracteres e incluir mayúsculas, minúsculas, números y caracteres especiales.');
    }
    if (!birthdate) {
      errors.push('Por favor ingresa tu fecha de nacimiento.');
    } else {
      const birth = new Date(birthdate);
      const today = new Date();
      if (isNaN(birth.getTime())) {
        errors.push('La fecha de nacimiento no es válida.');
      } else {
        if (birth > today) {
          errors.push('La fecha de nacimiento no puede ser en el futuro.');
        } else {
          let age = today.getFullYear() - birth.getFullYear();
          const m = today.getMonth() - birth.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--;
          }
          if (age < 18) {
            errors.push('Debes ser mayor de 18 años para registrarte.');
          }
        }
      }
    }
    if (!formData.terms) {
      errors.push('Debes aceptar los términos y condiciones.');
    }
    // --- Fin de Validaciones ---

    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    // 4. SI LAS VALIDACIONES PASAN, LLAMAMOS AL BACKEND
    
    // Preparamos los datos para el RegisterDTO (solo name, email, password)
    const registerData = {
      name: username, // Mapeamos 'username' del form a 'name' del DTO
      email: email,
      password: password
    };

    try {
      // 5. LLAMAMOS AL ENDPOINT DE REGISTRO (PÚBLICO)
      // Ahora AUTH_URL tendrá la URL correcta de tu backend de Java
      const response = await axios.post(`${AUTH_URL}/register`, registerData);
      
      // El backend nos devuelve el token Y el rol (ROLE_ADMIN si es el primero)
      console.log('Respuesta de registro:', response.data); 

      // 6. Si todo es válido...
      alert(`¡Registro exitoso para ${username}! Serás redirigido para iniciar sesión.`);
      navigate('/login'); // Redirigimos al login

    } catch (error) {
      // 7. SI EL BACKEND DEVUELVE UN ERROR
      console.error("Error en el registro:", error);
      
      // AHORA SÍ VEREMOS ERRORES REALES DEL BACKEND
      if (error.response && (error.response.status === 500 || error.response.status === 400)) {
        // El 'RuntimeException("El email ya está en uso")' del backend llega como un error 500
         alert('Error al registrar: El correo electrónico ya está en uso.');
      } else if (error.code === "ERR_NETWORK") {
         alert('Error de red. ¿Está el backend de Java corriendo y accesible?');
      }
      else {
        alert('Ocurrió un error inesperado durante el registro.');
      }
    }
  };

  // --- TU JSX NO CAMBIA ---
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