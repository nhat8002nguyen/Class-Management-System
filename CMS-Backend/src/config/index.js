const dotenv = require('dotenv');
dotenv.config();

const config = {}

config.SERVER = {
    port: parseInt(process.env.SERVER_PORT)
}

config.DB = {
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    options: {
        host: process.env.DATABASE_HOST,
        dialect: process.env.DATABASE_DIALECT,
        // dialectOptions: {
        //     ssl: {
        //         require: true,
        //         rejectUnauthorized: false 
        //     }
        // }
    }
}
config.alterSyncDB = process.env.ALTER_SYNC_DB === 'true';
config.forceSyncDB = process.env.FORCE_SYNC_DB === 'true';
config.seedDB = process.env.SEED_DB === 'true';

config.REDIS = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
}

module.exports = config;
