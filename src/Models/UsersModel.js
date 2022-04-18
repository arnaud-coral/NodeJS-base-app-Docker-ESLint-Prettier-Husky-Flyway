export default (sequelize, Sequelize) => {
    const User = sequelize.define('user', {

        client: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        service: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        key: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        pass: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        },
    }, { tableName: 'users' })

    return User
}
