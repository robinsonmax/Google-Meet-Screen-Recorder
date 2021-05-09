const path = require('path');

module.exports = [
  {
    mode: 'development',
    entry: './inject.js',
    output: {
      filename: 'inject/inject.js',
      path: path.resolve(__dirname, 'ext'),
    },
  },
  {
    mode: 'development',
    entry: './convert.js',
    output: {
      filename: 'convert/convert.js',
      path: path.resolve(__dirname, 'ext'),
    },
  },
]