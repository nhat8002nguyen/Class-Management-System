import React from 'react';
import {
  Background,
  Logo,
  Header,
  Button,
  Paragraph,
} from '../../../components/atoms';

export default function StartScreen({navigation}) {
  return (
    <Background>
      <Logo />
      <Header>Class Management system</Header>
      <Paragraph>Teach and learn more easier.</Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}>
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}>
        Sign Up
      </Button>
    </Background>
  );
}
