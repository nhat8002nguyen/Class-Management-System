import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  ListTest,
  CreateQuestion,
  CreateQuiz,
  Scores,
} from '../../screens/QuizCreationScreens';

const Stack = createStackNavigator();

const QuizCreationNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ListTest">
      <Stack.Screen
        name="ListTest"
        component={ListTest}
        options={{title: 'List of Quizzes'}}
      />
      <Stack.Screen
        name="CreateQuiz"
        component={CreateQuiz}
        options={{title: 'Create Quiz'}}
      />
      <Stack.Screen
        name="CreateQuestion"
        component={CreateQuestion}
        options={{title: 'Quiz'}}
      />
      <Stack.Screen
        name="Scores"
        component={Scores}
        options={{title: 'Scores'}}
      />
    </Stack.Navigator>
  );
};

export default QuizCreationNavigator;