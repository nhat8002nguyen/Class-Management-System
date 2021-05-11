const {
    createQuiz,
    updateQuiz,
    deleteQuiz,
    getQuizList,
    preJoinQuiz,
    joinQuiz
} = require('./controller');

const Router = require('express').Router();

Router.post(
    '/staff/classes/:classID/quizzes',
    createQuiz
);
Router.put(
    '/staff/quizzes/:quizID',
    updateQuiz
);
Router.delete(
    '/staff/quizzes/:quizID',
    deleteQuiz
);
Router.get(
    '/staff/classes/:classID/quizzes',
    getQuizList
);

Router.post(
    '/quizzes/pre-join',
    preJoinQuiz
);
Router.post(
    '/quizzes/:quizID/join',
    joinQuiz
);

module.exports = Router;
