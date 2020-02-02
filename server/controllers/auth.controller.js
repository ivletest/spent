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
        const user = mapInput.toRegisterUserModel(request, "user");
        try {
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
        const user = mapInput.toLoginUserModel(request);
        try {
            const user = db.User.authenticate(user);
            response.send(201, user);
        } catch (error) {
            response.send(500, err);
        }
        next();
    });

// LOGOUT
router.del({ path: "/logout", version: ['1.0.0'] },
    async (request, response, next) => {
        const { user, cookies: { auth_token: authToken } } = request;

        if (!user || !authToken) {
            return response.send(400, {
                errors: [{ message: "User not authenticated." }]
            });
        }

        await request.user.logout(authToken);
        return response.send(204);
    });

module.exports = router;
