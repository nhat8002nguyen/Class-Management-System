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
        await RedisClient.psetex(`QUIZ_ID|${quizID}|ORDER|${order}`, 3600, JSON.stringify(question));
    } else {
        question = JSON.parse(question);
    }

    return question;
}

const submitQuestionAnswerForStudent = async (quizID, questionID, userID, answer) => {
    await RedisClient.incr(`QUIZ_ID|${quizID}|USER_ID|${userID}|CUR_QUESTION_ORDER`);

    let question = await RedisClient.get(`QUIZ_ID|${quizID}|QUESTION_ID|${questionID}`);
    if (!question) {
        question = await dbModels.Questions.findOne({
            where: {
                id: questionID
            }
        });
        await RedisClient.psetex(`QUIZ_ID|${quizID}|QUESTION_ID|${questionID}`, 3600, JSON.stringify(question));
    } else {
        question = JSON.parse(question);
    }

    if (parseInt(answer) === parseInt(question.correctAnswer)) {
        const correctAnswerCounter = await RedisClient.incr(`QUIZ_ID|${quizID}|QUESTION_ID|${questionID}|CORRECT_ANSWER_COUNTER`);
        const score = 1000 - (correctAnswerCounter - 1) * 10;
        await RedisClient.zincrby(
            `QUIZ_ID|${quizID}|SCORES`,
            score >= 10 ? score : 10,
            userID
        );
    } else {
        await RedisClient.zincrby(
            `QUIZ_ID|${quizID}|SCORES`,
            0,
            userID
        );
    }
}

const getScoreAfterQuestion = async (quizID, userID) => {
    let userScore = parseInt(await RedisClient.zscore(
        `QUIZ_ID|${quizID}|SCORES`,
        userID
    ));
    let userRank = parseInt(await RedisClient.zrevrank(
        `QUIZ_ID|${quizID}|SCORES`,
        userID
    ));
    userRank++;

    const usersScore = await RedisClient.zrevrange(
        `QUIZ_ID|${quizID}|SCORES`,
        0,
        5,
        "WITHSCORES"
    );
    const top5 = [];
    let rank = 0;
    for (const [userID, userScore] of Object.entries(usersScore)) {
        const userInfo = await dbModels.Users.findOne({
            where: {
                id: userID
            }
        });
        const score = parseInt(userScore);
        top5.push({
            id: userID,
            name: userInfo ? userInfo.name : 'Unknown',
            score: score,
            rank: ++rank
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
            if (!req.id) {
                return res.status(400).send('No userID');
            }
            if (!req.query.answer) {
                return res.status(400).send('No answer');
            }
            await submitQuestionAnswerForStudent(
                req.params.quizID, req.params.questionID,
                req.id, req.query.answer
            );
            return res.status(200).end();
        } catch (err) {
            console.log(err);
            return res.status(400).send(err.message);
        }
    },
    getScoreAfterQuestion: async (req, res, next) => {
        try {
            if (!req.params.quizID) {
                return res.status(400).send('No quizID');
            }
            if (!req.id) {
                return res.status(400).send('No userID');
            }
            const scoreInfo = await getScoreAfterQuestion(
                req.params.quizID, req.id
            );
            return res.json(scoreInfo);
        } catch (err) {
            return res.status(400).send(err.message);
        }
    }
}
