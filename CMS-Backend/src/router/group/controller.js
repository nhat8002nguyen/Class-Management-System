const { QueryTypes } = require('sequelize');
const dbModels = require('../../config/sequelize');

const createGroup = async (classID, userID, data) => {
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
            if (!req.id) {
                return res.status(400).send('No userID');
            }
            await createGroup(
                req.params.classID, req.id, req.body
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
            if (!req.id) {
                return res.status(400).send('No userID');
            }
            await joinGroup(
                req.params.groupID, req.id, req.query.password ? req.query.password : ''
            );
            return res.status(200).end();
        } catch (err) {
            return res.status(400).send(err.message);
        }
    }
}
