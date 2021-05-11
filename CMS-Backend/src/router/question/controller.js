const dbModels = require('../../config/sequelize');
const RedisClient = require('../../config/redis');

const addQuestion = async (quizID, data) => {
    const quiz = await dbModels.Quizzes.findOne({
        where: {
            id: quizID
        }
    });
    if (!quiz) {
        throw new Error('Quiz not found');
    }
    data.quizID = quizID;
    let counterQuestion = await dbModels.Questions.count({
        where: {
            quizID: quizID
        }
    });
    data.order = ++counterQuestion;
    data.answers = data.answers.join();
    const question = await dbModels.Questions.create(data);
    return question.id;
}

const updateQuestion = async (questionID, data) => {
    const question = await dbModels.Questions.findOne({
        where: {
            id: questionID
        }
    });
    if (!question) {
        throw new Error('Question not found');
    }
    data = { ...question, ...data };
    await dbModels.Questions.update(data, {
        where: {
            id: questionID
        }
    });
}

const removeQuestion = async (questionID) => {
    const question = await dbModels.Questions.findOne({
        where: {
            id: questionID
        }
    });
    if (!question) {
        throw new Error('Question not found');
    }
    await dbModels.Questions.destroy({
        where: {
            id: questionID
        }
    });
}

const getQuestionList = async (quizID) => {
    const questions = await dbModels.Questions.findAll({
        where: {
            quizID: quizID
        }
    });
    for (const question of questions) {
        question.answers = question.answers.split(',');
    }
    return questions;
}

const getQuestionForStudent = async (quizID, order) => {
    let question = await RedisClient.get(`${quizID}_${order}`);
    if (!question) {
        question = await dbModels.Questions.findOne({
            attributes: {
                exclude: ['correctAnswer']
            },
            where: {
                quizID: quizID,
                order: order
            }
        });
        question.answers = question.answers.split(',');
        if (!question) {
            throw new Error('Question not found');
        }
        await RedisClient.psetex(`${quizID}_${order}`, 3600, JSON.stringify(question));
    } else {
        question = JSON.parse(question);
    }

    return question;
}

const submitQuestionAnswerForStudent = async (quizID, questionID, userID, answer) => {
    await RedisClient.incr(`${quizID}_${userID}_QUESTION_ORDER`);

    let question = await RedisClient.get(`${quizID}_${questionID}`);
    if (!question) {
        question = await dbModels.Questions.findOne({
            where: {
                id: questionID
            }
        });
        await RedisClient.psetex(`${quizID}_${questionID}`, 3600, JSON.stringify(question));
    } else {
        question = JSON.parse(question);
    }

    if (parseInt(answer) === parseInt(question.correctAnswer)) {
        const correctAnswerCounter = await RedisClient.incr(`${quizID}_${questionID}_CORRECT_ANSWER_COUNTER`);
        await RedisClient.zincrby(
            `${quizID}_SCORES`,
            1000 - (correctAnswerCounter - 1) * 10,
            userID
        );
    }
}

const getScoreAfterQuestion = async (quizID, userID) => {
    const userScore = parseInt(await RedisClient.zscore(
        `${quizID}_SCORES`,
        userID
    ));
    const userRank = parseInt(await RedisClient.zrevrank(
        `${quizID}_SCORES`,
        userID
    ));
    const usersScore = await RedisClient.zrevrangebyscore(
        `${quizID}_SCORES`,
        '+inf',
        '-inf',
        {
            withscores: "WITHSCORES"
        }
    );
    const top5 = [];
    let rank = 0;
    for (const userID of Object.keys(usersScore)) {
        const userInfo = await dbModels.Users.findOne({
            where: {
                id: userID
            }
        });
        const userScore = parseInt(usersScore[userID]);
        top5.push({
            userID,
            userName: userInfo.name,
            userScore,
            userRank: ++rank
        });
        if (top5.length == 5) {
            break;
        }
    }
    return {
        userScore,
        userRank,
        top5
    }
}

module.exports = {
    addQuestion: async (req, res, next) => {
        try {
            if (!req.params.quizID) {
                return res.status(400).send('No quizID');
            }
            const id = await addQuestion(req.params.quizID, req.body);
            return res.json({ id });
        } catch (err) {
            return res.status(400).send(err.message);
        }
    },
    updateQuestion: async (req, res, next) => {
        try {
            if (!req.params.questionID) {
                return res.status(400).send('No questionID');
            }
            await updateQuestion(req.params.questionID, req.body);
            return res.status(200).end();
        } catch (err) {
            return res.status(400).send(err.message);
        }
    },
    removeQuestion: async (req, res, next) => {
        try {
            if (!req.params.questionID) {
                return res.status(400).send('No questionID');
            }
            await removeQuestion(req.params.questionID);
            return res.status(200).end();
        } catch (err) {
            return res.status(400).send(err.message);
        }
    },
    getQuestionList: async (req, res, next) => {
        try {
            if (!req.params.quizID) {
                return res.status(400).send('No quizID');
            }
            const questionList = await getQuestionList(req.params.quizID);
            return res.json(questionList);
        } catch (err) {
            return res.status(400).send(err.message);
        }
    },
    getQuestionForStudent: async (req, res, next) => {
        try {
            if (!req.params.quizID) {
                return res.status(400).send('No quizID');
            }
            if (!req.query.order) {
                return res.status(400).send('No order');
            }
            const question = await getQuestionForStudent(
                req.params.quizID, req.query.order
            );
            return res.json(question);
        } catch (err) {
            return res.status(400).send(err.message);
        }
    },
    submitQuestionAnswer: async (req, res, next) => {
        try {
            if (!req.params.quizID) {
                return res.status(400).send('No quizID');
            }
            if (!req.params.questionID) {
                return res.status(400).send('No questionID');
            }
            if (!req.query.userID) {
                return res.status(400).send('No userID');
            }
            if (!req.query.answer) {
                return res.status(400).send('No answer');
            }
            await submitQuestionAnswerForStudent(
                req.params.quizID, req.params.questionID,
                req.query.userID, req.query.answer
            );
            return res.status(200).end();
        } catch (err) {
            return res.status(400).send(err.message);
        }
    },
    getScoreAfterQuestion: async (req, res, next) => {
        try {
            if (!req.params.quizID) {
                return res.status(400).send('No quizID');
            }
            if (!req.query.userID) {
                return res.status(400).send('No userID');
            }
            const scoreInfo = await getScoreAfterQuestion(
                req.params.quizID, req.query.userID
            );
            return res.json(scoreInfo);
        } catch (err) {
            return res.status(400).send(err.message);
        }
    }
}
