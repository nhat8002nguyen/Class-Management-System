import React from 'react';
import {Background, Logo, Header, Button} from '../../../components/atoms';

export default function Dashboard({navigation}) {
  return (
    <Background>
      <Logo />
      <Header>Let’s start</Header>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{name: 'QuizCreationNavigator'}],
          })
        }>
        Create Quiz
      </Button>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{name: 'DoingQuizNavigator'}],
          })
        }>
        Do Quiz
      </Button>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{name: 'StartScreen'}],
          })
        }>
        Logout
      </Button>
    </Background>
  );
}
