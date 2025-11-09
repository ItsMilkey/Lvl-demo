import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Página de administración de reseñas
function AdminReviews() {
  const navigate = useNavigate();
  const nameRef = useRef(null);

  const [reseñas, setReseñas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [estrellas, setEstrellas] = useState('');
  const [comentario, setComentario] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  // Cargar reseñas del localStorage
  useEffect(() => {
    const guardadas = localStorage.getItem('reseñas');
    if (guardadas) {
      try {
        const parsed = JSON.parse(guardadas);
        const normalized = parsed.map((r, i) => ({ id: r.id ?? Date.now() + i, ...r }));
        setReseñas(normalized);
        if (!parsed.every((r) => r.id)) {
          localStorage.setItem('reseñas', JSON.stringify(normalized));
        }
      } catch (e) {
        console.error('Error parseando reseñas desde localStorage', e);
      }
    }
  }, []);

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
  };

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
    <div
      className="main-content"
      style={{
        display: 'flex',
        justifyContent: 'flex-start', // mueve el contenido al inicio horizontal
        alignItems: 'flex-start',
        minHeight: '100vh',
        background: '#fffbea',
        paddingTop: '2rem', // sube un poco el contenido
        paddingLeft: '10rem', // mueve bastante hacia la derecha
      }}
    >
      {/* Botón Volver fijo */}
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

      {/* Contenedor central */}
      <section
        style={{
          background: '#fffdf0',
          border: '2px solid #000',
          borderRadius: '10px',
          padding: '2.5rem',
          width: '60%',
          minWidth: '700px',
          boxShadow: '4px 4px 8px rgba(0,0,0,0.15)',
          marginTop: '0.5rem', // lo sube más
          marginLeft: '5rem',  // ajuste fino extra a la derecha
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '1.8rem',
            marginBottom: '1.8rem',
          }}
        >
          ADMINISTRAR RESEÑAS
        </h1>

        {/* Botones principales */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '2rem',
          }}
        >
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
            style={{
              width: '100%',
              marginBottom: '1rem',
              padding: '8px',
              borderRadius: '6px',
              border: '2px solid #000',
              background: '#fffbea',
            }}
          />

          <label htmlFor="rating">Calificación</label>
          <select
            id="rating"
            value={estrellas}
            onChange={(e) => setEstrellas(e.target.value)}
            required
            style={{
              width: '100%',
              marginBottom: '1rem',
              padding: '8px',
              borderRadius: '6px',
              border: '2px solid #000',
              background: '#fffbea',
            }}
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
            style={{
              width: '100%',
              marginBottom: '1rem',
              padding: '8px',
              borderRadius: '6px',
              border: '2px solid #000',
              background: '#fffbea',
            }}
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
                  <p style={{ margin: '0.4rem 0 0', color: '#666' }}>
                    {'⭐'.repeat(r.estrellas)}
                  </p>
                  <p style={{ margin: '0.4rem 0 0', color: '#333' }}>
                    &quot;{r.comentario}&quot;
                  </p>
                </div>
                {selectedId === r.id && (
                  <span style={{ color: '#25d366', fontSize: '1.2rem' }}>✓</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default AdminReviews;
