const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dbModels = require('../../config/sequelize');
const config = require('../../config');

const signIn = async (email, password) => {
    const user = await dbModels.Users.findOne({
        where: {
            email: email
        }
    });
    if (!user) {
        throw new Error('User not found');
    }

    if (!bcrypt.compareSync(password, user.password)) {
        throw new Error('Wrong password');
    }

    const classesOfUser = await dbModels.Class_Users.findAll({
        where: {
            userID: user.id
        }
    });

    const token = jwt.sign(
        {
            id: user.id
        },
        config.SECRET,
        {
            expiresIn: '30d'
        }
    );

    return {
        token: token,
        userInfo: {
            type: user.type,
            name: user.name,
            email: user.email,
            classIDs: classesOfUser.map((item) => item.classID),

        }
    }
}

const signUp = async (data) => {
    const isUserExisted = await dbModels.Users.findOne({
        where: {
            email: data.email
        }
    });
    if (isUserExisted) {
        throw new Error('User is existed');
    }

    data.password = bcrypt.hashSync(data.password, config.SECRET)
    await dbModels.Users.create(data);
}

module.exports = {
    signIn: async (req, res, next) => {
        try {
            if (!req.body.email || !req.body.password) {
                return res.status(400).end();
            }
            const tokenInfo = await signIn(req.body.email, req.body.password);
            return res.json(tokenInfo);
        } catch (err) {
            return res.status(400).send(err.message);
        }
    },
    signUp: async (req, res, next) => {
        try {
            if (!req.body.email || !req.body.password || !req.body.type) {
                return res.status(400).end();
            }
            await signUp(req.body);
            return res.status(200).end();
        } catch (err) {
            return res.status(400).send(err.message);
        }
    }
}
