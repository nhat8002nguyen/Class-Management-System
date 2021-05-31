import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Searching from '../../../components/Searching';
import NoData from '../../../components/NoData';
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
import Icon from 'react-native-vector-icons/Ionicons';
import {listQuiz} from '../../../redux/actions/quizActions';
import {theme} from '../../../styles/theme';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const ListTest = ({navigation, route}) => {
  const quizList = useSelector(state => state.quizList);
  const {loading, quizzes, error} = quizList;

  const {classId} = useSelector(state => state.classId);

  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(listQuiz(classId));
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Danh sách các bài quiz',
      headerLeft: () => (
        <Icon name="arrow-back" size={30} onPress={() => onGoBackHome()} />
      ),
    });
    onRefresh();
  }, [navigation, route]);

  const onGoBackHome = () => {
    navigation.navigate('Home');
  };

  const openAddQuiz = () => {
    navigation.replace('CreateQuiz');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="red" barStyle="dark-content" />
      {loading ? (
        <Searching />
      ) : error ? (
        error.message
      ) : (
        <ScrollView
          contentContainerStyle={styles.listQuiz}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {quizzes.length !== 0 ? (
            quizzes.map(quiz => (
              <QuizCard
                key={quiz._quizId}
                {...quiz}
                classId={classId}
                navigation={navigation}
              />
            ))
          ) : (
            <NoData title="Không có bài quiz nào, hãy thêm quiz" />
          )}
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
