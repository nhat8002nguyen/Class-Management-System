import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

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
  ActivityIndicator,
} from 'react-native';
import {listQuiz} from '../../../redux/actions/quizActions';
import {theme} from '../../../styles/theme';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const ListTest = ({navigation}) => {
  const quizList = useSelector(state => state.quizList);
  const {loading, quizzes, error} = quizList;

  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(listQuiz());
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useLayoutEffect(() => {
    dispatch(listQuiz());
  }, [navigation]);

  const openAddQuiz = () => {
    navigation.navigate('CreateQuiz');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="red" barStyle="dark-content" />
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
