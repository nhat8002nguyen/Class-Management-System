import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Text, RadioButton} from 'react-native-paper';
import styles from './styles';
import {
  Background,
  Logo,
  Header,
  Button,
  TextInput,
  BackButton,
} from '../../../components/atoms';
import {
  nameValidator,
  emailValidator,
  passwordValidator,
} from '../../../helpers/auth';
import {signup} from '../../../redux/actions/userActions';
import {theme} from '../../../styles/theme';

export default function RegisterScreen({navigation}) {
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
    dispatch(
      signup({email: email.value, password: password.value, type: userType}),
    );
  };

  useEffect(() => {
    if (success) {
      Alert.alert('Signup successful !', 'Move to signin ', [
        {
          text: 'OK',
          onPress: () => navigation.replace('LoginScreen'),
        },
      ]);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      Alert.alert('Something wrong !', 'please try again ', [
        {text: 'OK', onPress: () => console.log('OKE')},
      ]);
    }
  }, [error]);

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
      <View style={styles.userTypes}>
        <View style={styles.userType}>
          <Text>Student</Text>
          <RadioButton
            value={1}
            status={userType === 1 ? 'checked' : 'unchecked'}
            onPress={() => setUserType(1)}></RadioButton>
        </View>
        <View>
          <Text>Teacher</Text>
          <RadioButton
            value={2}
            status={userType === 2 ? 'checked' : 'unchecked'}
            onPress={() => setUserType(2)}></RadioButton>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <Button
          mode="contained"
          onPress={onSignUpPressed}
          style={{marginTop: 24}}>
          Sign Up
        </Button>
      )}
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}
