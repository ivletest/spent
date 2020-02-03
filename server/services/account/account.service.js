const db = require("../../models/index");
const errors = require("restify-errors");

async function create(accountData) {

    const user = await db.User.findOne({ uid: accountData.userUid});

    if (!user) {
        throw new errors.BadRequestError("User does not exist.");
    }

    const account = await db.Account.create({
        isPrivate: accountData.isPrivate,
        balance: accountData.balance,
        currency: accountData.currency,
        parentAccountId: accountData.parentAccountUid
    });

    user.addAccount(account);
    return account;
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