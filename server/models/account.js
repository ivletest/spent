'use strict'
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define("Account", {
        uid: {
            type: DataTypes.UUID,
            allowNulls: false,
            defaultValue: Sequelize.UUIDV4
        },
        isPrivate: {
            type: DataTypes.BOOLEAN,
            allowNulls: false
        }
    }, {
        paranoid: true,
        underscored: true
    });

    Account.associate = function (models) {
        Account.belongsToMany(models.User, { through: "user_accounts" });
        Account.belongsTo(models.Account, { as: "parent_account" });

        Account.hasMany(models.Income, { as: "incomes" });
        Account.hasMany(models.Expense, { as: "expenses" });
    };

    return Account;
}