'use strict';
require("dotenv").config();
const restify = require("restify");
const authMiddleware = require("./middleware/auth.middleware");
const db = require("./models");

const port = Number(process.env.APP_PORT);

// Create Server
global.server = restify.createServer({
    name: "Spent API",
    version: "1.0.0",
    url: process.env.APP_HOST
});

// Configure Middleware
server.use(authMiddleware);
server.use(restify.plugins.bodyParser({
    mapParams: true,
    mapFiles: false,
    overrideParams: false
}));

//Sync Database
db.sequelize.sync({ force: true });

module.exports = { server, port };
