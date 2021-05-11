const { Op, QueryTypes } = require('sequelize');
const dbModels = require('../../config/sequelize');
const generators = require('../../helper/Generators');

const createClass = async (userID, data) => {
    data.code = generators.genRandomNumber();
    data.createdBy = userID;
    const clazz = await dbModels.Classes.create(data);
    return {
        id: clazz.id,
        code: clazz.code
    }
}

const getClassList = async (userID) => {
    return await dbModels.Classes.findAll({
        where: {
            createdBy: userID
        }
    });
}

const createCheckIn = async (classID, data) => {
    data.classID = classID;
    const checkIn = await dbModels.Check_In.create(data);
    return checkIn.id;
}

const getCheckInList = async (classID) => {
    return await dbModels.Check_In.findAll({
        where: {
            classID: classID
        }
    });
}

const getStudentCheckInList = async (checkInID) => {
    return await dbModels.dbConnection.query(
        'SELECT u.id userID, u.name userName, cci.time checkInTime'
        + ' FROM `Check_Ins` ci INNER JOIN `Class_Check_Ins` cci ON ci.id = cci.checkInID'
        + ' INNER JOIN `Users` u ON cci.userID = u.id'
        + ' WHERE ci.id = :checkInID',
        {
            replacements: {
                checkInID: checkInID
            },
            type: QueryTypes.SELECT
        }
    );
}

const joinClass = async (userID, code) => {
    const clazz = await dbModels.Classes.findOne({
        attributes: ['id'],
        where: {
            code: code
        }
    });
    if (!clazz) {
        throw new Error('Invalid code');
    }
    const isUserInClass = await dbModels.Class_Users.findOne({
        where: {
            classID: clazz.id,
            userID: userID
        }
    });
    if (isUserInClass) {
        throw new Error('User has already in class');
    }
    await dbModels.Class_Users.create({
        classID: clazz.id,
        userID: userID
    });
}

const getClassListForStudent = async (userID) => {
    const classesOfUser = await dbModels.Class_Users.findAll({
        where: {
            userID: userID
        }
    })
    return await dbModels.Classes.findAll({
        where: {
            id: {
                [Op.in]: classesOfUser.map((item) => item.classID)
            }
        }
    });
}

const checkIn = async (checkInID, userID) => {
    const currentTime = new Date();
    const checkIn = await dbModels.Check_In.findOne({
        where: {
            id: checkInID
        }
    });
    if (!checkIn) {
        throw new Error('Invalid checkInID');
    }
    if (currentTime < checkIn.startTime) {
        throw new Error('Check in is not started');
    }
    if (currentTime > checkIn.endTime) {
        throw new Error('Check in is ended');
    }
    const isCheckedIn = await dbModels.Class_Check_In.findOne({
        where: {
            checkInID: checkInID,
            userID: userID
        }
    });
    if (!isCheckedIn) {
        await dbModels.Class_Check_In.create({
            checkInID,
            userID,
            time: currentTime
        });
    }
}

const getCheckInListForStudent = async (classID, userID) => {
    const currentTime = new Date();
    const checkInList = await dbModels.Check_In.findAll({
        where: {
            classID: classID
        }
    });
    const checkedInList = await dbModels.Class_Check_In.findAll({
        where: {
            checkInID: {
                [Op.in]: checkInList.map((item) => item.id)
            },
            userID: userID
        }
    });
    const checkedInIDList = checkedInList.map((item) => item.checkInID);
    for (const checkIn of checkInList) {
        if (checkedInIDList.includes(checkIn.id)) {
            checkIn.status = 1;
            continue;
        }
        if (checkIn.startTime >= currentTime && checkIn.endTime <= currentTime) {
            checkIn.status = 0;
            continue;
        }
        checkIn.status = 2;
    }
    return checkInList;
}

module.exports = {
    createClass: async (req, res, next) => {
        try {
            if (!req.query.userID) {
                return res.status(400).send('No userID');
            }
            const classInfo = await createClass(req.query.userID, req.body);
            return res.json(classInfo);
        } catch (err) {
            return res.status(400).send(err.message);
        }
    },
    getClassList: async (req, res, next) => {
        try {
            if (!req.query.userID) {
                return res.status(400).send('No userID');
            }
            const classList = await getClassList(req.query.userID);
            return res.json(classList);
        } catch (err) {
            return res.status(400).send(err.message);
        }
    },
    createCheckIn: async (req, res, next) => {
        try {
            if (!req.params.classID) {
                return res.status(400).send('No classID');
            }
            const id = await createCheckIn(req.params.classID, req.body);
            return res.json({ id });
        } catch (err) {
            return res.status(400).send(err.message);
        }
    },
    getCheckInList: async (req, res, next) => {
        try {
            if (!req.params.classID) {
                return res.status(400).send('No classID');
            }
            const checkInList = await getCheckInList(req.params.classID);
            return res.json(checkInList);
        } catch (err) {
            return res.status(400).send(err.message);
        }
    },
    getStudentCheckInList: async (req, res, next) => {
        try {
            if (!req.params.classID) {
                return res.status(400).send('No classID');
            }
            if (!req.params.checkInID) {
                return res.status(400).send('No checkInID');
            }
            const studentCheckInList = await getStudentCheckInList(req.params.checkInID);
            return res.json(studentCheckInList);
        } catch (err) {
            return res.status(400).send(err.message);
        }
    },
    joinClass: async (req, res, next) => {
        try {
            if (!req.query.userID) {
                return res.status(400).send('No userID');
            }
            if (!req.query.code) {
                return res.status(400).send('No code');
            }
            const id = await joinClass(req.query.userID, req.query.code);
            return res.json({ id });
        } catch (err) {
            return res.status(400).send(err.message);
        }
    },
    getClassListForStudent: async (req, res, next) => {
        try {
            if (!req.query.userID) {
                return res.status(400).send('No userID');
            }
            const classList = await getClassListForStudent(req.query.userID);
            return res.json(classList);
        } catch (err) {
            return res.status(400).send(err.message);
        }
    },
    checkIn: async (req, res, next) => {
        try {
            if (!req.params.classID) {
                return res.status(400).send('No classID');
            }
            if (!req.params.checkInID) {
                return res.status(400).send('No checkInID');
            }
            if (!req.query.userID) {
                return res.status(400).send('No userID');
            }
            await checkIn(req.params.checkInID, req.query.userID);
            return res.status(200).end();
        } catch (err) {
            return res.status(400).send(err.message);
        }
    },
    getCheckInListForStudent: async (req, res, next) => {
        try {
            if (!req.params.classID) {
                return res.status(400).send('No classID');
            }
            if (!req.query.userID) {
                return res.status(400).send('No userID');
            }
            const checkInList = await getCheckInListForStudent(req.params.classID, req.query.userID);
            return res.json(checkInList);
        } catch (err) {
            return res.status(400).send(err.message);
        }
    }
}
