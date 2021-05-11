const sequelize = require('sequelize');
const config = require('../index');
const { initModels } = require('../../repository');

const Logger = require('../winston');

const options = config.DB.options;
options.logging = (log) => {
    Logger.info(log);
}

const dbConnection = new sequelize(
    config.DB.database,
    config.DB.username,
    config.DB.password,
    options
);

const dbModels = initModels(dbConnection);
dbModels.dbConnection = dbConnection;

module.exports = dbModels;
