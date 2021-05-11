const { QueryTypes } = require('sequelize');
const dbModels = require('../../config/sequelize');

const createGroup = async (classID, userID, data) => {
    const isUserHasGroup = await dbModels.dbConnection.query(
        'SELECT gu.id'
        + ' FROM `Groups` gr INNER JOIN `Group_Users` gu ON gr.id = gu.groupID'
        + ' WHERE gr.classID = :classID AND gu.userID = :userID',
        {
            replacements: {
                classID: classID,
                userID: userID
            },
            type: QueryTypes.SELECT
        }
    );
    if (isUserHasGroup.length > 0) {
        throw new Error('User has already in a group');
    }
    data.classID = classID;
    const group = await dbModels.Groups.create(data);
    await dbModels.Group_Users.create({
        groupID: group.id,
        userID: userID
    });
}

const getGroupList = async (classID) => {
    return await dbModels.Groups.findAll({
        attributes: {
            exclude: ['password']
        },
        where: {
            classID: classID
        }
    });
}

const joinGroup = async (groupID, userID, password) => {
    const group = await dbModels.Groups.findOne({
        where: {
            id: groupID
        }
    });
    if (!group) {
        throw new Error('Group not found');
    }
    if (group.password && group.password !== password) {
        throw new Error('Wrong password');
    }

    const isUserInOtherGroup = await dbModels.dbConnection.query(
        'SELECT gu.id'
        + ' FROM `Groups` gr INNER JOIN `Group_Users` gu ON gr.id = gu.groupID'
        + ' WHERE gr.classID = :classID AND gu.userID = :userID',
        {
            replacements: {
                classID: group.classID,
                groupID: groupID,
                userID: userID
            },
            type: QueryTypes.SELECT,
        }
    );
    if (isUserInOtherGroup.length > 0) {
        throw new Error('User has already in other group');
    }

    const classOfGroup = await dbModels.Classes.findOne({
        where: {
            id: group.classID
        }
    });
    const usersInGroup = await dbModels.Group_Users.count({
        where: {
            groupID: groupID
        }
    });
    if (usersInGroup >= classOfGroup.maxGroupMembers) {
        throw new Error('Group has enough members');
    }

    await dbModels.Group_Users.create({
        groupID: groupID,
        userID: userID
    });
}

module.exports = {
    createGroup: async (req, res, next) => {
        try {
            if (!req.params.classID) {
                return res.status(400).send('No classID');
            }
            if (!req.query.userID) {
                return res.status(400).send('No userID');
            }
            await createGroup(
                req.params.classID, req.query.userID, req.body
            );
            return res.status(200).end();
        } catch (err) {
            return res.status(400).send(err.message);
        }
    },
    getGroupList: async (req, res, next) => {
        try {
            if (!req.params.classID) {
                return res.status(400).send('No classID');
            }
            const groupList = await getGroupList(req.params.classID);
            return res.json(groupList);
        } catch (err) {
            return res.status(400).send(err.message);
        }
    },
    joinGroup: async (req, res, next) => {
        try {
            if (!req.params.groupID) {
                return res.status(400).send('No groupID');
            }
            if (!req.query.userID) {
                return res.status(400).send('No userID');
            }
            await joinGroup(
                req.params.groupID, req.query.userID, req.query.password ? req.query.password : ''
            );
            return res.status(200).end();
        } catch (err) {
            return res.status(400).send(err.message);
        }
    }
}
