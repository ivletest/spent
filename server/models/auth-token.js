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

    AuthToken.generate = async function (userUid) {
        if (!userUid) {
            throw new Error("Auth token requires user id.");
        }

        let token = "";

        for (let i = 0; i < 15; i++) {
            token += characters.charAt(
                Math.floor(Math.random() * characters.length));
        }

        return AuthToken.create({ token, userUid });
    }

    return AuthToken;
};
