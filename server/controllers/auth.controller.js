'use strict';
require("dotenv").config();

const router = require("../server").server,
    db = require("../models/index"),
    mapInput = require("../services/mappers/user.mapper");

// REGISTER
router.post({ path: "/register", version: ['1.0.0'] },
    async (request, response, next) => {
        const registerUser = mapInput.toRegisterUserModel(request, "user");
        try {
            let result = await db.User.create(registerUser);
            response.send(result.success ? 201 : 409, result);
        } catch (error) {
            response.send(500, err);
        }
        next();
    });

// LOGIN
router.post({ path: "/login", version: ['1.0.0'] },
    async (request, response, next) => {
        const loginUser = mapInput.toLoginUserModel(request);
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
