// src/pages/ReferralsPage.jsx
import { useState, useEffect } from 'react';

function ReferralsPage() {
  // Estado para guardar los puntos del usuario
  const [puntos, setPuntos] = useState(0);
  // Estado para controlar el valor del input del formulario
  const [codigo, setCodigo] = useState('');

  // Cargar los puntos desde localStorage cuando el componente se monta
  useEffect(() => {
    const puntosGuardados = localStorage.getItem('puntosLevelUp');
    if (puntosGuardados) {
      setPuntos(parseInt(puntosGuardados, 10));
    }
  }, []);

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (codigo.trim() === '') {
      alert('⚠️ Ingresa un código de referido válido.');
      return;
    }

    // Lógica simple: cualquier código da 50 puntos
    const nuevosPuntos = puntos + 50;
    setPuntos(nuevosPuntos);
    localStorage.setItem('puntosLevelUp', nuevosPuntos);

    alert(`✅ Código aplicado. Has ganado 50 puntos LevelUp.\nTotal: ${nuevosPuntos} puntos`);
    setCodigo(''); // Limpiar el input después de enviarlo
  };

  return (
    // --- CAMBIO CLAVE: Envolvemos todo en "main-content" para que sea responsivo ---
    <div className="main-content">
      
      <section className="reseñas-container"> {/* Reutilizamos este contenedor */}
        <h1>Programa de Referidos</h1>
        <p>Invita a tus amigos a unirse a LvL-UP Gamer y gana puntos por cada registro exitoso.</p>

        {/* Reutilizamos el estilo del formulario de reseñas */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="referralCode">Ingresa un código de referido</label>
          <input
            type="text"
            id="referralCode"
            placeholder="Ej: ABC123"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
          />
          <button type="submit" className="btn">Aplicar Código</button>
        </form>

        {/* Sección para mostrar los puntos */}
        <section className="points-display">
          <h2>🎮 Tus Recompensas</h2>
          <p>Puntos acumulados: <span>{puntos}</span></p>
          <p>Nivel: <span>{puntos < 150 ? 'Bronce' : 'Plata'}</span></p>
        </section>

        {/* Beneficios del programa */}
        <section className="benefits-list">
          <h2>Beneficios del programa</h2>
          <ul>
            <li>✔️ Obtén puntos por cada amigo referido.</li>
            <li>✔️ Canjea puntos por descuentos en productos.</li>
            <li>✔️ Sube de nivel y desbloquea recompensas exclusivas.</li>
          </ul>
        </section>
      </section>

    </div>
  );
}

export default ReferralsPage;