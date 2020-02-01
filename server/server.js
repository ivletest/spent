'use strict';
require("dotenv").config();
const restify = require("restify"),
    cookieParser = require("cookie-parser"),
    db = require("./models");

const port = Number(process.env.APP_PORT);

// Create Server
global.server = restify.createServer({
    name: "Spent API",
    version: "1.0.0",
    url: process.env.APP_HOST
});

// Configure Middleware
// server.use(restify.plugins.acceptParser(server.acceptable));
// server.use(restify.plugins.fullResponse());
// server.use(restify.plugins.queryParser);
server.use(restify.plugins.bodyParser({
    mapParams: true,
    mapFiles: false,
    overrideParams: false
}));

//Sync Database
db.sequelize.sync({ force: true });

module.exports = { server, port };
