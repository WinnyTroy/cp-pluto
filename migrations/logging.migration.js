module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('logs', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.BIGINT,
                autoIncrement: true,
            },
            otpId: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: false,
            },
            requestId: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: false,
            },
            actorType: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: false,
            },
            actorId: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: false,
            },
            channel: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: false,
            },
            action: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: false,
            },
            desc: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: false,
            },
            userAgent: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: false,
                defaultValue: "0"
            },
            ip: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: false,
            },
            resourceType: {
                type: Sequelize.ENUM('api', 'engine', 'webhook'),
                allowNull: false,
                unique: false,
            },
            resourcePath: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: false,
            },
            method: {
                type: Sequelize.STRING,
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
    down: (queryInterface) => queryInterface.dropTable('logs'),
};