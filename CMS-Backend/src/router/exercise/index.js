const {
    createExercise,
    getExerciseList,
    getExerciseListForStudent,
    createSubmission,
    getSubmissionList,
    getSubmissionListForStudent,
    gradeSubmission
} = require('./controller');

const Router = require('express').Router();

Router.post(
    '/staff/classes/:classID/exercises',
    createExercise
);

Router.get(
    '/staff/classes/:classID/exercises',
    getExerciseList
);

Router.get(
    '/classes/:classID/exercises',
    getExerciseListForStudent
);

Router.post(
    '/exercises/:exerciseID/submissions',
    createSubmission
);

Router.get(
    '/staff/exercises/:exerciseID/submissions',
    getSubmissionList
);

Router.get(
    '/exercises/:exerciseID/submissions',
    getSubmissionListForStudent
);

Router.post(
    '/staff/submissions/:submissionID/grade',
    gradeSubmission
);

module.exports = Router;
