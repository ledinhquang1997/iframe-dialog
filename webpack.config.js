const path = require('path');
const version = process.env.npm_package_version || '0.0.0';
const qaVersion = process.env.npm_package_qaVersion || '0';
const applicationVersion = version + '.' + qaVersion;

const mode = 'production';
const rules = [
  {
    test: /\.m?js$/,
    exclude: /(node_modules)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  },
];

module.exports = [
  {
    mode,
    entry: path.resolve(__dirname, 'src/parent/index.js'),
    output: {
      filename: 'iframe-dialog-register' + applicationVersion + '.js',
      library: {
        name: 'IframeDialog',
        type: 'umd',
      },
      path: path.resolve(__dirname, 'dist/bundle'),
    },
    module: {
      rules,
    },
  },
  {
    mode,
    entry: path.resolve(__dirname, './src/iframe/index.js'),
    output: {
      filename: 'iframe-dialog' + applicationVersion + '.js',
      library: {
        name: 'IframeDialog',
        type: 'umd',
      },
      path: path.resolve(__dirname, 'dist/bundle'),
    },
    module: {
      rules,
    },
  },
];
