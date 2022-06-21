module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('otp', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.BIGINT,
                autoIncrement: true,
            },
            otpId: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true,
            },
            phoneNumber: {
                type: Sequelize.STRING(255),
                allowNull: true,
                unique: false,
            },
            nationalID: {
                type: Sequelize.STRING(255),
                allowNull: true,
                unique: false,
            },
            code: {
                type: Sequelize.STRING(10),
                allowNull: false,
                unique: false,
            },
            dv_count: {
                type: Sequelize.STRING(10),
                allowNull: false,
                unique: false,
                defaultValue: "0"
            },
            expiry: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: false,
            },
            status: {
                type: Sequelize.ENUM('0', '1', '2'),
                allowNull: false,
                unique: false,
                defaultValue: "0",
                comment: '0 - unverified, 1- verified, 2 - expired'
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
    down: (queryInterface) => queryInterface.dropTable('otp'),
};