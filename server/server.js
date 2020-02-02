'use strict';
require("dotenv").config();
const childProcess = require("child_process");
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
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser({
    mapParams: true,
    mapFiles: false,
    overrideParams: false
}));

//Sync Database
db.sequelize.sync({ force: true });

if (process.env.NODE_ENV === "development") {
    childProcess.exec("npx sequelize-cli db:seed:all", (error, stdout, stderr) => {
        if (error) {
            console.log(`exec error: ${error}`);
        }
        console.log(stdout);
        console.log(stderr);
    });
}

module.exports = { server, port };
