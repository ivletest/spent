'use strict';
require("dotenv").config();
const restify = require("restify");
const authMiddleware = require("../middleware/auth.middleware");

// Create Server
const server = restify.createServer({
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
module.exports = server;