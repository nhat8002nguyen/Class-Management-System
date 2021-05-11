const dbModels = require('../../config/sequelize');
const generators = require('../../helper/Generators');
const RedisClient = require('../../config/redis');

const createQuiz = async (classID, data) => {
    const clazz = await dbModels.Classes.findOne({
        where: {
            id: classID
        }
    });
    if (!clazz) {
        throw new Error('Class not found');
    }
    data.PIN = generators.genRandomNumber();
    data.classID = classID;
    const quizInfo = await dbModels.Quizzes.create(data);
    return {
        id: quizInfo.id,
        PIN: quizInfo.PIN
    }
}

const updateQuiz = async (quizID, data) => {
    const quiz = await dbModels.Quizzes.findOne({
        where: {
            id: quizID
        }
    });
    if (!quiz) {
        throw new Error('Quiz not found');
    }
    data = { ...quiz, ...data };
    await dbModels.Quizzes.update(data, {
        where: {
            id: quizID
        }
    });
}

const deleteQuiz = async (quizID) => {
    const quiz = await dbModels.Quizzes.findOne({
        where: {
            id: quizID
        }
    });
    if (!quiz) {
        throw new Error('Quiz not found');
    }
    await dbModels.Quizzes.destroy({
        where: {
            id: quizID
        }
    });
}

const getQuizList = async (classID) => {
    return await dbModels.Quizzes.findAll({
        where: {
            classID
        }
    });
}

const preJoinQuiz = async (quizPIN) => {
    const quiz = await dbModels.Quizzes.findOne({
        where: {
            PIN: quizPIN
        }
    });
    if (!quiz) {
        throw new Error('No quiz is matched with PIN');
    }
    const currentTime = new Date();
    if (quiz.start > currentTime) {
        throw new Error('Quiz is not started');
    }
    if (quiz.end < currentTime) {
        throw new Error('Quiz is ended');
    }
    return quiz;
}

const joinQuiz = async (quizID, userID, userName) => {
    const preUserName = await RedisClient.get(`${quizID}_${userID}`);
    if (preUserName) {
        if (preUserName !== userName) {
            throw new Error(`User has joined the quiz with name: ${preUserName}`);
        }
        const currentQuestionOrder = parseInt(
            await RedisClient.get(`${quizID}_${userID}_QUESTION_ORDER`)
        );
        throw new Error(`User current question order: ${currentQuestionOrder}`);
    }
    const isUserNameExisted = await RedisClient.get(`${quizID}_${userName}`);
    if (isUserNameExisted && isUserNameExisted !== '') {
        throw new Error('Name has been picked by someone else');
    }
    await RedisClient.setex(`${quizID}_${userID}`, 3600, String(userName));
}

module.exports = {
    createQuiz: async (req, res, next) => {
        try {
            if (!req.params.classID) {
                return res.status(400).end();
            }
            const quizInfo = await createQuiz(req.params.classID, req.body);
            return res.json(quizInfo);
        } catch (err) {
            return res.status(400).send(err.message);
        }
    },
    updateQuiz: async (req, res, next) => {
        try {
            if (!req.params.quizID) {
                return res.status(400).end();
            }
            await updateQuiz(req.params.quizID, req.body);
            return res.status(200).end();
        } catch (err) {
            return res.status(400).send(err.message);
        }
    },
    deleteQuiz: async (req, res, next) => {
        try {
            if (!req.params.quizID) {
                return res.status(400).end();
            }
            await deleteQuiz(req.params.quizID);
            return res.status(200).end();
        } catch (err) {
            return res.status(400).send(err.message);
        }
    },
    getQuizList: async (req, res, next) => {
        try {
            if (!req.params.classID) {
                return res.status(400).end();
            }
            const quizzes = await getQuizList(req.params.classID);
            return res.json(quizzes);
        } catch (err) {
            return res.status(400).send(err.message);
        }
    },
    preJoinQuiz: async (req, res, next) => {
        try {
            if (!req.query.PIN) {
                return res.status(400).send('No PIN');
            }
            const quizInfo = await preJoinQuiz(
                req.query.PIN
            );
            return res.json(quizInfo);
        } catch (err) {
            return res.status(400).send(err.message);
        }
    },
    joinQuiz: async (req, res, next) => {
        try {
            if (!req.params.quizID) {
                return res.status(400).send('No quizID');
            }
            if (!req.query.userID || !req.query.userName) {
                return res.status(400).send('No userID or userName');
            }
            await joinQuiz(
                req.params.quizID, req.query.userID, req.query.userName
            );
            return res.status(200).end();
        } catch (err) {
            return res.status(400).send(err.message);
        }
    }
}
