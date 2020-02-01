const { server, port } = require("./server/server");
const router = require("./server/router");

server.listen(port, (router) => {
  console.log(`server listens to port: ${port}`);
});
