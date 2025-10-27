// API Service disponible globalmente
var ServicioAPI = {
  async getData() {
    try {
      // Simular una llamada a API
      const response = await fetch('https://api.ejemplo.com/data');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener datos:', error);
      throw error;
    }
  },

  async getProductos() {
    // En un entorno real, esto haría una llamada a la API
    // Por ahora, retornamos los productos del mock
    return Promise.resolve(productos);
  }
};