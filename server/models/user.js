'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        uid: {
            type: DataTypes.UUID,
            allowNulls: false,
            defaultValue: Sequelize.UUIDV4
        },
        role: {
            type: DataTypes.ENUM,
            values: ['user', 'admin', 'disabled']
        },
        name: {
            type: DataTypes.STRING,
            allowNulls: false
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNulls: false
        },
        passwordSalt: {
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
            defaultValue: Sequelize.UUIDV4
        },
    }, {
        paranoid: true,
        underscored: true
    });

    User.associate = function (models) {};
    
    return User;
};