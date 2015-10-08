var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'app', 'main.js');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var Promise = require('es6-promise').Promise;


var config = {

  // We change to normal source mapping
  devtool: 'source-map',
  entry: mainPath,
  output: {
    path: buildPath,
    filename: 'bundle.js'
  },
  module: {
    loaders: [

    // I highly recommend using the babel-loader as it gives you
    // ES6/7 syntax and JSX transpiling out of the box
    

    // Let us also add the style-loader and css-loader, which you can
    // expand with less-loader etc.
    {
      test: /\.css$/,
      loader: 'style!css'
    },
    {
        test: /\.styl$/, 
        resolveLoader: { fallback: path.join(__dirname, "node_modules") },  
        loader: 'style!css!stylus'
    },
    {
      test: /\.js$/,
      loaders: ['ng-annotate', 'babel-loader' ],
      exclude: [nodeModulesPath]
    },
    { 
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
        loader: 'url-loader?limit=100000' 
    }
    ,
    {
        test: /\.jade$/,
        loader: "jade-loader"
    }

    ]
  },
  plugins: [
      new Webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
  ],
  resolve: {
      alias: {
          config: path.join(__dirname, '/app/config', env)
      }
  }
};

module.exports = config;