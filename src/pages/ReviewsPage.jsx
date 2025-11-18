// src/pages/ReviewsPage.jsx
import { useState, useEffect } from 'react';

function ReviewsPage() {
  // Estado para la lista de todas las reseñas
  const [reseñas, setReseñas] = useState([]);
  
  // Estados para cada campo del formulario
  const [nombre, setNombre] = useState('');
  const [estrellas, setEstrellas] = useState('');
  const [comentario, setComentario] = useState('');

  // Cargar reseñas desde localStorage
  useEffect(() => {
    const reseñasGuardadas = localStorage.getItem('reseñas');
    if (reseñasGuardadas) {
      setReseñas(JSON.parse(reseñasGuardadas));
    }
  }, []);

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !estrellas || !comentario) {
      alert("⚠️ Completa todos los campos.");
      return;
    }

    const nuevaReseña = { nombre, estrellas: parseInt(estrellas), comentario };
    const nuevasReseñas = [...reseñas, nuevaReseña];

    // Actualizar el estado y localStorage
    setReseñas(nuevasReseñas);
    localStorage.setItem('reseñas', JSON.stringify(nuevasReseñas));

    // Limpiar el formulario
    setNombre('');
    setEstrellas('');
    setComentario('');
  };

  return (
    // --- CAMBIO CLAVE: Wrapper 'main-content' para diseño responsivo ---
    <div className="main-content">
      
      <section className="reseñas-container">
        <h1>Reseñas de Clientes</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Tu nombre</label>
          <input 
            type="text" 
            id="name" 
            placeholder="Ej: Carla" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            required 
          />

          <label htmlFor="rating">Calificación</label>
          <select 
            id="rating" 
            value={estrellas} 
            onChange={(e) => setEstrellas(e.target.value)} 
            required
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
          ></textarea>

          <button type="submit" className="btn">Enviar Reseña</button>
        </form>

        <section id="reviewsList">
          {reseñas.map((r, index) => (
            <article key={index} className="review-card">
              <h3>{r.nombre}</h3>
              <p className="stars">{'⭐'.repeat(r.estrellas)}</p>
              <p>"{r.comentario}"</p>
            </article>
          ))}
        </section>
      </section>
      
    </div>
  );
}

export default ReviewsPage;