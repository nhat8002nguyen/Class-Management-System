const currentDate = new Date();
const futureDate = new Date();
futureDate.setTime(futureDate.getTime() + 30 * 60 * 1000);

const sampleExercises = [
    {
        id: 'd92b8c7f-afee-4700-a350-4d9c5b288040',
        name: 'Sample',
        startTime: currentDate,
        endTime: futureDate,
        classID: 'd92b8c7f-afee-4700-a350-4d9c5b288040'
    }
]

module.exports = async (Exercises) => {
    for (const exercise of sampleExercises) {
        await Exercises.create(exercise);
    }
}
