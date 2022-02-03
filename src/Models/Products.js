const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Products', {
        ProductId: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        ProductName: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        ProductPrice: {
            type: DataTypes.DECIMAL(6,2),
            allowNull: true
        },
        CategoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Categories',
                key: 'CategoryId'
            }
        }
    }, {
        sequelize,
        tableName: 'Products',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "ProductId" },
                ]
            },
            {
                name: "CategoryId_FK",
                using: "BTREE",
                fields: [
                    { name: "CategoryId" },
                ]
            },
        ]
    });
};
