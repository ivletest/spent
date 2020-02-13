const config = require("./conf/server.config");

const proxyServer = require("./proxy/proxy.server");

const apiServer = require("./api/api.server");
const apiRouter = require("./api/api.router");

apiServer.listen(config.api.port, config.api.host, (apiRouter) => {
  console.log(`server ready on ${apiServer.url}`);
});

proxyServer.listen(8080, () => {
  console.log("proxy listening on localhost:8080");
});
