require("dotenv").config();

const http = require("http");
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");

const app = express();
const db = require("./server/models");

// Setup db
db.sequelize.sync();

// Setup middleware
app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup routes
const authController = require("./server/controllers/auth.controller")
app.use("/api/auth", authController);

// Start the server
const port = Number(process.env.APP_PORT);
app.set("port", port);

const server = http.createServer(app);
server.listen(port);