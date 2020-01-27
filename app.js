const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

const app = express();

// Setup middleware
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("*", (req, res) => res.status(200).send("Welcome to Spent."));

module.exports = app;