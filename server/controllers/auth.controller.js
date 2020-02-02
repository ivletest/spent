'use strict';
require("dotenv").config();
const router = require("../server").server;
const db = require("../models/index");
const mapInput = require("../services/user/user.mapper");
const userService = require("../services/user/user.service");
const errors = require("restify-errors");

// REGISTER
router.post({ path: "/register", version: ['1.0.0'] },
    async (request, response, next) => {

        try {
            const user = mapInput.toRegisterUserModel(request, "user");
            let result = await userService.create(user);
            response.send(201, result);
        } catch (error) {
            response.send(error);
        }

        next();
    });

// LOGIN
router.post({ path: "/login", version: ['1.0.0'] },
    async (request, response, next) => {

        try {
            const user = mapInput.toLoginUserModel(request);
            const authenticatedUser = db.User.authenticate(user);
            response.send(201, authenticatedUser);
        } catch (error) {
            response.send(500, error);
        }

        next();
    });

// LOGOUT
router.del({ path: "/logout", version: ['1.0.0'] },
    async (request, response, next) => {

        try {
            const token = mapInput.toLogoutToken(request);
            await request.user.logout(token);
        } catch (error) {
            return response.send(204);
        }
    });

module.exports = router;
