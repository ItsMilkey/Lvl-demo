// src/pages/HistoryPage.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL + '/api/ventas/historial';

function HistoryPage() {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(price);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString("es-CL", options);
  };

  useEffect(() => {
    const fetchHistorial = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert("Debes iniciar sesión para ver tu historial");
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setVentas(response.data);
      } catch (error) {
        console.error("Error al obtener historial:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistorial();
  }, [navigate]);

  return (
    <div className="main-content">
      <div className="content-centered">
        <section className="responsive-section">
          <h1 style={{textAlign: 'center', marginBottom: '2rem'}}>📜 Mis Compras</h1>

          {loading ? (
            <p style={{textAlign: 'center'}}>Cargando historial...</p>
          ) : ventas.length === 0 ? (
            <div style={{textAlign: 'center', padding: '2rem'}}>
              <p>Aún no has realizado ninguna compra.</p>
            </div>
          ) : (
            <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
              {ventas.map((venta) => (
                <div key={venta.id} style={{
                    border: '1px solid #ccc', 
                    borderRadius: '8px', 
                    padding: '1.5rem',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                }}>
                  <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px'}}>
                    <span style={{fontWeight: 'bold'}}>Boleta #{venta.id}</span>
                    <span style={{color: '#666'}}>{formatDate(venta.fecha)}</span>
                  </div>

                  <div style={{marginBottom: '1rem'}}>
                    {venta.detalles.map((detalle) => (
                      <div key={detalle.id} style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '5px'}}>
                        <span>{detalle.cantidad} x {detalle.producto.name}</span>
                        <span>{formatPrice(detalle.precioUnitario * detalle.cantidad)}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #eee', paddingTop: '10px'}}>
                    <h3 style={{color: '#25d366'}}>Total: {formatPrice(venta.total)}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default HistoryPage;