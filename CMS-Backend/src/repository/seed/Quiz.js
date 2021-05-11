const currentDate = new Date();
const futureDate = new Date();
futureDate.setTime(futureDate.getTime() + 30 * 60 * 1000);

const sampleQuizzes = [
    {
        id: 'd92b8c7f-afee-4700-a350-4d9c5b288040',
        name: 'Quiz 1',
        description: '',
        start: currentDate,
        end: futureDate,
        PIN: '123456',
        classID: 'd92b8c7f-afee-4700-a350-4d9c5b288040'
    }
]

module.exports = async (Quizzes) => {
    for (const quiz of sampleQuizzes) {
        await Quizzes.create(quiz);
    }
}
