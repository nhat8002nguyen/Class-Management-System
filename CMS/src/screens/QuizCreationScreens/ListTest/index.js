import React, {useLayoutEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import QuizCard from '../../../components/molecules/QuizCard';
import styles from './styles';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  RefreshControl,
} from 'react-native';
import {listQuiz} from '../../../redux/actions/quizActions';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const ListTest = ({navigation}) => {
  const isFocused = useIsFocused();
  const quizList = useSelector(state => state.quizList);
  const {loading, quizzes, error} = quizList;

  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(listQuiz());
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const openAddQuiz = () => {
    navigation.navigate('CreateQuiz');
  };

  useLayoutEffect(() => {
    dispatch(listQuiz());
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="red" barStyle="dark-content" />
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        error.message
      ) : (
        <ScrollView
          contentContainerStyle={styles.listQuiz}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {quizzes.map(quiz => (
            <QuizCard key={quiz._quizId} {...quiz} navigation={navigation} />
          ))}
        </ScrollView>
      )}

      <TouchableOpacity style={styles.addQuiz} onPress={() => openAddQuiz()}>
        <Image
          style={styles.addIcon}
          source={require('../../../assets/images/buttonAdd.png')}></Image>
      </TouchableOpacity>
    </View>
  );
};

export default ListTest;
