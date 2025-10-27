// src/pages/HomePage.jsx
import { Link } from 'react-router-dom';

function HomePage() {
  // Verificamos si hay un usuario activo en localStorage
  const usuarioActivo = localStorage.getItem('usuarioActivo');
  // El enlace del perfil cambia dependiendo de si la sesión está iniciada
  const linkPerfil = usuarioActivo ? '/perfil' : '/login';

  return (
    <main className="main-content">
      {/* Topbar */}
      <header className="topbar">
        <input type="text" placeholder="Buscar..." />
        <div className="actions">
          {/* Enlace del carrito preparado para la siguiente página */}
          <Link to="/carrito" className="carrito-icon">
            <img src="/assets/carrito.png" alt="Carrito" />
          </Link>
          
          {/* Enlace del avatar ahora es dinámico */}
          <Link to={linkPerfil} className="user-menu">
            <img src="/assets/avatar.png" alt="Usuario" className="avatar" />
          </Link>
        </div>
      </header>

      {/* --- El resto del contenido de la página sigue igual --- */}
      
      {/* Sección de bienvenida */}
      <section className="highlight">
        <h1>Bienvenido/a</h1>
        <div className="cards">
          <div className="card">
            <h3>Producto destacado</h3>
            <p>Un vistazo rápido de nuestros productos más vendidos.</p>
            <img src="/assets/productos/ps5.png" alt="destactado" />
            <Link to="/productos" className="btn">Ver más</Link>
          </div>
          <div className="card">
            <h3>Programa de referidos</h3>
            <p>Invita amigos y gana recompensas exclusivas.</p>
            <img src="/assets/referidos.png" alt="referidos" />
            <Link to="/referidos" className="btn">Unirse</Link>
          </div>
          <div className="card">
            <h3>Impacto en la comunidad</h3>
            <p>Conoce cómo estamos transformando vidas.</p>
            <img src="/assets/comunidad.png" alt="Comunidad" />
            <Link to="/comunidad" className="btn">Ver más</Link>
          </div>
        </div>
      </section>

      {/* Noticias Gamer */}
      <section className="categories">
        <h2>📰 Noticias Gamer</h2>
        <div className="category-grid">
          <div className="category-card">
            <h3>Torneo Nacional eSports 2025</h3>
            <p>¡Se vienen clasificatorias en todo Chile! Gana premios y puntos LvL-UP.</p>
            <img src="/assets/noticias/torneoSports.jpg" alt="Torneo eSports" />
          </div>
          <div className="category-card">
            <h3>Nueva actualización: Minecraft VR</h3>
            <p>Explora mundos en realidad virtual con gráficos optimizados.</p>
            <img src="/assets/noticias/minecraftVR.jpeg" alt="Minecraft VR" />
          </div>
          <div className="category-card">
            <h3>Game Jam Solidaria</h3>
            <p>Desarrolladores chilenos se unen para crear juegos con impacto social.</p>
            <img src="/assets/noticias/game_jam.png" alt="Game Jam" />
          </div>
        </div>
      </section>

      {/* Tips gamer */}
      <section className="categories">
        <h2>🎮 Tips para tu Setup Gamer</h2>
        <div className="category-grid">
          <div className="category-card">
            <h3>Iluminación LED para concentración</h3>
            <p>La iluminación correcta mejora el ambiente y reduce la fatiga visual.</p>
            <img src="/assets/tips/iluminacionLed.webp" alt="Iluminación LED" />
          </div>
          <div className="category-card">
            <h3>Sillas ergonómicas = sesiones más largas</h3>
            <p>Invierte en postura y soporte lumbar para evitar molestias.</p>
            <img src="/assets/tips/sillaErgonomica.png" alt="Silla ergonómica" />
          </div>
          <div className="category-card">
            <h3>Optimiza tu internet con cableado LAN</h3>
            <p>El cable garantiza menor latencia y estabilidad frente al Wi-Fi.</p>
            <img src="/assets/tips/cableLan.webp" alt="Cable LAN" />
          </div>
          <div className="category-card">
            <h3>Monitores con 144 Hz para fluidez total</h3>
            <p>Mayor tasa de refresco significa frames más suaves y mejor respuesta.</p>
            <img src="/assets/tips/monitores.jpeg" alt="Monitor 144Hz" />
          </div>
        </div>
      </section>

      {/* Botón flotante WhatsApp */}
      <div className="whatsapp-container">
        <span className="whatsapp-msg">¿Necesitas ayuda?</span>
        <a href="https://wa.me/56978822701" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
          <img src="/assets/wspLogo.png" alt="Soporte Técnico" />
        </a>
      </div>
    </main>
  );
}

export default HomePage;