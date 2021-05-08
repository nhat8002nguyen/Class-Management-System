import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  EnterNameScreen,
  EnterPinScreen,
  AnswerQuizScreen,
  RankScreen,
} from '../../screens/DoingQuizScreens';

const Stack = createStackNavigator();

export default DoingQuizNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="EnterPinScreen">
      <Stack.Screen name="EnterPinScreen" component={EnterPinScreen} />
      <Stack.Screen name="EnterNameScreen" component={EnterNameScreen} />
      <Stack.Screen name="AnswerQuizScreen" component={AnswerQuizScreen} />
      <Stack.Screen name="RankScreen" component={RankScreen} />
    </Stack.Navigator>
  );
};
