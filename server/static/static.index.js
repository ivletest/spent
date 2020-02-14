const config = require("../conf/server.config");
const server = require("./static.server");
const router = require("./static.router");

server.listen(config.static.port, config.static.host, (router) => {
  console.log(`static server ready on ${server.url}`);
});