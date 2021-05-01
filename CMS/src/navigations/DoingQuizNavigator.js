import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import EnterPinScreen from '../screens/DoingQuizScreens/EnterPinScreen/index';
import EnterNameScreen from '../screens/DoingQuizScreens/EnterNameScreen/index';
import AnswerQuizScreen from '../screens/DoingQuizScreens/AnswerQuizScreen/index';
import RankScreen from '../screens/DoingQuizScreens/RankScreen/index';

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
