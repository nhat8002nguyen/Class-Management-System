const {
    addQuestion,
    updateQuestion,
    removeQuestion,
    getQuestionList,
    getQuestionForStudent,
    submitQuestionAnswer,
    getScoreAfterQuestion
} = require('./controller');

const Router = require('express').Router();

Router.post(
    '/staff/quizzes/:quizID/questions',
    addQuestion
);
Router.put(
    '/staff/questions/:questionID',
    updateQuestion
);
Router.delete(
    '/staff/questions/:questionID',
    removeQuestion
);

Router.get(
    '/staff/quizzes/:quizID/questions',
    getQuestionList
);
Router.get(
    '/quizzes/:quizID/questions',
    getQuestionForStudent
);
Router.post(
    '/quizzes/:quizID/questions/:questionID',
    submitQuestionAnswer
);
Router.get(
    '/quizzes/:quizID/score',
    getScoreAfterQuestion
);

module.exports = Router;
