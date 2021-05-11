const sampleGroupUsers = [
    {
        groupID: 'd92b8c7f-afee-4700-a350-4d9c5b288040',
        userID: 'd92b8c7f-afee-4700-a350-4d9c5b288042'
    },
    {
        groupID: 'd92b8c7f-afee-4700-a350-4d9c5b288040',
        userID: 'd92b8c7f-afee-4700-a350-4d9c5b288044'
    }
]

module.exports = async (Group_Users) => {
    for (const groupUsers of sampleGroupUsers) {
        await Group_Users.create(groupUsers);
    }
}
