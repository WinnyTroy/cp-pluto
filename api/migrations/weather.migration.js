module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('weathers', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.BIGINT,
                autoIncrement: true,
            },
            nationalID: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: false,
            },
            latitude: {
                type: Sequelize.STRING(255),
                allowNull: true,
                unique: false,
            },
            longitude: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: false,
            },
            weather: {
                type: Sequelize.STRING(255),
                allowNull: true,
                unique: false,
            },
            temp: {
                type: Sequelize.STRING(255),
                allowNull: true,
                unique: false,
            },
            wind: {
                type: Sequelize.STRING(255),
                allowNull: true,
                unique: false,
            },
            pressure: {
                type: Sequelize.STRING(255),
                allowNull: true,
                unique: false,
            },
            humility: {
                type: Sequelize.STRING(255),
                allowNull: true,
                unique: false,
            },
            status: {
                type: Sequelize.ENUM('CORRECT', 'NOT_CORRECT'),
                allowNull: false,
                unique: false,
                comment: 'To logged if the weather is correct or not'
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
    down: (queryInterface) => queryInterface.dropTable('weathers'),
};