'use strict';
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Email = sequelize.define('Email', {
        uid: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNulls: false
        },
        address: {
            type: DataTypes.STRING,
            allowNulls: false
        },
        isPrimary: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNulls: false
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNulls: false
        },
        verificationUid: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNulls: false
        },
    }, {
        paranoid: true,
        underscored: true
    });
    Email.associate = function (models) {
        Email.belongsTo(models.User);
    };
    return Email;
};