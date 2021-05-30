const { Op, QueryTypes } = require('sequelize');
const dbModels = require('../../config/sequelize');
const Enums = require('../../enums');

const createExercise = async (classID, data) => {
    const clazz = await dbModels.Classes.findOne({
        where: {
            id: classID
        }
    });
    if (!clazz) {
        throw new Error('Class not found');
    }
    data.classID = classID;
    const exercise = await dbModels.Exercises.create(data);
    return exercise.id;
}

const getExerciseList = async (classID) => {
    return dbModels.Exercises.findAll({
        where: {
            classID: classID
        }
    });
}

const getExerciseListForStudent = async (classID, type) => {
    const currentTime = new Date();
    return dbModels.Exercises.findAll({
        where: {
            classID: classID,
            type: type === 'personal' 
            ? Enums.ExerciseType.PERSONAL
            : Enums.ExerciseType.GROUP,
            startTime: {
                [Op.lt]: currentTime
            },
            endTime: {
                [Op.gt]: currentTime
            }
        }
    });
}

const createSubmission = async (exerciseID, userID, body) => {
    const exercise = await dbModels.Exercises.findOne({
        where: {
            id: exerciseID
        }
    });
    if (!exercise) {
        throw new Error('Exercise not found');
    }
    const currentTime = new Date();
    if (exercise.startTime > currentTime) {
        throw new Error('Exercise is not started');
    }
    if (exercise.endTime < currentTime) {
        throw new Error('Exercise is ended');
    }
    let data = {}
    data.exerciseID = exerciseID;
    data = { ...data, ...body };
    switch (exercise.type) {
        case Enums.ExerciseType.PERSONAL:
            data.ownerID = userID;
            break;
        case Enums.ExerciseType.GROUP:
            const groupOfUser = await dbModels.dbConnection.query(
                'SELECT gr.id id'
                + ' FROM `Groups` gr INNER JOIN `Group_Users` gu ON gr.id = gu.groupID'
                + ' WHERE gr.classID = :classID AND gu.userID = :userID',
                {
                    replacements: {
                        classID: exercise.classID,
                        userID: userID
                    },
                    type: QueryTypes.SELECT
                }
            );
            data.ownerID = groupOfUser.id;
            break;
    }
    const submission = await dbModels.Submissions.create(data);
    return submission.id;
}

const getSubmissionList = async (exerciseID) => {
    const exercise = await dbModels.Exercises.findOne({
        where: {
            id: exerciseID
        }
    });

    const submissions = await dbModels.Submissions.findAll({
        where: {
            exerciseID: exerciseID
        },
        raw: true
    });

    const data = [];
    for (const submission of submissions) {
        if (exercise.type === Enums.ExerciseType.PERSONAL) {
            const user = await dbModels.Users.findOne({
                where: {
                    id: submission.ownerID
                }
            });
            data.push({ ...submission, userEmail: user.email });
        } else {
            const group = await dbModels.Groups.findOne({
                where: {
                    id: submission.ownerID
                }
            });
            data.push({ ...submission, groupName: group.name });
        }
    }

    return data;
}

const getSubmissionListForStudent = async (exerciseID, userID) => {
    const exercise = await dbModels.Exercises.findOne({
        where: {
            id: exerciseID
        }
    });
    switch (exercise.type) {
        case Enums.ExerciseType.PERSONAL:
            return await dbModels.Submissions.findAll({
                where: {
                    exerciseID: exerciseID,
                    ownerID: userID
                }
            });
        case Enums.ExerciseType.GROUP:
            const groupOfUser = await dbModels.dbConnection.query(
                'SELECT gr.id id'
                + ' FROM `Groups` gr INNER JOIN `Group_Users` gu ON gr.id = gu.groupID'
                + ' WHERE gr.classID = :classID AND gu.userID = :userID',
                {
                    replacements: {
                        classID: exercise.classID,
                        userID: userID
                    },
                    type: QueryTypes.SELECT
                }
            );
            return await dbModels.Submissions.findAll({
                where: {
                    exerciseID: exerciseID,
                    ownerID: groupOfUser.id
                }
            });
    }

    return await dbModels.Submissions.findAll({
        where: {
            exerciseID: exerciseID,
            ownerID: userID
        }
    });
}

