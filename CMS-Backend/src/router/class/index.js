const {
    createClass,
    getClassList,
    createCheckIn,
    getCheckInList,
    getStudentCheckInList,
    joinClass,
    getClassListForStudent,
    getCheckInListForStudent,
    checkIn    
} = require('./controller');

const Router = require('express').Router();

Router.post(
    '/staff/classes',
    createClass
);

Router.get(
    '/staff/classes',
    getClassList
);

Router.post(
    '/staff/classes/:classID/checkIns',
    createCheckIn
);

Router.get(
    '/staff/classes/:classID/checkIns',
    getCheckInList
);

Router.get(
    '/staff/classes/:classID/checkIns/:checkInID/students',
    getStudentCheckInList
);

Router.post(
    '/classes/join',
    joinClass
);

Router.get(
    '/classes',
    getClassListForStudent
);

Router.post(
    '/classes/:classID/checkIns/:checkInID',
    checkIn
);

Router.get(
    '/classes/:classID/checkIns',
    getCheckInListForStudent
);

module.exports = Router;
