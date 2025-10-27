module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      // Primero cargamos los datos
      'src/data/productosData.js',
      'src/services/ServicioAPI.js',
      'src/utils/carritoUtils.js',
      
      // Luego cargamos los archivos de prueba
      'tests/productos.spec.js',
      'tests/carrito.spec.js',
      'tests/ServicioAPI.test.js'
    ],
    exclude: [
      'src/main.jsx'
    ],
    exclude: [],
    preprocessors: {},
    webpackMiddleware: {
      stats: 'errors-only'
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: 2
  });
};