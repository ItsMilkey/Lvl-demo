// src/pages/CommunityPage.jsx

function CommunityPage() {
  return (
    <>
      <header className="topbar">
        <h1>Comunidad LvL-UP</h1>
      </header>

      {/* Quiénes somos */}
      <section className="highlight-card">
        <h2>Quiénes somos</h2>
        <p>En <strong>LvL-UP Gamer</strong> creemos que el gaming es más que jugar: es comunidad, amistad y pasión. Nos unimos para compartir experiencias, aprender y crecer como gamers.</p>
      </section>

      {/* Mapa de la tienda */}
      <section className="highlight-card">
        <h2>📍 Ubicación: LvL Up Geek Store</h2>
        <p>Visítanos en Curicó y participa de eventos gamer donde podrás ganar puntos <strong>LvL-UP</strong>.</p>
        
        <iframe
          title="Mapa de LvL Up Geek Store"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3303.528622171128!2d-71.2415186847834!3d-34.9822609803909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x966457d5ef555555%3A0x1d7c3b0d5f5e5e5!2sLvl%20Up%20Geek%20Store!5e0!3m2!1ses-419!2scl!4v1670000000000!5m2!1ses-419!2scl" // <-- URL CORREGIDA
          width="100%"
          height="350"
          style={{ border: '2px solid #2c2c2c', borderRadius: '10px' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>

        <div className="map-btn">
          <a href="https://maps.app.goo.gl/u1Z2Y3X4Z5A6B7C8A" // <-- URL CORREGIDA
             target="_blank" 
             rel="noopener noreferrer" 
             className="btn">
            📌 Cómo llegar
          </a>
        </div>
      </section>

      {/* Impacto en la comunidad */}
      <section className="highlight-card">
        <h2>🌍 Impacto en la Comunidad</h2>
        <p>Con cada compra apoyas proyectos solidarios. Hemos donado +500 consolas a escuelas rurales y organizado talleres de programación para jóvenes.</p>
      </section>

      {/* Sección Noticias Gamer */}
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

      {/* Sección Tips Gamer */}
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
    </>
  );
}

export default CommunityPage;