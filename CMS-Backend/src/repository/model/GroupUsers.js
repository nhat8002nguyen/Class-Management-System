const { DataTypes } = require('sequelize');

module.exports = (Sequelize) => {
    return Sequelize.define(
        'Group_Users',
        {
            groupID: {
                type: DataTypes.UUID
            },
            userID: {
                type: DataTypes.UUID
            }
        }
    );
}
