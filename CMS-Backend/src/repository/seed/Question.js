const sampleQuestions = [
    {
        id: 'd92b8c7f-afee-4700-a350-4d9c5b288040',
        name: 'Sample 1',
        description: 'Sample',
        answers: ['Answer A', 'Answer B', 'Answer C', 'Answer D'].join(),
        correctAnswer: 0,
        order: 1,
        time: 10,
        quizID: 'd92b8c7f-afee-4700-a350-4d9c5b288040'
    },
    {
        id: 'd92b8c7f-afee-4700-a350-4d9c5b288041',
        name: 'Sample 2',
        description: 'Sample',
        answers: ['Answer A', 'Answer B'].join(),
        correctAnswer: 0,
        order: 2,
        time: 10,
        quizID: 'd92b8c7f-afee-4700-a350-4d9c5b288040'
    }
]

module.exports = async (Questions) => {
    for (const question of sampleQuestions) {
        await Questions.create(question);
    }
}
