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
  const userSignin = useSelector(state => state.userSignin);
  const {loading} = userSignin;

  const onMoveToLogin = () => {
    if (userSignin?._W?.token) {
      const {userInfo} = userSignin._W;
      dispatch(signin({email: userInfo.email, password: userInfo.password}));
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
