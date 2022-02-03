const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const { ConsoleError, ConsoleSuccess, ConsoleWarning } = require("../Utils/ConsoleConfig");

const instance = new Sequelize(process.env.AWS_DB, process.env.AWS_DB_USER, process.env.AWS_DB_SECRET, {
    host: process.env.AWS_DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
        connectTimeout: 100000
    },
    define: {
        timestamps: false
    },
    pool: {
        max: 25,
        min: 0,
        idle: 10000
    },
});

instance
    .authenticate()
    .then(() => {
        console.log(ConsoleSuccess, 'Connection has been established successfully.');
    })
    .catch(err => {
        console.log(ConsoleError, 'Unable to connect to the database:', err);
    });

const db = {};

db.Sequelize = Sequelize;
db.instance = instance;
db.Op = Op;

db.Admins = require("../Models/Admins")(instance, Sequelize.DataTypes);
db.Categories = require("../Models/Categories")(instance, Sequelize.DataTypes);
db.Products = require("../Models/Products")(instance, Sequelize.DataTypes);
db.ProductsChangeLog = require("../Models/ProductsChangeLog")(instance, Sequelize.DataTypes);

db.instance.sync({ force: false })
    .then(() => {
        console.log(ConsoleWarning, "sync is completed");
    }).catch(err => {
        console.log(ConsoleError, 'Unable to sync the database:', err);
    });

module.exports = db;