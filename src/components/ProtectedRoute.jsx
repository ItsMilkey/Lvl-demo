// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // Verificamos si hay un usuario activo en localStorage
  const usuario = localStorage.getItem('usuarioActivo');

  if (!usuario) {
    // Si no hay usuario, redirigimos a la página de login
    return <Navigate to="/login" replace />;
  }

  // Si hay un usuario, mostramos el componente que debe proteger (los hijos)
  return children;
}

export default ProtectedRoute;