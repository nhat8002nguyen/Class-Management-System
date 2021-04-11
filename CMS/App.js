/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import QuizCreationNavigator from "./src/navigations/QuizCreationNavigator";

const App = () => {
  

  return (
    <NavigationContainer>
      <QuizCreationNavigator />
    </NavigationContainer>
  );
};

export default App;