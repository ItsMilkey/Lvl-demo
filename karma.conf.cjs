module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      { pattern: 'tests/setupTests.js', type: 'module' },
      { pattern: 'src/components/**/*.js', type: 'module' },
      { pattern: 'src/components/**/*.jsx', type: 'module' },
      { pattern: 'tests/**/*.test.js', type: 'module' },
      { pattern: 'tests/**/*.test.jsx', type: 'module' },
      { pattern: 'src/**/*.css', type: 'css' }
    ],
    exclude: [
      'src/main.jsx'
    ],
    exclude: [],
    preprocessors: {
      'tests/setupTests.js': ['webpack'],
      'src/**/*.js': ['webpack', 'coverage'],
      'src/**/*.jsx': ['webpack', 'coverage'],
      'tests/**/*.test.js': ['webpack'],
      'tests/**/*.test.jsx': ['webpack'],
      'src/**/*.css': ['webpack']
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', {
                    targets: {
                      node: 'current'
                    },
                    modules: false
                  }],
                  ['@babel/preset-react', {
                    runtime: 'automatic'
                  }]
                ]
              }
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx', '.css'],
        mainFields: ['browser', 'module', 'main']
      },
      devtool: 'inline-source-map',
      experiments: {
        topLevelAwait: true
      }
    },
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