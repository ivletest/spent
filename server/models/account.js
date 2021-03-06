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
        underscored: true,
        indexes: [
            { fields: ["id"], unique: true },
            { fields: ["uid"], unique: true },
            { fields: ["id", "parent_account_id"] }
        ]
    });

    Account.associate = function (models) {
        Account.belongsToMany(models.User, { through: "user_accounts" });
        Account.belongsTo(models.Account, { as: "parent_account" });

        Account.hasMany(models.Income, { as: "incomes" });
        Account.hasMany(models.Expense, { as: "expenses" });
    };

    return Account;
}