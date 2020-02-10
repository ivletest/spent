'use strict';
require("dotenv").config();
const router = require("../server").server;
const mapInput = require("../services/user/user.mapper");
const userService = require("../services/user/user.service");

const usersPath = "/users";

// GET CURRENT USER
/**
 * @api {get} /users/me Get current user.
 * @apiName GetCurrentUser
 * @apiGroup Users
 *
 * @apiHeader {String} auth_token Authentication token.
 *
 * @ApiSuccess (200 OK) {UUID}   uid       User uid
 * @apiSuccess (200 OK) {String} username  User name.
 * @apiSuccess (200 OK) {String} email     User email.
 *
 * @apiError (4xx) 401-Unauthorized Invalid credentials.
 * @apiError (4xx) 403-Forbidden    BadRequest Invalid credentials.
 * @apiError (5xx) 500-InternalServerError The server encountered an internal error
 *
 * @apiSuccessExample  {json} Success
 *  HTTP/1.1 200 OK
 *  {
 *     "uid": "5b8fe889-ace4-4e4b-8cf5-5f0a4263ce81"
 *     "username": "name",
 *     "email": "mail@email.com"
 *  }
 *
 * @apiErrorExample {json} Unauthorized
 *  HTTP/1.1 401 Unauthorized
 *  {
 *      "code": "Unauthorized",
 *      "message": "Unauthorized user."
 *  }
 */
router.get({ path: `${usersPath}/me`, version: ['1.0.0'] },
    async (request, response, next) => {
        try {
            const user = mapInput.toCurrentUserModel(request);
            response.send(200, user);
        } catch (error) {
            response.send(error);
        }

        next();
    });