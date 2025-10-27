// Configuración global para las pruebas
window.beforeEach(() => {
  // Limpiar el DOM antes de cada prueba
  if (document.body.firstChild) {
    document.body.innerHTML = '';
  }
  
  // Crear el contenedor root para React
  const rootElement = document.createElement('div');
  rootElement.id = 'root';
  document.body.appendChild(rootElement);
});

window.afterEach(() => {
  // Limpiar el DOM después de cada prueba
  document.body.innerHTML = '';
});