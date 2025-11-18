// src/pages/admin/referrals.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/api/referrals';

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) return {};
  return { headers: { Authorization: `Bearer ${token}` } };
};

function AdminReferrals() {
  const navigate = useNavigate();
  const [codigos, setCodigos] = useState([]);
  const [nuevoCodigo, setNuevoCodigo] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [benefitsText, setBenefitsText] = useState('');
  const [isEditingBenefits, setIsEditingBenefits] = useState(false);

  const fetchCodes = async () => {
    try {
      const response = await axios.get(API_URL, getAuthHeaders());
      setCodigos(response.data);
    } catch (error) {
      console.error('Error al cargar los códigos:', error);
      setCodigos([]);
    }
  };

  useEffect(() => {
    fetchCodes();
    const storedBenefits = localStorage.getItem('benefitsText');
    if (storedBenefits) setBenefitsText(storedBenefits);
    else
      setBenefitsText(
        '✔️ Obtén puntos por cada amigo referido.\n✔️ Canjea puntos por descuentos en productos.\n✔️ Sube de nivel y desbloquea recompensas exclusivas.'
      );
  }, []);

  useEffect(() => {
    localStorage.setItem('benefitsText', benefitsText);
  }, [benefitsText]);

  const handleAddCode = async (e) => {
    e.preventDefault();
    if (nuevoCodigo.trim() === '') {
      alert('⚠️ Ingresa un código válido.');
      return;
    }

    const codeToSend = { codigo: nuevoCodigo.trim().toUpperCase() };

    try {
      await axios.post(API_URL, codeToSend, getAuthHeaders());
      setNuevoCodigo('');
      fetchCodes();
      alert('Código agregado exitosamente.');
    } catch (error) {
      console.error('Error al agregar el código:', error);
      alert('No se pudo guardar el código.');
    }
  };

  const handleDelete = async () => {
    if (!selectedId) {
      alert('Selecciona un código para eliminar.');
      return;
    }

    try {
      await axios.delete(`${API_URL}/${selectedId}`, getAuthHeaders());
      setSelectedId(null);
      fetchCodes();
      alert('Código eliminado exitosamente.');
    } catch (error) {
      console.error('Error al eliminar el código:', error);
      alert('No se pudo eliminar el código.');
    }
  };

  const handleSelect = (id) => {
    setSelectedId(id === selectedId ? null : id);
  };

  return (
    // --- CAMBIO CLAVE: Usamos 'main-content' ---
    <div className="main-content">
      
      {/* Botón Volver Flexible */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button
            onClick={() => navigate(-1)}
            className="btn"
            style={{
            background: '#f7e8a9',
            color: '#333',
            border: '2px solid #000',
            zIndex: 1000,
            cursor: 'pointer',
            fontWeight: 'bold'
            }}
        >
            Volver
        </button>
      </div>

      {/* Usamos 'responsive-section' del CSS global */}
      <section className="responsive-section">
        <h1
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '1.8rem',
            marginBottom: '2rem',
          }}
        >
          ADMINISTRAR REFERIDOS
        </h1>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}
        >
          <button
            onClick={handleAddCode}
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
            Agregar Código
          </button>

          <button
            onClick={handleDelete}
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

        <form onSubmit={handleAddCode} style={{ marginBottom: '2rem' }}>
          <label htmlFor="newCode">Nuevo Código</label>
          <input
            type="text"
            id="newCode"
            placeholder="Ej: LVLUP123"
            value={nuevoCodigo}
            onChange={(e) => setNuevoCodigo(e.target.value)}
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
        </form>

        <div
          style={{
            background: '#fdf6d9',
            borderRadius: '10px',
            border: '2px solid #000',
            overflow: 'hidden',
            marginBottom: '2rem',
          }}
        >
          <h2 style={{ textAlign: 'center', padding: '1rem 0', borderBottom: '2px solid #000' }}>
            Códigos Activos
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {codigos.length === 0 ? (
              <li style={{ textAlign: 'center', padding: '1rem', color: '#555' }}>
                No hay códigos activos
              </li>
            ) : (
              codigos.map((c) => (
                <li
                  key={c.id}
                  onClick={() => handleSelect(c.id)}
                  style={{
                    padding: '1rem',
                    borderBottom: '2px solid #000',
                    background: selectedId === c.id ? '#ffe680' : '#fdf6d9',
                    cursor: 'pointer',
                    transition: 'background 0.15s ease',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  {c.codigo}
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Sección de beneficios */}
        <section
          style={{
            background: '#fffcea',
            border: '2px solid #000',
            borderRadius: '10px',
            padding: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0 }}>Beneficios del programa</h2>
            <button
              onClick={() => setIsEditingBenefits(!isEditingBenefits)}
              style={{
                background: isEditingBenefits ? '#25d366' : '#f7e8a9',
                border: '2px solid #000',
                borderRadius: '8px',
                padding: '5px 12px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              {isEditingBenefits ? 'Guardar' : 'Editar'}
            </button>
          </div>

          {isEditingBenefits ? (
            <textarea
              value={benefitsText}
              onChange={(e) => setBenefitsText(e.target.value)}
              rows="6"
              style={{
                width: '100%',
                marginTop: '1rem',
                padding: '10px',
                border: '2px solid #000',
                borderRadius: '8px',
                background: '#fffbea',
                fontFamily: 'inherit',
                whiteSpace: 'pre-line',
              }}
            />
          ) : (
            <ul
              style={{
                marginTop: '1rem',
                lineHeight: '1.6',
                whiteSpace: 'pre-line',
                color: '#333',
              }}
            >
              {benefitsText.split('\n').map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          )}
        </section>
      </section>
    </div>
  );
}

export default AdminReferrals;