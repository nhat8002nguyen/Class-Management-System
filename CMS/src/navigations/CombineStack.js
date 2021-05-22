import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from './outsidestacks/AuthStack';

const Stack = createStackNavigator();

export default CombineStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="AuthScreens"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AuthScreens" component={AuthStack} />
    </Stack.Navigator>
  );
};
