'use strict';
require("dotenv").config();
require("../extensions/string.extensions");

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const userRepository = require("../repository/user.repository");

const users = express.Router();
users.use(cors());

// REGISTER
users.post("/register", async (req, res, next) => {
    try {
        const username = req.body.username.validateUsername()
        const password = req.body.password.validateAndHashPassword();
        const email = req.body.email.validateEmail();

        userData = {
            username: username,
            passwordHash: password.hash,
            passwordSalt: password.salt,
            email: email
        }

        let result = await userRepository.createUser(userData);
        res.status(result.status).send(result.data);

    } catch (err) {
        next(err);
    }
});

// LOGIN
users.get("/login", (req, res) => {
    res.send("Login works");
});

module.exports = users;