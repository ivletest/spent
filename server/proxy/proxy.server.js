require("dotenv").config();
const config = require("../conf/server.config");
const http = require("http");
const httpProxy = require("http-proxy");
const httpProxyRules = require("http-proxy-rules");

const proxyRules = new httpProxyRules({
    rules: {
        '.*/api': `http://${config.api.host}:${config.api.port}`
    },
    default: ''
});

const proxy = httpProxy.createProxyServer();

const server = http.createServer((request, response) => {
    var target = proxyRules.match(request);

    if (target) {
      return proxy.web(request, response, {
        target: target
      });
    }

    response.statusCode = 407;
    return response.end("Nope.");
});

server.listen(config.proxy.port, config.proxy.host);

module.exports = server;
