var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer();

httpProxy.createProxyServer({target:'http://localhost:9000'}).listen(8000);