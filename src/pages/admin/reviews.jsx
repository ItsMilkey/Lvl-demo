import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Página de administración de reseñas (sin navbar)
function AdminReviews() {
  const navigate = useNavigate();
  const nameRef = useRef(null);

  // Lista de reseñas (persistida en localStorage con la misma clave que ReviewsPage)
  const [reseñas, setReseñas] = useState([]);

  // Campos del formulario
  const [nombre, setNombre] = useState('');
  const [estrellas, setEstrellas] = useState('');
  const [comentario, setComentario] = useState('');

  // id de la reseña seleccionada para acciones (editar / eliminar)
  const [selectedId, setSelectedId] = useState(null);

  // Cargar reseñas desde localStorage (añadir id si falta)
  useEffect(() => {
    const guardadas = localStorage.getItem('reseñas');
    if (guardadas) {
      try {
        const parsed = JSON.parse(guardadas);
        // Normalizar para asegurarnos que cada reseña tenga un id
        const normalized = parsed.map((r, i) => ({ id: r.id ?? Date.now() + i, ...r }));
        setReseñas(normalized);
        // Si alguna reseña no tenía id, resave para mantener consistencia
        if (!parsed.every((r) => r.id)) {
          localStorage.setItem('reseñas', JSON.stringify(normalized));
        }
      } catch (e) {
        console.error('Error parseando reseñas desde localStorage', e);
      }
    }
  }, []);

  // Enviar formulario (añadir reseña nueva)
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

    // limpiar
    setNombre('');
    setEstrellas('');
    setComentario('');
  };

  // Eliminar la reseña seleccionada
  const handleDeleteClick = () => {
    if (!selectedId) {
      alert('Selecciona una reseña para eliminar');
      return;
    }
    const filtradas = reseñas.filter((r) => r.id !== selectedId);
    setReseñas(filtradas);
    localStorage.setItem('reseñas', JSON.stringify(filtradas));
    setSelectedId(null);
  };

  const handleSelect = (id) => {
    setSelectedId(id === selectedId ? null : id);
  };

  return (
    <div className="main-content">
      {/* Botón Volver fijo en esquina superior derecha */}
      <button
        onClick={() => navigate(-1)}
        className="btn"
        style={{
          position: 'fixed',
          top: '16px',
          right: '16px',
          background: '#f7e8a9',
          color: '#333',
          border: '2px solid #000',
          zIndex: 1000,
        }}
      >
        Volver
      </button>

      <section style={{ padding: '3rem', paddingLeft: '20rem' }}>
        <div style={{ maxWidth: '900px', width: '100%', margin: 0 }}>
          <h1 style={{ marginBottom: '1.5rem' }}>Reseñas (Administración)</h1>

          {/* Botones centrales: Enviar (verde) y Eliminar (rojo) */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <button
              onClick={handleSubmit}
              type="button"
              className="btn"
              style={{ background: '#25d366', border: '2px solid #000' }}
            >
              Enviar Reseña
            </button>
            <button
              onClick={handleDeleteClick}
              className="btn"
              style={{ background: '#d32f2f', border: '2px solid #000' }}
            >
              Eliminar
            </button>
          </div>

          {/* Formulario (igual que ReviewsPage) */}
          <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="name">Tu nombre</label>
            <input
              ref={nameRef}
              type="text"
              id="name"
              placeholder="Ej: Carla"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />

            <label htmlFor="rating">Calificación</label>
            <select id="rating" value={estrellas} onChange={(e) => setEstrellas(e.target.value)} required>
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
            ></textarea>

            {/* submit moved to central buttons */}
          </form>

          {/* Lista de reseñas (items seleccionables) */}
          <div style={{ background: '#fdf6d9', borderRadius: '10px', border: '2px solid #000', overflow: 'hidden' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {reseñas.map((r) => (
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
                    <h3 style={{ margin: 0, color: '#333' }}>{r.nombre}</h3>
                    <p style={{ margin: '0.4rem 0 0', color: '#666' }}>{'⭐'.repeat(r.estrellas)}</p>
                    <p style={{ margin: '0.4rem 0 0', color: '#333' }}>&quot;{r.comentario}&quot;</p>
                  </div>
                  {selectedId === r.id && <span style={{ color: '#25d366', fontSize: '1.2rem' }}>✓</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminReviews;
