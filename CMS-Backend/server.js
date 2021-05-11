const express = require('express');
const fileUpload = require('express-fileupload');
const { urlencoded, json } = require('body-parser');

const config = require('./src/config');

const router = require('./src/router');

const dbModels = require('./src/config/sequelize');
const { seedData } = require('./src/repository');

const server = express();
const port = process.env.PORT || config.SERVER.port;

server.use(urlencoded({ extended: false }));
server.use(json());
server.use(fileUpload());
server.use(router);

server.listen(port, () => {
    console.log(`Start server successfully at port ${port}`);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled rejection', reason, promise);
});
process.on('uncaughtException', (error, origin) => {
    console.error('Uncaught exception', error, origin);
});

module.exports = () => {
    dbModels.dbConnection
        .sync({
            alter: config.alterSyncDB,
            force: config.forceSyncDB
        })
        .then(() => {
            if (config.seedDB) {
                seedData(dbModels);
            }
        })
}
