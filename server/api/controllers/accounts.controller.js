'use strict';
require("dotenv").config();
const router = require("../../server").server;
const mapInput = require("../services/account/account.mapper");
const accountService = require("../services/account/account.service");

const accountPath = "/accounts";
// CREATE ACCOUNT
/**
 * @api {post} /accounts/ Create account.
 * @apiName CreateAccount
 * @apiGroup Financial
 *
 * @apiParam {Boolean} isPrivate  Sets account to private.
 * @apiParam {Decimal} balance  Account balance.
 * @apiParam {String} currency  Account currency.
 * @apiParam {UUID} parentAccountUid  If not null account as a sub account.
 *
 *
 * @apiSuccess {UUID} uid  Uid of the account.
 * @apiParam {Boolean} isPrivate Tells if the account is private.
 * @apiParam {Decimal} balance  Account balance.
 * @apiSuccess {String} currency Account currency.
 *
 *
 * @apiError (401 Unauthorized) Unauthorized User is not authorized.
 * @apiError (500 InternalServerError) InternalServerError The server encountered an internal error
 *
 * @apiSuccessExample  {json} Success
 *  HTTP/1.1 201 Created
 *  {
 *      "uid": "a3ed181c-3519-4bc0-9889-be9ee9069006",
 *      "isPrivate": true,
 *      "balance": "200",
 *      "currency": "mkd"
 *  }
 *
 * @apiErrorExample {json} Unauthorized
 *  HTTP/1.1 401 Unauthorized
 *  {
 *      "code": "Unautorized",
 *      "message": "Unauthorized user."
 *  }
 */
router.post({ path: `${accountPath}`, version: ['1.0.0'] },
    async (request, response, next) => {
        try {
            const accountData = mapInput.toCreateAccountModel(request);
            const account = await accountService.create(accountData);
            response.send(201, account);
        } catch (error) {
            response.send(error);
        }
    });

// GET ALL ACCOUNTS
/**
 * @api {get} /:uid/accounts Get all accounts.
 * @apiName GetAllAccounts
 * @apiGroup Financial
 *
 *
 * @apiError (401 Unauthorized) Unauthorized User is not authorized.
 * @apiError (500 InternalServerError) InternalServerError The server encountered an internal error
 *
 * @apiSuccessExample  {json} Success
 *  HTTP/1.1 200 OK
 *  {
 *      "uid": "a3ed181c-3519-4bc0-9889-be9ee9069006",
 *      "isPrivate": true,
 *      "balance": "200",
 *      "currency": "mkd"
 *  }
 *
 * @apiErrorExample {json} Unauthorized
 *  HTTP/1.1 401 Unauthorized
 *  {
 *      "code": "Unautorized",
 *      "message": "Unauthorized user."
 *  }
 */
router.get({ path: `${accountPath}`, version: ['1.0.0'] },
    async (request, response, next) => {
        try {
            const result = await accountService.getAllAccounts(request.user);
            response.send(200, result)
        } catch(error) {
            response.send(error);
        }
    });
// GET ACCOUNT
