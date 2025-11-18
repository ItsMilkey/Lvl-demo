// src/pages/admin/reviews.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 1. Configuración de API y Auth
const API_URL = import.meta.env.VITE_API_URL + '/api/reviews';

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) return {};
  return { headers: { Authorization: `Bearer ${token}` } };
};

function AdminReviews() {
  const navigate = useNavigate();
  const nameRef = useRef(null);

  // Estados
  const [reseñas, setReseñas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [estrellas, setEstrellas] = useState('');
  const [comentario, setComentario] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  // 2. Cargar reseñas desde el Backend (GET es público)
  const fetchReviews = async () => {
    try {
      const response = await axios.get(API_URL);
      setReseñas(response.data);
    } catch (error) {
      console.error('Error al cargar reseñas:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // 3. Crear Reseña (Requiere Admin)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !estrellas || !comentario) {
      alert('⚠️ Completa todos los campos.');
      return;
    }

    const nuevaReseña = { 
      nombre, 
      estrellas: parseInt(estrellas), 
      comentario 
    };

    try {
      await axios.post(API_URL, nuevaReseña, getAuthHeaders());
      alert('Reseña agregada exitosamente');
      
      // Limpiar y recargar
      setNombre('');
      setEstrellas('');
      setComentario('');
      fetchReviews();
    } catch (error) {
      console.error("Error al crear reseña:", error);
      alert("Error: No se pudo guardar. Verifica permisos.");
    }
  };

  // 4. Eliminar Reseña (Requiere Admin)
  const handleDeleteClick = async () => {
    if (!selectedId) {
      alert('Selecciona una reseña para eliminar');
      return;
    }

    try {
      await axios.delete(`${API_URL}/${selectedId}`, getAuthHeaders());
      alert('Reseña eliminada');
      setSelectedId(null);
      fetchReviews();
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Error: No se pudo eliminar.");
    }
  };

  const handleSelect = (id) => {
    setSelectedId(id === selectedId ? null : id);
  };

  return (
    // --- CAMBIO 1: Wrapper responsivo ---
    <div className="main-content">
      
      {/* --- CAMBIO 2: Botón Volver flexible --- */}
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

      {/* --- CAMBIO 3: Sección responsiva --- */}
      <section className="responsive-section" style={{ maxWidth: '800px' }}> {/* Un poco más angosto para lectura */}
        
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.8rem', marginBottom: '1.8rem' }}>
          ADMINISTRAR RESEÑAS
        </h1>

        {/* Botones principales */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <button onClick={handleSubmit} type="button" style={{ background: '#25d366', border: '2px solid #000', color: '#fff', fontWeight: 'bold', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>
            Enviar Reseña
          </button>

          <button onClick={handleDeleteClick} style={{ background: '#d32f2f', border: '2px solid #000', color: '#fff', fontWeight: 'bold', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>
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
        <div style={{ background: '#fdf6d9', borderRadius: '10px', border: '2px solid #000', overflow: 'hidden' }}>
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
                    <p style={{ margin: '0.4rem 0 0', color: '#666' }}>{'⭐'.repeat(r.estrellas)}</p>
                    <p style={{ margin: '0.4rem 0 0', color: '#333', fontStyle: 'italic' }}>&quot;{r.comentario}&quot;</p>
                    </div>
                    {selectedId === r.id && <span style={{ color: '#25d366', fontSize: '1.5rem', fontWeight: 'bold' }}>✓</span>}
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