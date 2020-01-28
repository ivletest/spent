'use strict';
module.exports = (sequelize, DataTypes) => {
  const Email = sequelize.define('Email', {
    uid: DataTypes.UUID,
    address: DataTypes.STRING,
    userFK: DataTypes.INTEGER,
    isPrimary: DataTypes.BOOLEAN,
    isVerified: DataTypes.BOOLEAN,
    verificationUid: DataTypes.UUID
  }, {
    paranoid: true,
    underscored: true
  });
  Email.associate = function(models) {
    Email.hasOne(models.User, {
        foreignKey: userFk,
        targetKey: id,
        onDelete: "CASCADE"
    })
  };
  return Email;
};