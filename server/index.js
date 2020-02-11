const { server, port } = require("./api/api.server");
const router = require("./api/api.router");

server.listen(port, (router) => {
  console.log(`server ready on ${server.url}`);
});
