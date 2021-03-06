var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'app', 'main.js');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var Promise = require('es6-promise').Promise;

var config = {

  // Makes sure errors in console map to the correct file
  // and line number
  //devtool: 'eval',
  devtool: 'source-map',
  entry: [

    // For hot style updates
    'webpack/hot/dev-server',
    
    

    // The script refreshing the browser on none hot updates
    'webpack-dev-server/client?http://localhost:8080',
    
    
    
    // Our application
    mainPath
    
    //,'file?name=index.html!jade-html!./public/index.jade'
    
    ],
  output: {

    // We need to give Webpack a path. It does not actually need it,
    // because files are kept in memory in webpack-dev-server, but an
    // error will occur if nothing is specified. We use the buildPath
    // as that points to where the files will eventually be bundled
    // in production
    path: buildPath,
    filename: 'bundle.js',
    
    // Everything related to Webpack should go through a build path,
    // localhost:3000/build. That makes proxying easier to handle
    publicPath: '/build/'
  },
  externals: [
    {
      "window": "window"
    }
  ],
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
    },
    {
        test: /\.jade$/,
        loader: "jade-loader"
    },
    {
        test: /\.node$/,
        loader: "node-loader"
    }

    ]
  },
  

  // We have to manually add the Hot Replacement plugin when running
  // from Node
  plugins: [new Webpack.HotModuleReplacementPlugin(),
    new Webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
  ],
  // This sets up config based on environment 
  resolve: {
      alias: {
          config: path.join(__dirname, '/app/config', env)
          
      },
      extensions: ['', '.js', '.node']
  }
};

module.exports = config;