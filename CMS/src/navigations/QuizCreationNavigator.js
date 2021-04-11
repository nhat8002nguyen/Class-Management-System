import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListTest from "../screens/QuizCreationScreens/ListTest";
import CreateQuizzes from "../screens/QuizCreationScreens/CreateQuizzes";
import CreateAQuiz from "../screens/QuizCreationScreens/CreateAQuiz";
import Scores from "../screens/QuizCreationScreens/Scores";

const Stack = createStackNavigator();

const QuizCreationNavigator = () => {
  return (
      
    <Stack.Navigator initialRouteName="ListTest" >
      <Stack.Screen 
        name="ListTest"
        component={ListTest}
        options={{title: "List of Quizzes"}} 
      />
      <Stack.Screen 
        name="CreateQuizzes"
        component={CreateQuizzes}
        options={{title: "Create Quiz"}} 
      />
      <Stack.Screen 
        name="CreateAQuiz"
        component={CreateAQuiz}
        options={{title: "Quiz"}} 
      />
      <Stack.Screen 
        name="Scores"
        component={Scores}
        options={{title: "Scores"}} 
      />
      

    </Stack.Navigator>
  )
}

export default QuizCreationNavigator;