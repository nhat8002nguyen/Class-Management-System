import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  ActivityIndicator,
} from 'react-native';
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

export default function ProfileScreen({navigation}) {
  const [name, setName] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [userType, setUserType] = useState(1);
  const dispatch = useDispatch();
  const {loading, success, error} = useSelector(state => state.userSignup);

  const onSignUpPressed = () => {
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
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <Button
          mode="contained"
          onPress={onSignUpPressed}
          style={{marginTop: 24}}>
          Update
        </Button>
      )}
      <Button mode="outlined" onPress={onLogout}>
        Logout
      </Button>
      
    </Background>
  );
}