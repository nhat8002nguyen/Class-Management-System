/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import QuizCreationNavigator from './src/navigations/QuizCreationNavigator';
import DoingQuizNavigator from './src/navigations/DoingQuizNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <DoingQuizNavigator />
    </NavigationContainer>
  );
};

export default App;
