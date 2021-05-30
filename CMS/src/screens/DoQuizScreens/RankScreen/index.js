import React, { useState,useEffect, } from "react";
import {
  SafeAreaView,
  View,
  Text, Alert,
} from "react-native";
import { Button, ListItem } from "react-native-elements";
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getScoreAfterQuestionInQuiz } from "../../../redux/actions/DoQuizActions";
import { default as ModalLoading } from "../../../components/ModalLoading";
import { SAVE_DATA_FOR_GET_QUESTION } from "../../../redux/constants/DoQuizActionConstants";

export default function RankScreen({ navigation }) {
  const [quizPIN, setQuizPIN] = useState('');
  const [quizName, setQuizName] = useState('');

  const {
    loading,
    questionOrder,
    userName,
    userScore,
    userRank,
    quizInfo,
    top5,
    fetchRankInfoSuccess,
    fetchErr,
    fetchErrMsg
  } = useSelector(state => state.getRankReducer)

  const dispatch = useDispatch();

  const handleClick = () => {
    if (questionOrder < quizInfo.numOfQuestions) {
      dispatch({ type: SAVE_DATA_FOR_GET_QUESTION, payload: { questionOrder: questionOrder + 1, userName, userScore, quizInfo } });

      navigation.replace('AnswerQuizScreen', {});
    } else {
      navigation.replace('Home', {})
    }
  }

  useEffect(() => {
    if (quizInfo) {
      dispatch(getScoreAfterQuestionInQuiz(quizInfo.id));

      setQuizPIN(quizInfo.PIN);
      setQuizName(quizInfo.name);
    }
  }, [quizInfo]);
  useEffect(() => {
    if (fetchErr) {
      Alert.alert(
        "Error when fetching leader board",
        fetchErrMsg
      );
    }
  }, [fetchErr])

  return (
    <SafeAreaView style={styles.container} >
      <View style={{
          flex: 0.15,
          alignItems: 'center',
          justifyContent: 'center',
        }} >
        <Text style={styles.label} > Quiz </Text>
        <Text style={styles.subLabel} > # {quizPIN} </Text>
        <Text style={styles.subLabel} > # {quizName} </Text>
      </View>

      <View style={{
          flex: 0.65,
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: 25,
          paddingRight: 25,
          marginTop: 10
        }} >
        <View style={{
            flex: 0.2,
            alignSelf: 'stretch',
            backgroundColor: '#F28D3E',
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: '#F28D3E',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }} >
          <View style={{
              flex: 0.3,
              justifyContent: 'flex-start',
              paddingTop: 10,
              paddingLeft: 10
            }}>
            <Text style={{
                color: '#FFF',
                textAlign: 'left',
                fontFamily: 'roboto',
                fontSize: 20,
                fontWeight: 'bold'
              }} >
              Your rank
            </Text>
          </View>

          <View style={{
              flex: 0.7,
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 10
            }} >
            <Text style={{
                color: '#FFF',
                textAlign: 'left',
                fontFamily: 'roboto',
                fontSize: 40,
                fontWeight: 'bold'
              }}>
              { userRank }
            </Text>
          </View>
        </View>

        <View style={{
            flex: 0.8,
            alignSelf: 'stretch',
            justifyContent: 'space-evenly',
            backgroundColor: '#FFF',
            borderBottomWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: '#F28D3E',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10
          }} >
          <View style={{
              flex: 0.2,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={{
                color: '#828282',
                fontFamily: 'roboto',
                fontWeight: 'bold',
                fontSize: 32
              }}
            >
              Top 5
            </Text>
          </View>

          <View style={{
              flex: 0.8,
              flexDirection: 'row'
            }} >
            <View style={{
                flex: 0.5,
                // alignItems: 'center'
              }} >
              {
                top5.map((item, i) => (
                  <ListItem key={i} >
                    <ListItem.Content style={{
                      alignItems: 'flex-end'
                    }}>
                      <ListItem.Title style={{
                          fontSize: 24,
                          color: '#828282',
                        }}>
                        {item.name}
                      </ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                ))
              }
            </View>

            <View style={{
                flex: 0.5,
                // alignItems: 'flex-end'
              }} >
              {
                top5.map((item, i) => (
                  <ListItem key={i} >
                    <ListItem.Content style={{
                      alignItems: 'flex-start'
                    }}>
                      <ListItem.Title
                        style={{
                          fontSize: 24,
                          color: '#828282'
                        }}
                      >
                        {item.score}
                      </ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                ))
              }
            </View>
          </View>
        </View>
      </View>

      <View style={{
        flex: 0.1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginRight: 25,
      }} >
        <Button
          title={quizInfo.numOfQuestions === questionOrder ? "Done" : "Next"}
          type="clear"
          containerStyle={styles.button}
          titleStyle={styles.buttonText}
          onPress={handleClick}
        />
      </View>

      <View style={{
          flex: 0.1,
          flexDirection: 'row',
          backgroundColor: '#F28D3E',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10
        }} >
        <View style={{
            flex: 0.5,
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingLeft: 25
          }} >
          <Text style={{
              color: '#FFF',
              textAlign: 'center',
              fontFamily: 'roboto',
              fontSize: 20,
              fontWeight: 'bold'
            }}>
            # {userName}
          </Text>
        </View>

        <View style={{
            flex: 0.5,
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingRight: 25
          }} >
          <Text style={{
              color: '#FFF',
              textAlign: 'center',
              fontFamily: 'roboto',
              fontSize: 20,
              fontWeight: 'bold'
            }} >
            # {userScore}
          </Text>
        </View>
      </View>

      <ModalLoading status={loading} />
    </SafeAreaView>
  );
};
