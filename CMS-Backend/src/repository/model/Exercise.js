const { DataTypes, UUIDV4 } = require('sequelize');
const Enums = require('../../enums');

module.exports = (Sequelize) => {
    return Sequelize.define(
        'Exercises',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: UUIDV4()
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            type: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: Enums.ExerciseType.PERSONAL
            },
            startTime: {
                type: DataTypes.DATE,
                allowNull: false
            },
            endTime: {
                type: DataTypes.DATE,
                allowNull: false
            },
            classID: {
                type: DataTypes.UUID,
                allowNull: false
            }
        }
    );
}
