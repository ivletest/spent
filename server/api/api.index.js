const config = require("../conf/server.config");
const server = require("./api.server");
const router = require("./api.router");

server.listen(config.api.port, config.api.host, (router) => {
  console.log(`server ready on ${server.url}`);
});