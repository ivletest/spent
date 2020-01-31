'use strict';
require("dotenv").config();
require("../extensions/string.extensions");

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const users = express.Router();
users.use(cors());

const db = require("../models/index");

// REGISTER
users.post("/register", async (req, res, next) => {
    // Validate request
    let userData = {};
    try {

    } catch (err) {
        next(err);
    }

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

        try {
            const result = await sequelize.transaction(async (t) => {

            });
        } catch(err) {
            next(err);
        }
        await db.Email.findOrCreate({
            where: { address: userData.email },
            defaults: {
                name: userData.username,
                passwordHash: userData.passwordHash,
                passwordSalt: userData.passwordSalt,
                role: "user",
                email: {
                    address: userData.email
                },
            }
        }).spread((result, created) => {
            console.log(result);
        });
        // const result = await db.User.create({
        //     name: userData.username,
        //     passwordHash: userData.passwordHash,
        //     passwordSalt: userData.passwordSalt,
        //     role: "user",
        //     email: {
        //         address: userData.email
        //     }
        // }, {
        //     include: [{
        //         model: db.Email,
        //         as: "email"
        //     }]
        // });

        // if (result) {
        //     res.status(400).send(result);
        // }
    } catch (err) {
        next(err);
    }
});

// LOGIN
users.get("/login", (req, res) => {
    res.send("Login works");
});

module.exports = users;