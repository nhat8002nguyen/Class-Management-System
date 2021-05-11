const initUserModel = require('./model/User');
const initClassModel = require('./model/Class');
const initClassUsersModel = require('./model/ClassUsers');
const initCheckInModel = require('./model/CheckIn');
const initClassCheckInModel = require('./model/ClassCheckIn');
const initGroupModel = require('./model/Group');
const initGroupUsersModel = require('./model/GroupUsers');
const initExerciseModel = require('./model/Exercise');
const initSubmissionModel = require('./model/Submission');
const initQuizModel = require('./model/Quiz');
const initQuestionModel = require('./model/Question');

const seedUsers = require('./seed/User');
const seedClasses = require('./seed/Class');
const seedClassUsers = require('./seed/ClassUsers');
const seedGroups = require('./seed/Group');
const seedGroupUsers = require('./seed/GroupUsers');
const seedQuizzes = require('./seed/Quiz');
const seedQuestions = require('./seed/Question');

module.exports = {
    initModels: (Sequelize) => {
        const Users = initUserModel(Sequelize);
        const Classes = initClassModel(Sequelize);
        const Class_Users = initClassUsersModel(Sequelize);
        const Check_In = initCheckInModel(Sequelize);
        const Class_Check_In = initClassCheckInModel(Sequelize);
        const Groups = initGroupModel(Sequelize);
        const Group_Users = initGroupUsersModel(Sequelize);
        const Exercises = initExerciseModel(Sequelize);
        const Submissions = initSubmissionModel(Sequelize);
        const Quizzes = initQuizModel(Sequelize);
        const Questions = initQuestionModel(Sequelize);

        return {
            Users,
            Classes,
            Class_Users,
            Check_In,
            Class_Check_In,
            Groups,
            Group_Users,
            Exercises,
            Submissions,
            Quizzes,
            Questions
        }
    },
    seedData: async (dbModels) => {
        await seedUsers(dbModels.Users);
        await seedClasses(dbModels.Classes);
        await seedClassUsers(dbModels.Class_Users);
        await seedGroups(dbModels.Groups);
        await seedGroupUsers(dbModels.Group_Users);
        await seedQuizzes(dbModels.Quizzes);
        await seedQuestions(dbModels.Questions);
    }
}
