'use strict';
require("dotenv").config();
require("../extensions/string.extensions");

const express = require("express");
const cors = require("cors");
const db = require("../models/index");

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
            email: email
        }

        let result = await db.User.create(userData);
        return res.status(result.success ? 201 : 409).send(result.data);

    } catch (err) {
        return next(err);
    }
});

// LOGIN
users.post("/login", async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Username and password are required");
    }

    try{
        const user = db.User.authenticate(email, password);
        return res.status(200).send(user);
    } catch(err) {
        return next(err);
    }
});

// LOGOUT
users.delete("/logout", async (req, res, next) => {
    const { user, cookies: { auth_token: authToken }} = req;

    if (!user || !authToken) {
        return res.status(400).send({ errors: [{message: "User not authenticated."}]});
    }

    await req.user.logout(authToken);
    return res.status(204).send();
});

module.exports = users;