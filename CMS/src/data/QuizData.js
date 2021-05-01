import {v4} from 'uuid';

const dataSample = [
  {
    _quizId: 100,
    quizName: 'Test1',
    quizBeginTime: new Date(1598051730000),
    quizEndTime: new Date(1598051730000),
    quizStatus: 'Lock',
    quizImage:
      'https://cdnimg.vietnamplus.vn/t1200/Uploaded/hmnsy/2019_09_10/phan_thiet.jpg',
    quizDescription: 'Learn about concrete mathematics',
    questions: [
      {
        questionId: 1,
        questionImage:
          'https://cdnimg.vietnamplus.vn/t1200/Uploaded/hmnsy/2019_09_10/phan_thiet.jpg',
        questionDescription: "how's it going 1",
        answers: ['A answers A', 'B answers B', 'C answers C', 'D answers D'],
        questionTime: '5',
      },
      {
        questionId: 2,
        questionImage:
          'https://cdnimg.vietnamplus.vn/t1200/Uploaded/hmnsy/2019_09_10/phan_thiet.jpg',
        questionDescription: "how's it going 2",
        answers: ['A answers A', 'B answers B', 'C answers C', 'D answers D'],
        questionTime: '5',
      },
      {
        questionId: 3,
        questionImage:
          'https://cdnimg.vietnamplus.vn/t1200/Uploaded/hmnsy/2019_09_10/phan_thiet.jpg',
        questionDescription: "how's it going",
        answers: ['A answers A', 'B answers B', 'C answers C', 'D answers D'],
        questionTime: '5',
      },
    ],
  },
  {
    _quizId: 101,
    quizName: 'Test1',
    quizBeginTime: new Date(1598051730000),
    quizEndTime: new Date(1598051730000),
    quizStatus: 'Lock',
    quizImage:
      'https://cdnimg.vietnamplus.vn/t1200/Uploaded/hmnsy/2019_09_10/phan_thiet.jpg',
    quizDescription: 'Learn about concrete mathematics',
    questions: [
      {
        questionId: 1,
        questionImage:
          'https://cdnimg.vietnamplus.vn/t1200/Uploaded/hmnsy/2019_09_10/phan_thiet.jpg',
        questionDescription: "how's it going 1",
        answers: ['A answers A', 'B answers B', 'C answers C', 'D answers D'],
        questionTime: '5',
      },
      {
        questionId: 2,
        questionImage:
          'https://cdnimg.vietnamplus.vn/t1200/Uploaded/hmnsy/2019_09_10/phan_thiet.jpg',
        questionDescription: "how's it going 2",
        answers: ['A answers A', 'B answers B', 'C answers C', 'D answers D'],
        questionTime: '5',
      },
      {
        questionId: 3,
        questionImage:
          'https://cdnimg.vietnamplus.vn/t1200/Uploaded/hmnsy/2019_09_10/phan_thiet.jpg',
        questionDescription: "how's it going",
        answers: ['A answers A', 'B answers B', 'C answers C', 'D answers D'],
        questionTime: '5',
      },
    ],
  },
  {
    _quizId: 102,
    quizName: 'Test1',
    quizBeginTime: new Date(1598051730000),
    quizEndTime: new Date(1598051730000),
    quizStatus: 'Lock',
    quizImage:
      'https://cdnimg.vietnamplus.vn/t1200/Uploaded/hmnsy/2019_09_10/phan_thiet.jpg',
    quizDescription: 'Learn about concrete mathematics',
    questions: [
      {
        questionId: 1,
        questionImage:
          'https://cdnimg.vietnamplus.vn/t1200/Uploaded/hmnsy/2019_09_10/phan_thiet.jpg',
        questionDescription: "how's it going 1",
        answers: ['A answers A', 'B answers B', 'C answers C', 'D answers D'],
        questionTime: '5',
      },
      {
        questionId: 2,
        questionImage:
          'https://cdnimg.vietnamplus.vn/t1200/Uploaded/hmnsy/2019_09_10/phan_thiet.jpg',
        questionDescription: "how's it going 2",
        answers: ['A answers A', 'B answers B', 'C answers C', 'D answers D'],
        questionTime: '5',
      },
      {
        questionId: 3,
        questionImage:
          'https://cdnimg.vietnamplus.vn/t1200/Uploaded/hmnsy/2019_09_10/phan_thiet.jpg',
        questionDescription: "how's it going",
        answers: ['A answers A', 'B answers B', 'C answers C', 'D answers D'],
        questionTime: '5',
      },
    ],
  },
  {
    _quizId: 103,
    quizName: 'Test1',
    quizBeginTime: new Date(1598051730000),
    quizEndTime: new Date(1598051730000),
    quizStatus: 'Lock',
    quizImage:
      'https://cdnimg.vietnamplus.vn/t1200/Uploaded/hmnsy/2019_09_10/phan_thiet.jpg',
    quizDescription: 'Learn about concrete mathematics',
    questions: [
      {
        questionId: 1,
        questionImage:
          'https://cdnimg.vietnamplus.vn/t1200/Uploaded/hmnsy/2019_09_10/phan_thiet.jpg',
        questionDescription: "how's it going 1",
        answers: ['A answers A', 'B answers B', 'C answers C', 'D answers D'],
        questionTime: '5',
      },
      {
        questionId: 2,
        questionImage:
          'https://cdnimg.vietnamplus.vn/t1200/Uploaded/hmnsy/2019_09_10/phan_thiet.jpg',
        questionDescription: "how's it going 2",
        answers: ['A answers A', 'B answers B', 'C answers C', 'D answers D'],
        questionTime: '5',
      },
      {
        questionId: 3,
        questionImage:
          'https://cdnimg.vietnamplus.vn/t1200/Uploaded/hmnsy/2019_09_10/phan_thiet.jpg',
        questionDescription: "how's it going",
        answers: ['A answers A', 'B answers B', 'C answers C', 'D answers D'],
        questionTime: '5',
      },
    ],
  },
];

class QuizData {
  static quizData = dataSample;

  static addQuiz(quizName, quizImage, quizDescription, questions) {
    this.quizData.push({
      ...this.quizData[0],
      _quizId: v4(),
      quizName,
      quizImage,
      quizDescription,
      questions,
    });

    return this.quizData;
  }

  static removeQuiz(_quizId) {
    this.quizData = this.quizData.filter(el => el._quizId !== _quizId);
  }

  static saveQuiz(_quizId, quizName, quizImage, quizDescription, questions) {
    this.quizData = this.quizData.map(quiz =>
      quiz._quizId === _quizId
        ? {...quiz, quizName, quizImage, quizDescription, questions}
        : quiz,
    );

    return this.quizData;
  }
}

export default QuizData;
