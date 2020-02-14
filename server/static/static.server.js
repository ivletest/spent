'use strict';
require("dotenv").config();
const path = require("path");
const restify = require("restify");

global.staticFolder = `${path.resolve(__dirname)}/www`;

// Create Server
const server = restify.createServer({
    name: "Spent Documentation",
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

// Export Module
module.exports = server;
