'use strict'
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define("Account", {
        uid: {
            type: DataTypes.UUID,
            allowNulls: false,
            unique: true,
            defaultValue: Sequelize.UUIDV4
        },
        isPrivate: {
            type: DataTypes.BOOLEAN,
            allowNulls: false
        },
        balance: DataTypes.DECIMAL,
        currency: DataTypes.TEXT
    }, {
        paranoid: true,
        underscored: true
    });

    Account.associate = function (models) {
        Account.belongsToMany(models.User, { through: "user_accounts" });
        Account.belongsTo(models.Account, {
            foreignKey: "parent_account_uid",
            targetKey: "uid",
            type: DataTypes.UUID
        });

        Account.hasMany(models.Income, { as: "incomes" });
        Account.hasMany(models.Expense, { as: "expenses" });
    };

    return Account;
}