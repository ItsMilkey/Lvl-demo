// src/components/ProductCard.jsx

function ProductCard({ product }) {
  return (
    <div className="card"> {/* Usamos la misma clase 'card' que ya estilizamos */}
      <img src={product.img} alt={product.nombre} />
      <h3>{product.nombre}</h3>
      <p className="price">${product.precio.toLocaleString("es-CL")}</p>
      <button className="btn">Ver Detalles</button>
    </div>
  );
}

export default ProductCard;