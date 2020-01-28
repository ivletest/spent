'use strict';
require ("dotenv").config();

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const users = express.Router();
users.use(cors());

const User = require("../models/user");
const Email = require("../models/email");
require("../extensions/string.extensions");

// REGISTER
users.post("/register", async (req, res, next) => {
    // Validate request
    let userData = {};
    try {
        userData = {
            username: req.body.username.validateUsername(),
            passwordHash: req.body.password.validateAndHashPassword().hash,
            passwordSalt: req.body.password.validateAndHashPassword().salt,
            email: req.body.email.validateEmail()
        }
    } catch (err) {
        next(err);
    }

    const email = await Email.findOne({ where: userData.email });

    if (email) {
        res.send("Email already exists");
        return;
    }

    res.status(201).send("User created");
});

// LOGIN
users.get("/login", (req, res) => {
    res.send("Login works");
});

module.exports = users;