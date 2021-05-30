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

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const ClassListScreen = ({navigation}) => {
  const classList = useSelector(state => state.classList);
  const {loading, classes, error} = classList;

  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);

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

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="red" barStyle="dark-content" />
      <Text style={styles.title}>List Class</Text>
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
    </View>
  );
};

export default ClassListScreen;
