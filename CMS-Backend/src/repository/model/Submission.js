const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (Sequelize) => {
    return Sequelize.define(
        'Submissions',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: UUIDV4()
            },
            uri: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            submitTime: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date()
            },
            submitNote: {
                type: DataTypes.TEXT
            },
            ownerID: {
                type: DataTypes.UUID,
                allowNull: false
            },
            exerciseID: {
                type: DataTypes.UUID,
                allowNull: false
            },
            score: {
                type: DataTypes.FLOAT
            }
        }
    );
}
