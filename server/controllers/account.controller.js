'use strict';
require("dotenv").config();
const router = require("../server").server;
const mapInput = require("../services/account/account.mapper");
const accountService = require("../services/account/account.service");

const accountPath = "/:uid/accounts";
// CREATE ACCOUNT
/**
 * @api {post} /:uid/accounts/create Create new finantial account.
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
 * @apiSuccess {UUID} uid  Uid of the account.
 * @apiParam {Boolean} isPrivate Tells if the account is private.
 * @apiParam {Decimal} balance  Account balance.
 * @apiSuccess {String} currency Account currency.
 *
 *
 * @apiError (400 BadRequest) BadRequest User does not exist.
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
 * @apiErrorExample {json} BadRequest
 *  HTTP/1.1 409 Bad Request
 *  {
 *      "code": "BadRequest",
 *      "message": "User does not exist."
 *  }
 */
router.post({ path: `${accountPath}/create`, version: ['1.0.0'] },
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
 * @api {get} /:uid/accounts Gets all finantial accounts for user.
 * @apiName GetAllAccounts
 * @apiGroup Account
 *
 * @apiParam {UUID} userUid   User uid.
 *
 *
 * @apiSuccess {UUID} uid  Uid of the account.
 * @apiParam {Boolean} isPrivate Tells if the account is private.
 * @apiParam {Decimal} balance  Account balance.
 * @apiSuccess {String} currency Account currency.
 *
 *
 * @apiError (400 BadRequest) BadRequest User does not exist.
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
 * @apiErrorExample {json} BadRequest
 *  HTTP/1.1 409 Bad Request
 *  {
 *      "code": "BadRequest",
 *      "message": "User does not exist."
 *  }
 */
router.get({ path: `${accountPath}`, version: ['1.0.0'] },
    async (request, response, next) => {

        try {
            const userUid = mapInput.toGetAllAccountsModel(request);
            const result = await accountService.getAllAccounts(userUid);

            response.send(200, result)
        } catch(error) {
            response.send(error);
        }

    });
// GET ACCOUNT
