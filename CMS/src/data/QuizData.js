import {v4} from 'uuid';

const dataSample = [
  {
    _quizId: 100,
    quizName: 'Test1',
    quizBeginTime: new Date(1598051730000),
    quizEndTime: new Date(1598051730000),
    quizImage:
      'https://cdnimg.vietnamplus.vn/t1200/Uploaded/hmnsy/2019_09_10/phan_thiet.jpg',
    quizDescription: 'Learn about concrete mathematics',
    quizPin: 98436,
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
    quizImage:
      'https://cdnimg.vietnamplus.vn/t1200/Uploaded/hmnsy/2019_09_10/phan_thiet.jpg',
    quizDescription: 'Learn about concrete mathematics',
    quizPin: 23477,
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
    quizImage:
      'https://cdnimg.vietnamplus.vn/t1200/Uploaded/hmnsy/2019_09_10/phan_thiet.jpg',
    quizDescription: 'Learn about concrete mathematics',
    quizPin: 34283,
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
    quizImage:
      'https://cdnimg.vietnamplus.vn/t1200/Uploaded/hmnsy/2019_09_10/phan_thiet.jpg',
    quizDescription: 'Learn about concrete mathematics',
    quizPin: 84928,
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
      quizPin: Math.floor(Math.random() * 90000 + 9999),
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

  static takeQuizWithPin = quizPin => {
    const quizTake = this.quizData.find(
      quiz => quiz.quizPin === parseInt(quizPin),
    );
    if (!quizTake) {
      throw 'Wrong pin !';
      return;
    } else {
      return quizTake;
    }
  };
}

export default QuizData;
