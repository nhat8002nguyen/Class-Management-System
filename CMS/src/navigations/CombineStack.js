import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from './outsidestacks/AuthStack';
import QuizCreationNavigator from './insidestacks/QuizCreationNavigator';
import DoingQuizNavigator from './insidestacks/DoingQuizNavigator';

const Stack = createStackNavigator();

export default CombineStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="AuthScreens"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AuthScreens" component={AuthStack} />
      <Stack.Screen
        name="QuizCreationNavigator"
        component={QuizCreationNavigator}
      />
      <Stack.Screen name="DoingQuizNavigator" component={DoingQuizNavigator} />
    </Stack.Navigator>
  );
};
