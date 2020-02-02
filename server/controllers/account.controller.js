'use strict';
require("dotenv").config();
const router = require("../server").server;
const mapInput = require("../services/account/account.mapper");
const accountService = require("../services/account/account.service");

const accountPath = "/:uid/account";
// CREATE ACCOUNT
/**
 * @api {post} /:uid/account/create Create new finantial account.
 * @apiName CreateAccount
 * @apiGroup Account
 *
 * @apiParam {UUID} userUid   User uid.
 * @apiParam {Boolean} isPrivate  Sets account to private.
 * @apiParam {Decimal} balance  Account balance.
 * @apiParam {String} currency  Account currency.
 * @apiParam {UUID} parentAccountUid  If not null account as a sub account.
 *
 *
 * @apiSuccess {String} username  Name of the logged in user.
 * @apiSuccess {String} email     Email of the logged in user.
 *
 * @apiError (400 BadRequest) BadRequest Invalid credentials.
 * @apiError (500 InternalServerError) InternalServerError The server encountered an internal error
 *
 * @apiSuccessExample  {json} Success
 *  HTTP/1.1 200 OK
 *  {
 *     "username": "name",
 *      "email": "mail@email.com"
 *  }
 *
 * @apiErrorExample {json} BadRequest
 *  HTTP/1.1 409 Bad Request
 *  {
 *      "code": "BadRequest",
 *      "message": "Invalid credentials"
 *  }
 */
router.post({ path: `${accountPath}/create`, version: ['1.0.0'] },
    async (request, response, next) => {
        try {
            const accountData = mapInput.toCreateAccountModel(request);
            const account = await accountService.create(accountData);
            response.send(204, account);
        } catch (error) {
            response.send(error);
        }
    });

// GET ALL ACCOUNTS

// GET ACCOUNT
