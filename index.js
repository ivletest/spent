require("dotenv").config();

const http = require("http");
const app = require("../../app");

const port = Number(process.env.APP_PORT);
app.set("port", port);

const server = http.createServer(app);
server.listen(port);