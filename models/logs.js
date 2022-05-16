var bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
    const logs = sequelize.define('logs', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.BIGINT,
            autoIncrement: true,
        },
        otpId: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: false,
        },
        requestId: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: false,
        },
        actorType: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        actorId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        channel: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        action: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        desc: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        userAgent: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
            defaultValue: "0"
        },
        ip: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        resourceType: {
            type: DataTypes.ENUM('api', 'engine', 'webhook'),
            allowNull: false,
            unique: false,
        },
        resourcePath: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        method: {
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
        tableName: 'logs',
        hooks: {
        }
    });

    return logs;
}