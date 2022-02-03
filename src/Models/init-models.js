var DataTypes = require("sequelize").DataTypes;
var _Admins = require("./Admins");
var _Categories = require("./Categories");
var _Products = require("./Products");
var _ProductsChangeLog = require("./ProductsChangeLog");

function initModels(sequelize) {
    var Admins = _Admins(sequelize, DataTypes);
    var Categories = _Categories(sequelize, DataTypes);
    var Products = _Products(sequelize, DataTypes);
    var ProductsChangeLog = _ProductsChangeLog(sequelize, DataTypes);

    Products.belongsTo(Categories, { as: "Category", foreignKey: "CategoryId"});
    Categories.hasMany(Products, { as: "Products", foreignKey: "CategoryId"});

    return {
        Admins,
        Categories,
        Products,
        ProductsChangeLog,
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
