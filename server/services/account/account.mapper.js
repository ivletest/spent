'use strict';
require("../validation.service");
const errors = require("restify-errors");

function toCreateAccountModel(request) {
    const userUid = request.params.uid;
    const { isPrivate, balance, currency, parrentAccount } = request.body;

}

module.exports = {
    toCreateAccountModel
}