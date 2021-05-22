import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import AuthStack from './outsidestacks/AuthStack';
import QuizCreationNavigator from './insidestacks/QuizCreationNavigator';
import DoingQuizNavigator from './insidestacks/DoingQuizNavigator';
import {ListGroups, CreateGroup} from '../screens/GroupManagement';
import {CreateExercise, SetUpExercise} from '../screens/Exercises';
import {Provider} from 'react-redux';
import store from '../redux/store';

const Stack = createStackNavigator();

export default CombineStack = () => {
  return (
    <Provider store={store}>
      <Stack.Navigator
        initialRouteName="ListGroups"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="AuthScreens" component={AuthStack} />
        <Stack.Screen
          name="QuizCreationNavigator"
          component={QuizCreationNavigator}
        />
        <Stack.Screen
          name="DoingQuizNavigator"
          component={DoingQuizNavigator}
        />
        <Stack.Screen name="ListGroups" component={ListGroups} />
        <Stack.Screen name="CreateGroup" component={CreateGroup} />
        <Stack.Screen name="CreateExercise" component={CreateExercise} />
        <Stack.Screen name="SetUpExercise" component={SetUpExercise} />
      </Stack.Navigator>
    </Provider>
  );
};
