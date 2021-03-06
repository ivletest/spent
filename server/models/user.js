'use strict';
const Sequelize = require('sequelize');
const AuthToken = require("./auth-token");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        uid: {
            type: DataTypes.UUID,
            allowNulls: false,
            unique: true,
            defaultValue: Sequelize.UUIDV4
        },
        role: {
            type: DataTypes.ENUM,
            values: ['user', 'admin', 'disabled'],
            defaultValue: 'user'
        },
        name: {
            type: DataTypes.STRING,
            allowNulls: false
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNulls: false
        },
        email: {
            type: DataTypes.STRING,
            allowNulls: false
        },
        emailIsValid: {
            type: DataTypes.BOOLEAN,
            allowNulls: false,
            defaultValue: false
        },
        emailValidationUid: {
            type: DataTypes.UUID,
            allowNulls: false,
            unique: true,
            defaultValue: Sequelize.UUIDV4
        },
    }, {
        paranoid: true,
        underscored: true,
        indexes: [
            { fields: ["id"], unique: true },
            { fields: ["uid"], unique: true },
            { fields: ["email"], unique: true },
            { fields: ["email", "email_is_valid"]},
            { fields: ["uid","name", "email", "password_hash"]}
        ]
    });

    User.associate = function (models) {
        User.hasMany(models.AuthToken);
        User.belongsToMany(models.Account, { through: "user_accounts" });
    };

    return User;
};