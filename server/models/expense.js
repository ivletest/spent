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
        underscored: true
    });

    Expense.associate = function (models) {};

    return Expense;
}