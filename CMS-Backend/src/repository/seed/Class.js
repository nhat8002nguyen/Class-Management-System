const sampleClasses = [
    {
        id: 'd92b8c7f-afee-4700-a350-4d9c5b288040',
        code: 12345,
        name: 'Sample',
        createdBy: 'd92b8c7f-afee-4700-a350-4d9c5b288040',
        startTime: '07:00:00',
        endTime: '09:50:00',
        location: 'H1-101',
        maxGroupMembers: 3
    }
]

module.exports = async (Classes) => {
    for (const clazz of sampleClasses) {
        await Classes.create(clazz);
    }
}
