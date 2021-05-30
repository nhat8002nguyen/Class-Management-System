const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (Sequelize) => {
    return Sequelize.define(
        'Users',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: UUIDV4()
            },
            type: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            name: {
                type: DataTypes.TEXT
            },
            email: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            password: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        }
    );
}
