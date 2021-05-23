import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import styles from './styles';
import {Text} from 'react-native-paper';
import {
  Background,
  Logo,
  Header,
  Button,
  TextInput,
  BackButton,
} from '../../../components/atoms';
import {passwordValidator, emailValidator} from '../../../helpers/auth';
import {signin} from '../../../redux/actions/userActions';
import {theme} from '../../../styles/theme';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const dispatch = useDispatch();
  const {loading, userInfo, success, error} = useSelector(
    state => state.userSignin,
  );

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }
    dispatch(signin({email: email.value, password: password.value}));
  };

  useEffect(() => {
    if (userInfo?.token) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    }
  }, [userInfo]);

  useEffect(() => {
    if (success) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      Alert.alert('Email or password is invalid !', 'please try again ', [
        {text: 'OK', onPress: () => console.log('OKE')},
      ]);
    }
  }, [error]);

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back.</Header>
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
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <Button mode="contained" onPress={onLoginPressed}>
          Login
        </Button>
      )}
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}