const gradeSubmission = async (submissionID, score) => {
    const submission = await dbModels.Submissions.findOne({
        where: {
            id: submissionID
        }
    });
    if (!submission) {
        throw new Error('Submission not found');
    }
    await dbModels.Submissions.update({ 'score': score }, {
        where: {
            id: submissionID
        }
    });
}

module.exports = {
    createExercise: async (req, res, next) => {
        try {
            if (!req.params.classID) {
                return res.status(400).send('No classID');
            }
            if (!req.body.name) {
                return res.status(400).send('No name');
            }
            if (!req.body.description) {
                return res.status(400).send('No description');
            }
            if (!req.body.type) {
                return res.status(400).send('No type');
            }
            if (!req.body.startTime) {
                return res.status(400).send('No startTime');
            }
            if (!req.body.endTime) {
                return res.status(400).send('No endTime');
            }
            if (req.body.startTime > req.body.endTime) {
                return res.status(400).send('Invalid time range');
            }
            const id = await createExercise(
                req.params.classID, req.body
            );
            return res.json({ id });
        } catch (err) {
            return res.status(400).send(err.message);
        }
    },
    getExerciseList: async (req, res, next) => {
        try {
            if (!req.params.classID) {
                return res.status(400).send('No classID');
            }
            const exerciseList = await getExerciseList(req.params.classID);
            return res.json(exerciseList);
        } catch (err) {
            return res.status(400).send(err.message);
        }
    },
    getExerciseListForStudent: async (req, res, next) => {
        try {
            if (!req.params.classID) {
                return res.status(400).send('No classID');
            }
            if (!req.query.type) {
                return res.status(400).send('No type');
            }
            const exerciseList = await getExerciseListForStudent(
                req.params.classID, req.query.type
            );
            return res.json(exerciseList);
        } catch (err) {
            return res.status(400).send(err.message);
        }
    },    
    createSubmission: async (req, res, next) => {
        try {
            if (!req.params.exerciseID) {
                return res.status(400).send('No exerciseID');
            }
            if (!req.id) {
                return res.status(400).send('No userID');
            }
            if (!req.body.uri) {
                return res.status(400).send('No uri included');
            }
            const id = await createSubmission(
                req.params.exerciseID, req.id, req.body
            );
            return res.json({ id });
        } catch (err) {
            return res.status(400).send(err.message);
        }
    },
    getSubmissionList: async (req, res, next) => {
        try {
            if (!req.params.exerciseID) {
                return res.status(400).send('No exerciseID');
            }
            const submissions = await getSubmissionList(req.params.exerciseID);
            return res.json(submissions);
        } catch (err) {
            return res.status(400).send(err.message);
        }
    },    
    getSubmissionListForStudent: async (req, res, next) => {
        try {
            if (!req.params.exerciseID) {
                return res.status(400).send('No exerciseID');
            }
            if (!req.id) {
                return res.status(400).send('No userID');
            }
            const submissions = await getSubmissionListForStudent(
                req.params.exerciseID, req.id
            );
            return res.json(submissions);
        } catch (err) {
            return res.status(400).send(err.message);
        }
    },
    gradeSubmission: async (req, res, next) => {
        try {
            if (!req.params.submissionID) {
                return res.status(400).send('No submissionID');
            }
            if (!req.body.score) {
                return res.status(400).send('No score');
            }
            await gradeSubmission(
                req.params.submissionID, req.body.score
            );
            return res.status(200).end();
        } catch (err) {
            return res.status(400).send(err.message);
        }
    }   
}
