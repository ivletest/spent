const db = require("../../models/index");
const errors = require("restify-errors");

async function create(accountData) {

    const account = await db.Accounts.create({
        is_private: accountData.isPrivate,
        balance: accountData.balance,
        currency: accountData.currency,
        parent_account_id: accountData.parentAccountUid
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