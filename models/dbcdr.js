var bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
    const dbcdr = sequelize.define('dbcdr', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.BIGINT,
            autoIncrement: true,
        },
        cost: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: false,
        },
        messageId: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: false,
        },
        messageParts: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: false,
        },
        number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        statusCode: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        timestamps: false,
        underscored: false,
        freezeTableName: true,
        underscoredAll: false,
        tableName: 'dbcdr',
        hooks: {
        }
    });

    return dbcdr;
}