'use strict';
const Sequelize = require('sequelize');
const AuthToken = require("./auth-token");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    const UserSettings = sequelize.define("UserSettings", {
        uid: {
            type: DataTypes.UUID,
            allowNulls: false,
            unique: true,
            defaultValue: Sequelize.UUIDV4
        }
    }, {
        paranoid: true,
        underscored: true,
        indexes: [
            { fields: ["id"], unique: true },
            { fields: ["uid"], unique: true }
        ]
    });

    UserSettings.associate = function (models) {

        UserSettings.belongsTo(models.User, {
            as: "user",
            unique: true
        });

        UserSettings.hasOne(models.Account, {
            as: "pinned_account",
            unique: true,
            allowNulls: true
        })
    };

    return UserSettings;
};