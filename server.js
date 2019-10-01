var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({});
var app = express();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;
var publicPath = path.resolve(__dirname, 'public');
let cors = require("cors");

app.use(cors());
app.use(express.static(publicPath));


// We only want to run the workflow when not in production
if (!isProduction) {
    
  // We require the bundler inside the if block because
  // it is only needed in a development environment. Later
  // you will see why this is a good idea
  console.log("in !production block");
  var bundle = require('./server/bundle.js');
  bundle();

  // Any requests to localhost:3000/build is proxied
  // to webpack-dev-server
  app.all('/build/*', function (req, res) {
    console.log('a request that will be proxied');
    //console.log(req);
    proxy.web(req, res, {
        target: 'http://localhost:8080'
    });
  });
  

}

app.get('*', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});

proxy.on('proxyReq', function(proxyReq, req, res, options) {
    console.log("proxy request coming in");
  //proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
});

app.listen(port, function () {
  console.log('Server.js server running on port ' + port);
});