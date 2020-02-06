const { server, port } = require("./server");
const router = require("./router");

server.listen(port, (router) => {
  console.log(`server ready on ${server.url}`);
});
