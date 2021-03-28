/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import CreateQuizStack from './components/CreateQuickTest/CreateQuizStack';

const App = () => {
  

  return (
    <NavigationContainer>
      <CreateQuizStack />
    </NavigationContainer>
  );
};

export default App;