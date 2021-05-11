const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (Sequelize) => {
    return Sequelize.define(
        'Classes',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: UUIDV4()
            },
            code : {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            name: {
                type: DataTypes.TEXT,
            },
            createdBy: {
                type: DataTypes.UUID,
                allowNull: false
            },
            startTime: {
                type: DataTypes.TIME
            },
            endTime: {
                type: DataTypes.TIME
            },
            location: {
                type: DataTypes.STRING(32)
            },
            maxGroupMembers: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: -1
            }
        }
    );
}
