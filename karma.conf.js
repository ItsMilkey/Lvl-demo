module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'src/**/*.js',
      'src/**/*.jsx',
      'tests/**/*.js',
      'tests/**/*.jsx'
    ],
    preprocessors: {
      'src/**/*.js': ['coverage'],
      'src/**/*.jsx': ['coverage'],
      'tests/**/*.js': ['coverage'],
      'tests/**/*.jsx': ['coverage']
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: 2,
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
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      }
    }
  });
};