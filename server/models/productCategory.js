'use strict'
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const ProductCategory = sequelize.define("ProductCategory", {
        uid: {
            type: DataTypes.UUID,
            allowNulls: false,
            defaultValue: Sequelize.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNulls: false,
        },
        displayOrder: {
            type: DataTypes.INTEGER,
            allowNulls: false
        }
    }, {
        paranoid: true,
        underscored: true
    });

    ProductCategory.associate = function (models) {
        ProductCategory.belongsTo(models.ProductCategory, { as: "parent_category" });
        ProductCategory.hasMany(models.Expense);
    };

    return ProductCategory;
}