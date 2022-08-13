var bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
    const weathers = sequelize.define('weathers', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.BIGINT,
            autoIncrement: true,
        },
        nationalID: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: false,
        },
        latitude: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: false,
        },
        longitude: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: false,
        },
        weather: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: false,
        },
        temp: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: false,
        },
        wind: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: false,
        },
        pressure: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: false,
        },
        humility: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: false,
        },
        status: {
            type: DataTypes.ENUM('CORRECT', 'NOT_CORRECT'),
            allowNull: false,
            unique: false,
            comment: 'To logged if the weather is correct or not'
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
        tableName: 'weathers',
        hooks: {
        }
    });

    return weathers;
}