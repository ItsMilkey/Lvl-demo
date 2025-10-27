// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import ReviewsPage from './pages/ReviewsPage.jsx';
import ReferralsPage from './pages/ReferralsPage.jsx';
import CommunityPage from './pages/CommunityPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import CartPage from './pages/CartPage.jsx';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      {/* Se añade el contenedor <main> para asegurar el layout correcto */}
      <main className="main-content">
        <Routes>
          {/* --- Rutas Públicas --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/reseñas" element={<ReviewsPage />} />
          <Route path="/referidos" element={<ReferralsPage />} />
          <Route path="/comunidad" element={<CommunityPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/carrito" element={<CartPage />} />

          {/* --- Ruta Protegida --- */}
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