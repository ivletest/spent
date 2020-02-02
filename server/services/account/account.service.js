const db = require("../../models/index");
const errors = require("restify-errors");

async function create(accountData) {
    const account = db.Accounts.create({

    });
}

async function getAllAccounts(user) {
    const accounts = db.Accounts.findAll({
        attributes: ["uid", "is_private", "parent_account_id", "balance"],
        include: [{
            model: db.User,
            where: { uid: user.uid }
        }]
    });

    return accounts;
}

module.exports = {
    create,
    getAllAccounts
}