// src/pages/ReferralsPage.jsx
import { useState, useEffect } from 'react';
import axios from 'axios'; // 1. Importamos Axios

// 2. URL de la API (La misma que usa el Admin)
const API_URL = import.meta.env.VITE_API_URL + '/api/referrals';

function ReferralsPage() {
  const [puntos, setPuntos] = useState(0);
  const [codigo, setCodigo] = useState('');

  // Cargar puntos locales al iniciar
  useEffect(() => {
    const puntosGuardados = localStorage.getItem('puntosLevelUp');
    if (puntosGuardados) {
      setPuntos(parseInt(puntosGuardados, 10));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const codigoInput = codigo.trim().toUpperCase();

    if (codigoInput === '') {
      alert('⚠️ Ingresa un código válido.');
      return;
    }

    try {
      // 3. CONEXIÓN AL BACKEND: Pedimos la lista de códigos válidos
      // (GET /api/referrals es público en tu SecurityConfig, así que no requiere token)
      const response = await axios.get(API_URL);
      const codigosValidos = response.data; // Array de objetos de la BD

      // 4. VERIFICACIÓN: Buscamos si el código ingresado existe en la BD
      const codigoEncontrado = codigosValidos.find(c => c.codigo === codigoInput);

      if (codigoEncontrado) {
        // ¡ÉXITO! El código existe en Oracle
        const nuevosPuntos = puntos + 50;
        setPuntos(nuevosPuntos);
        localStorage.setItem('puntosLevelUp', nuevosPuntos);
        
        alert(`✅ ¡Código ${codigoInput} canjeado! Has ganado 50 puntos.`);
        setCodigo(''); 
      } else {
        // ERROR: El código no está en la base de datos
        alert('❌ Este código no es válido o ha expirado.');
      }

    } catch (error) {
      console.error("Error al verificar código:", error);
      alert('Error de conexión con el servidor.');
    }
  };

  return (
    // Usamos 'main-content' para que se ajuste al sidebar automáticamente
    <div className="main-content content-centered">
        
      <section className="reseñas-container" style={{maxWidth: '800px', width: '100%'}}>
        <h1>Programa de Referidos</h1>
        <p>Invita a tus amigos a unirse a LvL-UP Gamer y gana puntos por cada registro exitoso.</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="referralCode">Ingresa un código de referido</label>
          <input
            type="text"
            id="referralCode"
            placeholder="Ej: LVLUP2024"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
          />
          <button type="submit" className="btn">Aplicar Código</button>
        </form>

        <section className="points-display">
          <h2>🎮 Tus Recompensas</h2>
          <p>Puntos acumulados: <span>{puntos}</span></p>
          <p>Nivel: <span>{puntos < 150 ? 'Bronce' : 'Plata'}</span></p>
        </section>

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