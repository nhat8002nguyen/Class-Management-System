const sampleClassUsers = [
    {
        classID: 'd92b8c7f-afee-4700-a350-4d9c5b288040',
        userID: 'd92b8c7f-afee-4700-a350-4d9c5b288041'
    },
    {
        classID: 'd92b8c7f-afee-4700-a350-4d9c5b288040',
        userID: 'd92b8c7f-afee-4700-a350-4d9c5b288042'
    },
    {
        classID: 'd92b8c7f-afee-4700-a350-4d9c5b288040',
        userID: 'd92b8c7f-afee-4700-a350-4d9c5b288043'
    },
    {
        classID: 'd92b8c7f-afee-4700-a350-4d9c5b288040',
        userID: 'd92b8c7f-afee-4700-a350-4d9c5b288044'
    }
]

module.exports = async (Class_Users) => {
    for (const classUser of sampleClassUsers) {
        await Class_Users.create(classUser);
    }
}
