'use strict';
require ("dotenv").config();

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const users = express.Router();
users.use(cors());

const User = require("../models/user");
const Email = require("../models/email");


// REGISTER
users.post("/register", (req, res) => {
    res.send("Register works");
});

// LOGIN
users.get("/login", (req, res) => {
    res.send("Login works");
});

module.exports = users;