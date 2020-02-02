'use strict'
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Income = sequelize.define("Income", {
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

    Income.associate = function (models) {
    };

    return Income;
}