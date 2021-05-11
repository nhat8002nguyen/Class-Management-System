const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (Sequelize) => {
    return Sequelize.define(
        'Class_Users',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: UUIDV4()
            },
            classID: {
                type: DataTypes.UUID,
                allowNull: false
            },
            userID: {
                type: DataTypes.UUID,
                allowNull: false
            }
        }
    );
}
