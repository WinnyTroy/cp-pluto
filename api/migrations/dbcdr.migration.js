module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('dbcdr', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.BIGINT,
                autoIncrement: true,
            },
            cost: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: false,
            },
            messageId: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: false,
            },
            messageParts: {
                type: Sequelize.STRING(10),
                allowNull: false,
                unique: false,
            },
            number: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: false,
            },
            status: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: false,
            },
            statusCode: {
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
    down: (queryInterface) => queryInterface.dropTable('dbcdr'),
};