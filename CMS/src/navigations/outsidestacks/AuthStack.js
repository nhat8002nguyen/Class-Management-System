import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
} from '../../screens/AuthScreens';
import QuizCreationNavigator from '../insidestacks/QuizCreationNavigator';
import DoingQuizNavigator from '../insidestacks/DoingQuizNavigator';

const Stack = createStackNavigator();

export default AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="StartScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />

      <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
      <Stack.Screen name="QuizCreationNavigator" component={QuizCreationNavigator} />
      <Stack.Screen name="DoingQuizNavigator" component={DoingQuizNavigator} />
    </Stack.Navigator>
  );
};
