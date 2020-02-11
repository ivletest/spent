'use strict';
require("dotenv").config();
const path = require("path");
const restify = require("restify");
const authMiddleware = require("../middleware/auth.middleware");

global.staticFolder = `${path.resolve(__dirname)}/www`;

const port = Number(process.env.PORT) || 3000;

// Create Server
global.server = restify.createServer({
    name: "Spent API",
    version: "1.0.0",
    url: process.env.HOST
});

// Configure Middleware
server.pre(restify.pre.sanitizePath());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser({
    mapParams: true,
    mapFiles: false,
    overrideParams: false
}));
server.use(authMiddleware);

// Export Module
module.exports = { server, port };