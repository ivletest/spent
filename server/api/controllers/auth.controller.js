'use strict';
require("dotenv").config();
const router = require("../api.server").server;
const mapInput = require("../services/user/user.mapper");
const userService = require("../services/user/user.service");

const authPath = "/auth";

// REGISTER
/**
 * @api {post} /auth/register   User registration.
 * @apiName RegisterUser
 * @apiGroup Authentication
 *
 * @apiParam {String} username  Longer than 2 characters required.
 * @apiParam {String} email     Valid email required.
 * @apiParam {String} password  Both upper and lower case letters and a number required.
 *
 * @apiSuccess {String} username  Name of the newly created user.
 * @apiSuccess {String} email     Email of the newly created user.
 *
 * @apiError (400 BadRequest) BadRequest Invalid credentials.
 * @apiError (409 Conflict) Conflict User already exists.
 * @apiError (500 InternalServerError) InternalServerError The server encountered an internal error
 *
 * @apiSuccessExample  {json} Success
 *  HTTP/1.1 201 Created
 *  {
 *     "username": "name",
 *      "email": "mail@email.com"
 *  }
 *
 * @apiErrorExample {json} Conflict
 *  HTTP/1.1 409 Conflict
 *  {
 *      "code": "Conflict",
 *      "message": "User already exists."
 *  }
 */
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
/**
 * @api {post} /auth/login User login.
 * @apiName Login
 * @apiGroup Authentication
 *
 * @apiParam {String} email     User email.
 * @apiParam {String} password  User password.
 *
 * @apiSuccess {String} username  Name of the logged in user.
 * @apiSuccess {String} email     Email of the logged in user.
 *
 * @apiError (401 Unauthorized) Unauthorized Invalid credentials.
 * @apiError (500 InternalServerError) InternalServerError The server encountered an internal error
 *
 * @apiSuccessExample  {json} Success
 *  HTTP/1.1 200 OK
 *  {
 *     "username": "name",
 *      "email": "mail@email.com"
 *  }
 *
 * @apiErrorExample {json} Unauthorized
 *  HTTP/1.1 401 Unauthorized
 *  {
 *      "code": "Unauthorized",
 *      "message": "Invalid credentials"
 *  }
 */
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

// Redirects
router.post(authPath, (request, response, next) => {
    response.redirect(302,`${authPath}/login`, next);
});

// LOGOUT
/**
 * @api {delete} /auth/logout User logout.
 * @apiName Logout
 * @apiGroup Authentication
 *
 * @apiSuccess (204 NoContent) Empty body.
 *
 * @apiError (400 BadRequest) BadRequest Invalid input data.
 * @apiError (500 InternalServerError) InternalServerError The server encountered an internal error
 *
 * @apiErrorExample {json} BadRequest
 *  HTTP/1.1 409 Bad Request
 *  {
 *      "code": "BadRequest",
 *      "message": "Invalid input data"
 *  }
 */
router.del({ path: `${authPath}/logout`, version: ['1.0.0'] },
    async (request, response, next) => {
        try {
            const token = mapInput.toLogoutUserModel(request);
            await userService.logout(token);

            response.send(204);
        } catch (error) {
            response.send(error);
        }
    });

// Redirects
router.del(authPath, (request, response, next) => {
    response.redirect(302,`${authPath}/logout`, next);
});

// VALIDATE
/**
 * @api {patch} /auth/validate/:uid?validation_uid=:uid Email validation.
 * @apiName Validation
 * @apiGroup Authentication
 *
 * @apiParam {UUID} uid             User Uid.
 * @apiParam {String} validation_uid  Email validation uid.
 *
 * @apiSuccess {String} username  Name of the logged in user.
 * @apiSuccess {String} email     Email of the logged in user.
 *
 * @apiError (400 BadRequest) BadRequest Invalid input data.
 * @apiError (500 InternalServerError) InternalServerError The server encountered an internal error
 *
 * @apiErrorExample {json} BadRequest
 *  HTTP/1.1 409 Bad Request
 *  {
 *      "code": "BadRequest",
 *      "message": "Invalid input data"
 *  }
 */
router.patch({ path: `${authPath}/:uid/verify/:verification_uid`, version: ['1.0.0'] },
    async (request, response, next) => {
        try {
            const verificationData = mapInput.toVerifyEmailModel(request);
            await userService.verify(verificationData);

            response.send(204);

        } catch (error) {
            response.send(error);
        }
    });

module.exports = router;
