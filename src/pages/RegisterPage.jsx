// src/pages/RegisterPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

  // Helpers de validación
  const isValidEmail = (email) => {
    // RFC-like simple regex (no perfecta pero suficiente para validación básica)
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isStrongPassword = (pwd) => {
    // Al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(pwd);
  };

  const isValidUsername = (u) => {
    // 3-20 chars, letras, números y guion bajo
    return /^[a-zA-Z0-9_]{3,20}$/.test(u);
  };

  // Manejador para actualizar el estado cuando el usuario escribe
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  // Manejador para el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Recolectar errores para mostrarlos todos juntos en una alerta en español
    const errors = [];

    const username = (formData.username || '').trim();
    const email = (formData.email || '').trim().toLowerCase();
    const password = formData.password || '';
    const confirmPassword = formData.confirmPassword || '';
    const birthdate = formData.birthdate;

    // Validaciones de usuario
    if (!username) {
      errors.push('El usuario es obligatorio.');
    } else if (!isValidUsername(username)) {
      errors.push('El usuario debe tener entre 3 y 20 caracteres y solo puede contener letras, números y guion bajo (_).');
    }

    // Validación de email
    if (!email) {
      errors.push('El correo electrónico es obligatorio.');
    } else if (!isValidEmail(email)) {
      errors.push('El correo electrónico no tiene un formato válido.');
    }

    // Validación de contraseñas
    if (!password) {
      errors.push('La contraseña es obligatoria.');
    }
    if (password !== confirmPassword) {
      errors.push('Las contraseñas no coinciden.');
    }
    if (password && !isStrongPassword(password)) {
      errors.push('La contraseña debe tener al menos 8 caracteres e incluir mayúsculas, minúsculas, números y caracteres especiales.');
    }

    // Validación fecha de nacimiento
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

    // Términos
    if (!formData.terms) {
      errors.push('Debes aceptar los términos y condiciones.');
    }

    if (errors.length > 0) {
      // Mostrar todas las validaciones fallidas en una sola alerta en español
      alert(errors.join('\n'));
      return;
    }

    // Si todo es válido...
    alert(`¡Registro exitoso para ${username}! Serás redirigido para iniciar sesión.`);
    // Aquí normalmente enviaríamos los datos al servidor. Por ahora, simulamos y redirigimos.
    navigate('/login');
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