/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {theme} from './src/styles/theme';
import AuthStack from './src/navigations/outsidestacks/AuthStack';
import CombineStack from './src/navigations/CombineStack';
import QuizCreationNavigator from './src/navigations/insidestacks/QuizCreationNavigator';

const App = () => {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <QuizCreationNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
