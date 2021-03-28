import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListTest from "./Screens/ListTest";
import CreateQuizzes from "./Screens/CreateQuizzes";
import CreateAQuiz from "./Screens/CreateAQuiz";
import Scores from "./Screens/Scores";

const Stack = createStackNavigator();

const CreateQuizStack = () => {
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

export default CreateQuizStack;