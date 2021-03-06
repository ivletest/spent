'use strict'
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Expense = sequelize.define("Expense", {
        uid: {
            type: DataTypes.UUID,
            allowNulls: false,
            unique: true,
            defaultValue: Sequelize.UUIDV4
        },
        amount: {
            type: DataTypes.DECIMAL,
            allowNulls: false,
        }
    }, {
        paranoid: true,
        underscored: true,
        indexes: [
            { fields: ["id"], unique: true },
            { fields: ["uid"], unique: true },
            { fields: ["account_id"], unique: true},
            { fields: ["amount", "account_id"], unique: true}
        ]
    });

    Expense.associate = function (models) {};

    return Expense;
}