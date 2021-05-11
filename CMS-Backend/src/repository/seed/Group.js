const sampleGroups = [
    {
        id: 'd92b8c7f-afee-4700-a350-4d9c5b288040',
        name: 'Sample',
        classID: 'd92b8c7f-afee-4700-a350-4d9c5b288040'
    }
]

module.exports = async (Groups) => {
    for (const group of sampleGroups) {
        await Groups.create(group);
    }
}
