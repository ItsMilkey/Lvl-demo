// src/App.jsx
import { useState } from 'react'; // 1. Importamos useState
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import ReviewsPage from './pages/ReviewsPage.jsx';
import ReferralsPage from './pages/ReferralsPage.jsx';
import CommunityPage from './pages/CommunityPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Admin from './pages/admin/Admin.jsx';
import Users from './pages/admin/users.jsx';
import Products from './pages/admin/products.jsx';
import AdminReviews from './pages/admin/reviews.jsx';
import AdminReferrals from './pages/admin/referrals.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import CartPage from './pages/CartPage.jsx';

function App() {
  const location = useLocation();
  
  // 2. Estado para saber si la barra está colapsada o expandida
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // 3. Definimos dónde OCULTAR la barra (Login y Registro). 
  // En Admin AHORA SÍ LA MOSTRAMOS porque es útil, y se puede colapsar si molesta.
  const hideNavbar = location.pathname === '/login' || location.pathname === '/registro';

  return (
    <div className="app-container">
      {/* Pasamos el estado y la función al Navbar */}
      {!hideNavbar && (
        <Navbar 
          isCollapsed={isSidebarCollapsed} 
          toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        />
      )}

      {/* El <main> calcula su margen dinámicamente:
         - Si no hay navbar: margen 0
         - Si está colapsada: margen 60px
         - Si está expandida: margen 220px
         
         Nota: En móviles, el CSS global con !important sobrescribe esto a 0 automáticamente.
      */}
      <main 
        className="main-content"
        style={{ 
            marginLeft: hideNavbar ? 0 : (isSidebarCollapsed ? '60px' : '220px'),
            width: hideNavbar ? '100%' : (isSidebarCollapsed ? 'calc(100% - 60px)' : 'calc(100% - 220px)')
        }}
      >
        <Routes>
          {/* --- Rutas Públicas --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/reseñas" element={<ReviewsPage />} />
          <Route path="/referidos" element={<ReferralsPage />} />
          <Route path="/comunidad" element={<CommunityPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* --- Rutas de Admin (SOLO ROLE_ADMIN) --- */}
          <Route 
            path="/admin" 
            element={<ProtectedRoute role="ROLE_ADMIN"><Admin /></ProtectedRoute>} 
          />
          <Route 
            path="/admin/users" 
            element={<ProtectedRoute role="ROLE_ADMIN"><Users /></ProtectedRoute>} 
          />
          <Route 
            path="/admin/products" 
            element={<ProtectedRoute role="ROLE_ADMIN"><Products /></ProtectedRoute>} 
          />
          <Route 
            path="/admin/reviews" 
            element={<ProtectedRoute role="ROLE_ADMIN"><AdminReviews /></ProtectedRoute>} 
          />
          <Route 
            path="/admin/referrals" 
            element={<ProtectedRoute role="ROLE_ADMIN"><AdminReferrals /></ProtectedRoute>} 
          />

          {/* --- Rutas de Usuario (Cualquier usuario logueado) --- */}
          <Route 
            path="/carrito" 
            element={<ProtectedRoute><CartPage /></ProtectedRoute>} 
          />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;