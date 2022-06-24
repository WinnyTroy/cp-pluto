var bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
    const referrals = sequelize.define('referrals', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.BIGINT,
            autoIncrement: true,
        },
        referralId: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        fullName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: false,
        },
        phoneNumber: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: false,
        },
        location: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: false,
        },
        waterSource: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: false,
        },
        productInterested: {
            type: DataTypes.TEXT,
            allowNull: true,
            unique: false,
        },
        status: {
            type: DataTypes.ENUM('0', '1', '2'),
            allowNull: false,
            unique: false,
            defaultValue: "0",
            comment: '0 - pending, 1- contacted, 2 - In Progress '
        },
        referredBy: {
            type: DataTypes.STRING(255),
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
        tableName: 'referrals',
        hooks: {
        }
    });

    return referrals;
}