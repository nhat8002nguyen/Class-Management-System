import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Background,
  Logo,
  Header,
  Button,
  Paragraph,
} from '../../../components/atoms';
import {signin} from '../../../redux/actions/userActions';
import {theme} from '../../../styles/theme';

export default function StartScreen({navigation}) {
  const dispatch = useDispatch();
  const {loading, userInfo} = useSelector(state => state.userSignin);

  const onMoveToLogin = () => {
    if (userInfo?._W?.token) {
      dispatch(
        signin({email: userInfo._W.email, password: userInfo._W.password}),
      );
      navigation.reset({
        index: 0,
        routes: [{name: 'Dashboard'}],
      });
    } else {
      navigation.navigate('LoginScreen');
    }
  };

  return (
    <Background>
      <Logo />
      <Header>Class Management system</Header>
      <Paragraph>Teach and learn more easier.</Paragraph>
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <Button mode="contained" onPress={onMoveToLogin}>
          Login
        </Button>
      )}
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}>
        Sign Up
      </Button>
    </Background>
  );
}
