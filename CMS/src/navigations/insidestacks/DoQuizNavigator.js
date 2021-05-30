import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  EnterPINScreen,
  EnterNameScreen,
  AnswerQuizScreen,
  RankScreen,
} from '../../screens/DoQuizScreens';

const Stack = createStackNavigator();

export default DoQuizNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="EnterPINScreen">
      <Stack.Screen name="EnterPINScreen" component={EnterPINScreen} options={{ headerTitle: 'Enter PIN' }} />
      <Stack.Screen name="EnterNameScreen" component={EnterNameScreen} options={{ headerTitle: 'Enter Name' }} />
      <Stack.Screen name="AnswerQuizScreen" component={AnswerQuizScreen} options={{ headerTitle: 'Answer question', headerLeft: null }} />
      <Stack.Screen name="RankScreen" component={RankScreen} options={{ headerTitle: 'Rank', headerLeft: null }} />
    </Stack.Navigator>
  );
};
