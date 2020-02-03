'use strict'
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const ProductCategory = sequelize.define("ProductCategory", {
        uid: {
            type: DataTypes.UUID,
            allowNulls: false,
            unique: true,
            defaultValue: Sequelize.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNulls: false,
        },
        displayOrder: {
            type: DataTypes.INTEGER,
            allowNulls: false
        },
    }, {
        paranoid: true,
        underscored: true
    });

    ProductCategory.associate = function (models) {
        ProductCategory.belongsTo(models.ProductCategory, {
            foreignKey: "parent_category_uid",
            targetKey: "uid",
            type: DataTypes.UUID
        });
        ProductCategory.hasMany(models.Expense);
    };

    return ProductCategory;
}
