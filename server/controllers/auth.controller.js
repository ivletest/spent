'use strict';
require("dotenv").config();
const router = require("../server").server;
const mapInput = require("../services/user/user.mapper");
const userService = require("../services/user/user.service");

const authPath = "/auth";

// REGISTER
router.post({ path: `${authPath}/register`, version: ['1.0.0'] },
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
router.post({ path: `${authPath}/login`, version: ['1.0.0'] },
    async (request, response, next) => {

        try {
            const user = mapInput.toLoginUserModel(request);
            const authenticatedUser = await userService.authenticate(user);

            response.header("auth_token", authenticatedUser.token);
            response.send(200, authenticatedUser.data);
        } catch (error) {
            response.send(error);
        }

        next();
    });

// LOGOUT
router.del({ path: `${authPath}/logout`, version: ['1.0.0'] },
    async (request, response, next) => {

        try {
            const user = mapInput.toLogoutUserModel(request);
            await userService.logout(user);

            response.send(204);
        } catch (error) {
            response.send(error);
        }
    });

// VERIFY
router.patch({ path: `${authPath}/validate/:uid`, version: ['1.0.0'] },
    async (request, response, next) => {
        try {
            const verificationData = mapInput.toVerifyEmailModel(request);
            await userService.verify(verificationData);

            response.send(204);

        } catch(error) {
            response.send(error);
        }
    });

module.exports = router;
