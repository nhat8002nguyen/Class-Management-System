import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import ClassCard from '../../components/molecules/ClassCard';
import styles from './styles';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {listClass} from '../../redux/actions/classActions';
import {theme} from '../../styles/theme';
import {Button} from '../../components/atoms';
import DialogInput from 'react-native-dialog-input';
import axios from 'axios';
import Header from '../../components/Header';
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const StudentClassScreen = ({navigation}) => {
  const [token, setToken] = useState('');
  const {userSignin} = useSelector(state => state.userSignin);

  const classList = useSelector(state => state.classList);
  const {loading, classes, error} = classList;
  const [isDialogVisible, setDialogVisible] = useState(false);

  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setToken(userSignin ? userSignin.token : '');
  }, [userSignin]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(listClass());
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'List Class',
      headerLeft: () => (
        <Icon name="arrow-back" size={30} onPress={() => onGoBackHome()} />
      ),
    });
    dispatch(listClass());
  }, [navigation]);

  const onGoBackHome = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Dashboard'}],
    });
  };

  const onJoinClass = text => {
    axios
      .post('https://cms-backend-whatever.herokuapp.com/api/classes/join', {
        headers: {
          token: token,
        },
        params: {
          code: parseInt(text),
        },
      })
      .then(res => {
        alert('Join successfully');
      })
      .catch(err => {
        alert(err);
      });

    setDialogVisible(false);
  };

  return (
    <View style={styles.container}>
      <Header title="Lớp học của tôi" isHome={true} />
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : error ? (
        error.message
      ) : (
        <ScrollView
          contentContainerStyle={styles.listQuiz}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {classes.map(aClass => (
            <ClassCard key={aClass.id} {...aClass} navigation={navigation} />
          ))}
        </ScrollView>
      )}
      <Button onPress={() => setDialogVisible(true)} mode="outlined">
        Join class
      </Button>
      <DialogInput
        isDialogVisible={isDialogVisible}
        title={'Enter class code'}
        hintInput={'code'}
        submitInput={inputText => onJoinClass(inputText)}
        closeDialog={() => {
          setDialogVisible(false);
        }}></DialogInput>
    </View>
  );
};

export default StudentClassScreen;
