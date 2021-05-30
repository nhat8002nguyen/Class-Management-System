const {
    signIn,
    signUp
} = require('./controller');

const Router = require('express').Router();

Router.post(
    '/sign-in',
    signIn
);

Router.post(
    '/sign-up',
    signUp
);

module.exports = Router;
