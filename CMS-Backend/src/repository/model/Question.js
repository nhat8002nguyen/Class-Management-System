const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (Sequelize) => {
    return Sequelize.define(
        'Questions',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: UUIDV4()
            },
            name: {
                type: DataTypes.TEXT
            },
            description: {
                type: DataTypes.TEXT
            },
            order: {
                type: DataTypes.INTEGER,
                defaultValue: 1
            },
            mediaURL: {
                type: DataTypes.TEXT
            },
            answers: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            correctAnswer: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            time: {
                type: DataTypes.INTEGER
            },
            quizID: {
                type: DataTypes.UUID
            }
        }
    );
}
