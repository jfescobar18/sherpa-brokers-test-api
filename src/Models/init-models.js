var DataTypes = require("sequelize").DataTypes;
var _Admins = require("./Admins");
var _Categories = require("./Categories");
var _ProductsChangeLog = require("./ProductsChangeLog");

function initModels(sequelize) {
    var Admins = _Admins(sequelize, DataTypes);
    var Categories = _Categories(sequelize, DataTypes);
    var ProductsChangeLog = _ProductsChangeLog(sequelize, DataTypes);


    return {
        Admins,
        Categories,
        ProductsChangeLog,
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
