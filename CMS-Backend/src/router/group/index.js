const {
    createGroup,
    getGroupList,
    joinGroup
} = require('./controller');

const Router = require('express').Router();

Router.post(
    '/classes/:classID/groups',
    createGroup
);

Router.get(
    '/staff/classes/:classID/groups/',
    getGroupList
);

Router.get(
    '/classes/:classID/groups/',
    getGroupList
);

Router.post(
    '/groups/:groupID/members',
    joinGroup
);

module.exports = Router;
