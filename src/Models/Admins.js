const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Admins', {
        AdminId: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        AdminUsername: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        AdminPassword: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        CreationDate: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
        sequelize,
        tableName: 'Admins',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "AdminId" },
                ]
            },
        ]
    });
};
