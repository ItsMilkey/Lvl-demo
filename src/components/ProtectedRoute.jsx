// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

/**
 * Componente de Ruta Protegida.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - El componente a renderizar si se cumplen las condiciones.
 * @param {string} [props.role] - El rol específico (ej. "ROLE_ADMIN") requerido para acceder a esta ruta.
 * Si no se proporciona, solo se verifica la autenticación.
 */
function ProtectedRoute({ children, role }) {
  
  // 1. Obtenemos el token y el rol del localStorage
  // (Estos son los items que guardamos en LoginPage)
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  // 2. ¿El usuario NO está logueado?
  // Si no hay token, lo mandamos a /login sin importar qué.
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 3. ¿La ruta requiere un rol específico (ej. "ROLE_ADMIN")?
  if (role) {
    // 4. Si la ruta requiere un rol, ¿el usuario NO tiene ese rol?
    // Si la ruta es para "ROLE_ADMIN" y el usuario es "ROLE_USER"...
    if (userRole !== role) {
      // ...lo mandamos al inicio (o a una página "No Autorizado").
      // No tiene permiso.
      return <Navigate to="/" replace />;
    }
  }

  // 5. Si el usuario está logueado (pasó el check 2)
  // Y (si la ruta lo requiere) tiene el rol correcto (pasó el check 4)...
  // ...le mostramos el componente (ej. <Admin /> o <ProfilePage />).
  return children;
}

export default ProtectedRoute;