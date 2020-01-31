require("dotenv").config();

const http = require("http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const db = require("./server/models");

const authMiddleware = require("./server/middleware/auth.middleware");

const app = express();

// Setup middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authMiddleware);
app.use(logger("dev"));


// Setup routes
const authController = require("./server/controllers/auth.controller")
app.use("/api/auth", authController);

//Sync Database
db.sequelize.sync({ force: true});

// Start the server
const port = Number(process.env.APP_PORT);
app.set("port", port);

const server = http.createServer(app);
server.listen(port);