class ServicioAPI {
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
  }
}

export default ServicioAPI;