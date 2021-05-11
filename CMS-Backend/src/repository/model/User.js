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
            code: {
                type: DataTypes.BIGINT
            },
            name: {
                type: DataTypes.TEXT
            },
            email: {
                type: DataTypes.TEXT
            }
        }
    );
}
