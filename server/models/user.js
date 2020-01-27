'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        uid: DataTypes.UUID,
        role: { 
            type: DataTypes.ENUM,
            values: ['user', 'admin', 'disabled']
        },
        name: DataTypes.STRING,
        passwordHash: DataTypes.STRING,
        passwordSalt: DataTypes.STRING
    }, {
        paranoid: true,
        underscored: true
    });
    User.associate = function (models) {
        // associations can be defined here
    };
    return User;
};