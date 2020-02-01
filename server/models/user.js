'use strict';
const Sequelize = require('sequelize');
const AuthToken = require("./auth-token");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        uid: {
            type: DataTypes.UUID,
            allowNulls: false,
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
            defaultValue: Sequelize.UUIDV4
        },
    }, {
        paranoid: true,
        underscored: true
    });

    User.associate = function (models) {
        User.hasMany(models.AuthToken);
    };

    User.prototype.authenticate = async function(email, password) {
        const user = User.findOne({ where: email });

        if (bcrypt.compareSync(password, user.password)) {
            return await user.authorize();
        }

        throw new Error("Invalid password");
    };

    User.prototype.authorize = async function() {
        const user = this;
        const authToken = AuthToken.generate(user.uid);
        await user.addAuthToken(authToken);

        return { user, authToken };
    };

    User.prototype.logout = async function(token) {
        sequelize.models.AuthToken.destroy({ where: { token }});
    };

    User.prototype.create = async function(registerUser) {
        let result;
        await db.User.findOrCreate({
            where: { email: registerUser.email },
            defaults: {
                name: registerUser.username,
                passwordHash: registerUser.passwordHash,
                email: registerUser.email,
                role: registerUser.role
            }
        }).spread(async (user, created) => {
            const data = await user.authorize();

            result = {
                success: created,
                token: data.authToken.token,
                uid: data.authToken.uid,
                data: {
                    username: data.user.name,
                    email: data.user.email
                }
            }
        });

        return result;
    }

    return User;
};