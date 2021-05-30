import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import AuthStack from './outsidestacks/AuthStack';
import Dashboard from '../screens/Dashboard';
import ClassListScreen from '../screens/ClassListScreen';
import StudentClassScreen from '../screens/StudentClassScreen';
import QuizCreationNavigator from './insidestacks/QuizCreationNavigator';
import DoingQuizNavigator from './insidestacks/DoingQuizNavigator';
import {ListGroups, CreateGroup} from '../screens/GroupManagement';
import {
  CreateExercise,
  SetUpExercise,
  ListExam,
  Grade,
} from '../screens/Exercises';
import Home from '../screens/Home';
import ProfileScreen from '../screens/ProfileScreen';
import {Provider} from 'react-redux';
import store from '../redux/store';

const Stack = createStackNavigator();

export default CombineStack = () => {
  return (
    <Provider store={store}>
      <Stack.Navigator
        initialRouteName="AuthScreens"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="AuthScreens" component={AuthStack} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="ClassListScreen" component={ClassListScreen} />
        <Stack.Screen
          name="StudentClassScreen"
          component={StudentClassScreen}
        />
        <Stack.Screen
          name="QuizCreationNavigator"
          component={QuizCreationNavigator}
        />
        <Stack.Screen
          name="DoingQuizNavigator"
          component={DoingQuizNavigator}
        />
        <Stack.Screen name="ListGroups" component={ListGroups} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CreateGroup" component={CreateGroup} />
        <Stack.Screen name="CreateExercise" component={CreateExercise} />
        <Stack.Screen name="SetUpExercise" component={SetUpExercise} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="Exams" component={ListExam} />
        <Stack.Screen name="Grade" component={Grade} />
      </Stack.Navigator>
    </Provider>
  );
};
