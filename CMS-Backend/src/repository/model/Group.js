const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (Sequelize) => {
    return Sequelize.define(
        'Groups',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: UUIDV4()
            },
            name: {
                type: DataTypes.TEXT
            },
            password: {
                type: DataTypes.TEXT
            },
            description: {
                type: DataTypes.TEXT
            },
            keywords: {
                type: DataTypes.TEXT
            },
            classID: {
                type: DataTypes.UUID
            }
        }
    );
}
