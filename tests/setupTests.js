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

  // Configurar mocks globales
  window.matchMedia = window.matchMedia || function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
    };
  };
});

window.afterEach(() => {
  // Limpiar el DOM después de cada prueba
  document.body.innerHTML = '';
  
  // Limpiar todos los mocks después de cada prueba
  jasmine.clock().uninstall();
});