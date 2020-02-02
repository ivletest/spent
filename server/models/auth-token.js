'use strict';
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

module.exports = (sequelize, DataTypes) => {
    const AuthToken = sequelize.define("AuthToken", {
        token: {
            type: DataTypes.STRING,
            allowNulls: false
        }
    }, { underscored: true });

    AuthToken.associate = function (models) {
        AuthToken.belongsTo(models.User);
    };

    return AuthToken;
};
