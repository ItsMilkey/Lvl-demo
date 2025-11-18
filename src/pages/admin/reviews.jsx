// src/pages/admin/reviews.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Página de administración de reseñas (SOLO VISUAL / LOCALSTORAGE)
function AdminReviews() {
  const navigate = useNavigate();
  const nameRef = useRef(null);

  const [reseñas, setReseñas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [estrellas, setEstrellas] = useState('');
  const [comentario, setComentario] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  // Cargar reseñas del localStorage al iniciar
  useEffect(() => {
    const guardadas = localStorage.getItem('reseñas');
    if (guardadas) {
      try {
        const parsed = JSON.parse(guardadas);
        // Normalizamos para asegurar que tengan ID
        const normalized = parsed.map((r, i) => ({ id: r.id ?? Date.now() + i, ...r }));
        setReseñas(normalized);
      } catch (e) {
        console.error('Error parseando reseñas desde localStorage', e);
      }
    }
  }, []);

  // Guardar nueva reseña (Local)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !estrellas || !comentario) {
      alert('⚠️ Completa todos los campos.');
      return;
    }

    const nueva = { id: Date.now(), nombre, estrellas: parseInt(estrellas), comentario };
    const nuevas = [...reseñas, nueva];
    
    setReseñas(nuevas);
    localStorage.setItem('reseñas', JSON.stringify(nuevas));

    setNombre('');
    setEstrellas('');
    setComentario('');
    alert('Reseña agregada localmente.');
  };

  // Eliminar reseña (Local)
  const handleDeleteClick = () => {
    if (!selectedId) {
      alert('Selecciona una reseña para eliminar');
      return;
    }
    const filtradas = reseñas.filter((r) => r.id !== selectedId);
    setReseñas(filtradas);
    localStorage.setItem('reseñas', JSON.stringify(filtradas));
    setSelectedId(null);
    alert('Reseña eliminada.');
  };

  const handleSelect = (id) => {
    setSelectedId(id === selectedId ? null : id);
  };

  return (
    // --- 1. Wrapper responsivo (main-content) ---
    <div className="main-content">

      {/* --- 2. Botón Volver flexible --- */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button
          onClick={() => navigate(-1)}
          className="btn"
          style={{
            background: '#f7e8a9',
            color: '#333',
            border: '2px solid #000',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Volver
        </button>
      </div>

      {/* --- 3. Sección responsiva (responsive-section) --- */}
      <section className="responsive-section" style={{ maxWidth: '800px' }}>
        
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.8rem', marginBottom: '1.8rem' }}>
          ADMINISTRAR RESEÑAS
        </h1>

        {/* Botones principales */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <button
            onClick={handleSubmit}
            type="button"
            style={{
              background: '#25d366',
              border: '2px solid #000',
              color: '#fff',
              fontWeight: 'bold',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Enviar Reseña
          </button>

          <button
            onClick={handleDeleteClick}
            style={{
              background: '#d32f2f',
              border: '2px solid #000',
              color: '#fff',
              fontWeight: 'bold',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Eliminar
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
          <label htmlFor="name">Tu nombre</label>
          <input
            ref={nameRef}
            type="text"
            id="name"
            placeholder="Ej: Carla"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '1rem', padding: '8px', borderRadius: '6px', border: '2px solid #000', background: '#fffbea' }}
          />

          <label htmlFor="rating">Calificación</label>
          <select
            id="rating"
            value={estrellas}
            onChange={(e) => setEstrellas(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '1rem', padding: '8px', borderRadius: '6px', border: '2px solid #000', background: '#fffbea' }}
          >
            <option value="">Selecciona ⭐</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="2">⭐⭐</option>
            <option value="1">⭐</option>
          </select>

          <label htmlFor="comment">Tu reseña</label>
          <textarea
            id="comment"
            rows="3"
            placeholder="Escribe tu experiencia..."
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '1rem', padding: '8px', borderRadius: '6px', border: '2px solid #000', background: '#fffbea' }}
          ></textarea>
        </form>

        {/* Lista de reseñas */}
        <div
          style={{
            background: '#fdf6d9',
            borderRadius: '10px',
            border: '2px solid #000',
            overflow: 'hidden',
          }}
        >
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {reseñas.length === 0 ? (
                <li style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>No hay reseñas aún.</li>
            ) : (
                reseñas.map((r) => (
                <li
                    key={r.id}
                    onClick={() => handleSelect(r.id)}
                    style={{
                    padding: '1rem',
                    cursor: 'pointer',
                    borderBottom: '2px solid #000',
                    background: selectedId === r.id ? '#ffe680' : '#fdf6d9',
                    transition: 'background 0.15s ease',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    }}
                >
                    <div>
                    <h3 style={{ margin: 0, color: '#333', fontSize: '1.1rem' }}>{r.nombre}</h3>
                    <p style={{ margin: '0.4rem 0 0', color: '#666' }}>
                        {'⭐'.repeat(r.estrellas)}
                    </p>
                    <p style={{ margin: '0.4rem 0 0', color: '#333', fontStyle: 'italic' }}>
                        &quot;{r.comentario}&quot;
                    </p>
                    </div>
                    {selectedId === r.id && (
                    <span style={{ color: '#25d366', fontSize: '1.5rem', fontWeight: 'bold' }}>✓</span>
                    )}
                </li>
                ))
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default AdminReviews;