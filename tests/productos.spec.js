describe('Utilidades de Productos', () => {
  it('debe filtrar productos por categoría', () => {
    const juegosDeCategoria = productos.filter(p => p.categoria === "Juegos de Mesa");
    expect(juegosDeCategoria.length).toBe(2);
    expect(juegosDeCategoria[0].nombre).toBe("Catan");
    expect(juegosDeCategoria[1].nombre).toBe("Carcassonne");
  });

  it('debe encontrar productos por rango de precio', () => {
    const productosEconomicos = productos.filter(p => p.precio < 30000);
    expect(productosEconomicos.length).toBe(3);
    expect(productosEconomicos.every(p => p.precio < 30000)).toBe(true);
  });

  it('debe encontrar productos por término de búsqueda', () => {
    const terminoBusqueda = "gamer";
    const resultados = productos.filter(p => 
      p.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(terminoBusqueda.toLowerCase())
    );
    expect(resultados.length).toBeGreaterThan(0);
  });
});