'use strict';
require("dotenv").config();
const path = require("path");
const childProcess = require("child_process");
const restify = require("restify");
const authMiddleware = require("./middleware/auth.middleware");
const db = require("./models");

global.staticFolder = `${path.resolve(__dirname)}/www`;
const port = Number(process.env.PORT) || 3000;

// Create Server
global.server = restify.createServer({
    name: "Spent API",
    version: "1.0.0",
    url: process.env.HOST
});

// Configure Middleware
server.use(authMiddleware);
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser({
    mapParams: true,
    mapFiles: false,
    overrideParams: false
}));

//Sync Database
const isDevelopment = process.env.NODE_ENV !== "production";

db.sequelize.sync({ force: isDevelopment });

if (isDevelopment) {
    childProcess.exec("npx sequelize-cli db:seed:all", (error, stdout, stderr) => {
        if (error) {
            console.log(`exec error: ${error}`);
        }
        console.log(stdout);
        console.log(stderr);
    });
}

module.exports = { server, port };
