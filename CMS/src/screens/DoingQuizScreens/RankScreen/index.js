import React, {
  useState,
  useFocusEffect,
  useCallback,
  useLayoutEffect,
} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import styles from './styles';

export default AnswerQuizScreen = () => {
  const topRank = [
    {
      name: 'Name 1',
      score: 'score 1',
    },
    {
      name: 'Name 1',
      score: 'score 1',
    },
    {
      name: 'Name 1',
      score: 'score 1',
    },
    {
      name: 'Name 1',
      score: 'score 1',
    },
    {
      name: 'Name 1',
      score: 'score 1',
    },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz</Text>
      <View style={styles.quizInfo}>
        <Text style={styles.quizDetails}>128030</Text>
        <Text style={styles.quizDetails}>quiz-name</Text>
      </View>
      <View style={styles.ranksBox}>
        <View style={styles.rank}>
          <Text style={styles.yourRank}>Your rank</Text>
          <Text style={styles.studentRank}>#Student-rank</Text>
        </View>
        <View style={styles.topRank}>
          <Text style={styles.topTitle}>Top 5</Text>
          {topRank.map((el, index) => (
            <MemberRank key={index} />
          ))}
        </View>
      </View>
      <View style={styles.scoreBox}>
        <Text style={styles.scoreItem}>#Student-name</Text>
        <Text style={styles.scoreItem}>#Student-score</Text>
      </View>
    </View>
  );
};

const MemberRank = () => {
  return (
    <View style={styles.memberRank}>
      <View style={styles.row}>
        <Text style={styles.memberItem}>#rank1-name</Text>
        <Text style={styles.memberItem}>#rank1-score</Text>
      </View>
      <View style={styles.line}></View>
    </View>
  );
};
