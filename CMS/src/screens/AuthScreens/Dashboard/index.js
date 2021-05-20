import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Background, Logo, Header, Button} from '../../../components/atoms';
import {logout} from '../../../redux/actions/userActions';

export default function Dashboard({navigation}) {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{name: 'StartScreen'}],
    });
  };

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
      <Button mode="outlined" onPress={onLogout}>
        Logout
      </Button>
    </Background>
  );
}
