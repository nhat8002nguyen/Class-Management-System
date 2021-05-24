import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native';
import styles from './styles';
import {
  Background,
  Logo,
  Header,
  Button,
  TextInput,
  BackButton,
} from '../../components/atoms';
import {
  nameValidator,
  emailValidator,
  passwordValidator,
} from '../../helpers/auth';
import {theme} from '../../styles/theme';
import {logout} from '../../redux/actions/userActions';
import {set} from 'react-native-reanimated';

export default function ProfileScreen({navigation}) {
  const {userSignin} = useSelector(state => state.userSignin);
  const [userInfo, setUserInfo] = useState('');

  const [name, setName] = useState({value: userInfo.name, error: ''});
  const [email, setEmail] = useState({value: userInfo.email, error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const dispatch = useDispatch();

  useEffect(() => {
    setUserInfo(userSignin ? userSignin.userInfo : '');
  }, [userSignin]);

  useEffect(() => {
    setName({value: userInfo.name});
    setEmail({value: userInfo.email});
    setPassword({value: userInfo.password});
  }, [userInfo]);

  const onUpdateInfo = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError || nameError) {
      setName({...name, error: nameError});
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }
  };

  const onLogout = () => {
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{name: 'AuthScreens'}],
    });
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({value: text, error: ''})}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button mode="contained" onPress={onUpdateInfo} style={{marginTop: 24}}>
        Update
      </Button>
      <Button mode="outlined" onPress={onLogout}>
        Logout
      </Button>
    </Background>
  );
}
