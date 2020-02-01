'use strict';
require("dotenv").config();

const router = require("../server").server,
    db = require("../models/index"),
    userService = require("../services/user.service");

// REGISTER
router.post({ path: "/register", version: ['1.0.0'] },
    async (request, response, next) => {
        try {
            const result = await userService.createUser(request);
            response.send(result.success ? 201 : 409, result);

        } catch (error) {
            response.send(500, err);
        }
        next();
    });

// LOGIN
router.post({ path: "/login", version: ['1.0.0'] },
    async (request, response, next) => {
        const { email, password } = request.body;

        if (!email || !password) {
            response.send(400, "Username and password are required");
        }

        try {
            const user = db.User.authenticate(email, password);
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
