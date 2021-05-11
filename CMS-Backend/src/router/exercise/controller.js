const { Op, QueryTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
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

const createSubmission = async (exerciseID, userID, file) => {
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
    data = {}
    data.exerciseID = exerciseID;
    const uploadFolder = path.join(
        __dirname,
        `../../../uploads`
    );
    if (!fs.existsSync(uploadFolder)) {
        fs.mkdirSync(uploadFolder, { recursive: true });
    }
    const fileURI = path.join(
        __dirname,
        `../../../uploads/${Date.now()}-${file.name}`
    );
    const fileContent = file.data;
    fs.writeFileSync(fileURI, fileContent);
    data.fileURI = fileURI;
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
    return await dbModels.Submissions.findAll({
        where: {
            exerciseID: exerciseID
        }
    });
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

const downloadSubmission = async (submissionID) => {
    const submission = await dbModels.Submissions.findOne({
        where: {
            id: submissionID
        }
    });
    if (!submission) {
        throw new Error('Submission not found');
    }
    return submission.fileURI;
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
            if (!req.query.userID) {
                return res.status(400).send('No userID');
            }
            console.log(req)
            console.log(req.files)
            if (!req.files || !req.files.submission) {
                return res.status(400).send('No file included');
            }
            const id = await createSubmission(
                req.params.exerciseID, req.query.userID, req.files.submission
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
            if (!req.query.userID) {
                return res.status(400).send('No userID');
            }
            const submissions = await getSubmissionListForStudent(
                req.params.exerciseID, req.query.userID
            );
            return res.json(submissions);
        } catch (err) {
            return res.status(400).send(err.message);
        }
    },    
    downloadSubmission: async (req, res, next) => {
        try {
            if (!req.params.submissionID) {
                return res.status(400).send('No submissionID');
            }
            const submissionURI = await downloadSubmission(req.params.submissionID);
            return res.download(submissionURI);
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
