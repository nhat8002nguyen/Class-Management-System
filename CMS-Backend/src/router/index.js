const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config');
const Logger = require('../config/winston');

const ClassRouter = require('./class');
const GroupRouter = require('./group');
const ExerciseRouter = require('./exercise');
const QuizRouter = require('./quiz');
const QuestionRouter = require('./question');
const AuthRouter = require('./auth');

const apiRouter = express.Router();

apiRouter.use((req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(403).end();
    }

    jwt.verify(token, config.SECRET, (err, decoded) => {
        if (err) {
            Logger.warn('Invalid token');
            return res.status(403).end();
        }

        req.id = decoded.id;
        next();
    });
});
apiRouter.use(ClassRouter);
apiRouter.use(GroupRouter);
apiRouter.use(ExerciseRouter);
apiRouter.use(QuizRouter);
apiRouter.use(QuestionRouter);

const router = express.Router();

router.use('/auth', AuthRouter);
router.use('/api', apiRouter);

module.exports = router;
