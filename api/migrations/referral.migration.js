module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('referrals', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.BIGINT,
                autoIncrement: true,
            },
            referralId: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true,
            },
            fullName: {
                type: Sequelize.STRING(255),
                allowNull: true,
                unique: false,
            },
            phoneNumber: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: false,
            },
            location: {
                type: Sequelize.STRING(255),
                allowNull: true,
                unique: false,
            },
            waterSource: {
                type: Sequelize.STRING(255),
                allowNull: true,
                unique: false,
            },
            productInterested: {
                type: Sequelize.TEXT,
                allowNull: true,
                unique: false,
            },
            status: {
                type: Sequelize.ENUM('0', '1', '2'),
                allowNull: false,
                unique: false,
                defaultValue: "0",
                comment: '0 - pending, 1- contacted, 2 - In Progress '
            },
            referredBy: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            }
        }),
    down: (queryInterface) => queryInterface.dropTable('referrals'),
};