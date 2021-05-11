const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (Sequelize) => {
    return Sequelize.define(
        'Class_Check_Ins',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: UUIDV4()
            },
            checkInID: {
                type: DataTypes.UUID,
                allowNull: false
            },
            userID: {
                type: DataTypes.UUID,
                allowNull: false
            },
            time: {
                type: DataTypes.DATE,
                allowNull: false
            }
        }
    );
}
