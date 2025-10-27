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

    // Validar usuario
    if (formData.username.length < 3) {
      alert("El usuario debe tener al menos 3 caracteres.");
      return;
    }
    // Validar contraseñas
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    if (formData.password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    // Validar fecha de nacimiento (+18)
    if (!formData.birthdate) {
      alert("Por favor ingresa tu fecha de nacimiento.");
      return;
    }
    const birth = new Date(formData.birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    if (age < 18) {
      alert("Debes ser mayor de 18 años para registrarte.");
      return;
    }
    // Validar términos
    if (!formData.terms) {
      alert("Debes aceptar los términos y condiciones.");
      return;
    }

    // Si todo es válido...
    alert(`¡Registro exitoso para ${formData.username}! Serás redirigido para iniciar sesión.`);
    
    // Aquí guardaríamos el usuario en una base de datos. Por ahora, lo simulamos.
    // Y redirigimos al usuario a la página de login.
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
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