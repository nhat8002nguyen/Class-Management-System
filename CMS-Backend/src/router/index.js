const express = require('express');

const UserRouter = require('./user');
const ClassRouter = require('./class');
const GroupRouter = require('./group');
const ExerciseRouter = require('./exercise');
const QuizRouter = require('./quiz');
const QuestionRouter = require('./question');

const Router = express.Router();

// Router.use(UserRouter);
Router.use(ClassRouter);
Router.use(GroupRouter);
Router.use(ExerciseRouter);
Router.use(QuizRouter);
Router.use(QuestionRouter);

const apiRouter = express.Router();

apiRouter.use('/api', Router);

module.exports = apiRouter;
