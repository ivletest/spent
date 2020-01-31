'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
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
        }
    }, {
        paranoid: true,
        underscored: true
    });
    User.associate = function (models) {
        User.hasMany(models.Email, { as: "email" })
    };
    return User;
};