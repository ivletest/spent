'use strict';
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

module.exports = (sequelize, DataTypes) => {
    const AuthToken = sequelize.define("AuthToken", {
        token: {
            type: DataTypes.STRING,
            allowNulls: false
        }
    }, {
        underscored: true,
        indexes: [
            { fields: ["id"], unique: true },
            { fields: ["user_id"], unique: true }
        ]
    });

    AuthToken.associate = function (models) {
        AuthToken.belongsTo(models.User, {
            as: "user",
            unique: true
        });
    };

    return AuthToken;
};
