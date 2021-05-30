import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity, Alert,
} from "react-native";
import styles from "./styles";
import { default as ModalLoading } from "../../../components/ModalLoading";
import { useDispatch, useSelector } from "react-redux";
import {
  getQuestionInQuiz,
  submitAnswerForQuestionInQuiz,
} from "../../../redux/actions/doQuizActions";
import { SAVE_DATA_FOR_GET_RANK } from "../../../redux/constants/doQuizActionConstants";

export default function AnswerQuizScreen({ navigation }) {
  const [quizPIN, setQuizPIN] = useState("");
  const [quizName, setQuizName] = useState("");
  const [questionName, setQuestionName] = useState("");
  const [questionDescription, setQuestionDescription] = useState("");
  const [questionMediaURL, setQuestionMediaURL] = useState("");
  const [questionAnswers, setQuestionAnswers] = useState([]);

  const {
    loading,
    questionOrder,
    userName,
    userScore,
    quizInfo,
    questionInfo,
    fetchQuestionInfoSuccess,
    fetchErr,
    fetchErrMsg,
    success,
    err,
    errMsg,
  } = useSelector(state => state.answerQuestionReducer);

  const dispatch = useDispatch();

  const answer = (answerIndex) => {
    if (quizInfo && questionInfo) {
      dispatch(submitAnswerForQuestionInQuiz(quizInfo.id, questionInfo.id, answerIndex));
    }
  };
  const answer0 = () => {
    answer(0);
  };
  const answer1 = () => {
    answer(1);
  };
  const answer2 = () => {
    answer(2);
  };
  const answer3 = () => {
    answer(3);
  };

  useEffect(() => {
    if (quizInfo) {
      dispatch(getQuestionInQuiz(quizInfo.id, questionOrder));

      setQuizPIN(quizInfo.PIN);
      setQuizName(quizInfo.name);
    }
  }, [quizInfo]);
  useEffect(() => {
    if (fetchQuestionInfoSuccess && questionInfo) {
      setQuestionName(questionInfo.name);
      setQuestionDescription(questionInfo.description);
      setQuestionMediaURL(questionInfo.mediaURL);
      setQuestionAnswers(questionInfo.answers);
    }
  }, [fetchQuestionInfoSuccess, questionInfo]);
  useEffect(() => {
    if (fetchErr) {
      Alert.alert(
        "Error when fetching question",
        fetchErrMsg,
      );
    }
  }, [fetchErr]);
  useEffect(() => {
    if (success) {
      dispatch({
        type: SAVE_DATA_FOR_GET_RANK,
        payload: { questionOrder, userName, quizInfo },
      });

      navigation.replace('RankScreen', {});
    }
  }, [success]);
  useEffect(() => {
    if (err) {
      Alert.alert(
        "Error when submitting answer",
        errMsg,
      );
    }
  }, [err]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{
        flex: 0.15,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 25,
      }}>
        <Text style={styles.label}>Quiz</Text>
        <Text style={styles.subLabel}># {quizPIN}</Text>
        <Text style={styles.subLabel}># {quizName}</Text>
      </View>

      <View style={{
        flex: 0.75,
        alignItems: "center",
        marginBottom: 25,
        marginLeft: 25,
        marginRight: 25,
      }}>
        <View style={{
          flex: 0.35,
          alignSelf: "stretch",
          backgroundColor: "#F28D3E",
          borderTopWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderColor: "#F28D3E",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}>
          <View style={{
            flex: 0.2,
            justifyContent: "flex-start",
            paddingTop: 10,
            paddingLeft: 10,
          }}>
            <Text style={{
              color: "#FFF",
              textAlign: "left",
              fontFamily: "roboto",
              fontSize: 24,
              fontWeight: "bold",
            }}> #{questionOrder ? questionOrder : 0} - {questionName}</Text>
          </View>

          <View style={{
            flex: 0.8,
            justifyContent: "flex-start",
            paddingLeft: 10,
          }}>
            <Text style={{
              color: "#FFF",
              textAlign: "left",
              fontFamily: "roboto",
              fontSize: 24,
              fontWeight: "bold",
            }}> {questionDescription} </Text>
          </View>
        </View>

        <View style={{
          flex: 0.65,
          flexDirection: "row",
          alignSelf: "stretch",
          justifyContent: "space-evenly",
          backgroundColor: "#FFF",
          borderBottomWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderColor: "#F28D3E",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          paddingTop: 50,
          paddingBottom: 50,
        }}>
          <View
            style={{
              flex: 0.4,
              flexDirection: 'column',
              justifyContent: 'space-evenly'
            }}
          >
            <View style={{
                flex: 0.4,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#E3B440',
                borderRadius: 10
              }}>
              <TouchableOpacity onPress={answer0}>
                <Text style={{
                  fontFamily: "roboto",
                  fontSize: 24,
                  fontWeight: "bold",
                  color: "white",
                }}>
                  {questionAnswers[0] ? questionAnswers[0] : ""}
                </Text>
              </TouchableOpacity>
            </View>

            { questionAnswers.length === 4 &&
              <View
                style={{
                  flex: 0.4,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#0E9D8C',
                  borderRadius: 10
                }}
              >
                <TouchableOpacity onPress={answer2}>
                  <Text style={{
                    fontFamily: "roboto",
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "white",
                  }}>
                    {questionAnswers[2] ? questionAnswers[2] : ""}
                  </Text>
                </TouchableOpacity>
              </View>
            }

          </View>
          <View
            style={{
              flex: 0.4,
              flexDirection: 'column',
              justifyContent: 'space-evenly'
            }}
          >
            <View
              style={{
                flex: 0.4,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#E44E29',
                borderRadius: 10
              }}
            >
              <TouchableOpacity onPress={answer1}>
                <Text style={{
                  fontFamily: "roboto",
                  fontSize: 24,
                  fontWeight: "bold",
                  color: "white",
                }}>
                  {questionAnswers[1] ? questionAnswers[1] : ""}
                </Text>
              </TouchableOpacity>
            </View>

            { questionAnswers.length === 4 &&
              <View style={{
                flex: 0.4,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#164051',
                borderRadius: 10
              }}
              >
                <TouchableOpacity onPress={answer3}>
                  <Text style={{
                    fontFamily: "roboto",
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "white",
                  }}>
                    {questionAnswers[3] ? questionAnswers[3] : ""}
                  </Text>
                </TouchableOpacity>
              </View>
            }
          </View>

          {/*<View style={{*/}
          {/*  flex: 0.4,*/}
          {/*  alignItems: "center",*/}
          {/*  justifyContent: "center",*/}
          {/*  backgroundColor: "#E3B440",*/}
          {/*  borderRadius: 10,*/}
          {/*}}>*/}
          {/*  <TouchableOpacity onPress={answer0}>*/}
          {/*    <Text style={{*/}
          {/*      fontFamily: "roboto",*/}
          {/*      fontSize: 24,*/}
          {/*      fontWeight: "bold",*/}
          {/*      color: "white",*/}
          {/*    }}>*/}
          {/*      {questionAnswers[0] ? questionAnswers[0] : ""}*/}
          {/*    </Text>*/}
          {/*  </TouchableOpacity>*/}
          {/*</View>*/}

          {/*<View style={{*/}
          {/*    flex: 0.4,*/}
          {/*    alignItems: "center",*/}
          {/*    justifyContent: "center",*/}
          {/*    backgroundColor: "#0E9D8C",*/}
          {/*    borderRadius: 10,*/}
          {/*  }}>*/}
          {/*  <TouchableOpacity onPress={answer1}>*/}
          {/*    <Text style={{*/}
          {/*      fontFamily: "roboto",*/}
          {/*      fontSize: 24,*/}
          {/*      fontWeight: "bold",*/}
          {/*      color: "white",*/}
          {/*    }}>*/}
          {/*      {questionAnswers[1] ? questionAnswers[1] : ""}*/}
          {/*    </Text>*/}
          {/*  </TouchableOpacity>*/}
          {/*</View>*/}
        </View>
      </View>

      <View style={{
          flex: 0.1,
          flexDirection: "row",
          backgroundColor: "#F28D3E",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}>
        <View style={{
          flex: 0.5,
          alignItems: "flex-start",
          justifyContent: "center",
          paddingLeft: 25,
        }}>
          <Text style={{
              color: "#FFF",
              textAlign: "center",
              fontFamily: "roboto",
              fontSize: 20,
              fontWeight: "bold",
            }}> # {userName ? userName : ""} </Text>
        </View>

        <View style={{
          flex: 0.5,
          alignItems: "flex-end",
          justifyContent: "center",
          paddingRight: 25,
        }}>
          <Text style={{
            color: "#FFF",
            textAlign: "center",
            fontFamily: "roboto",
            fontSize: 20,
            fontWeight: "bold",
          }}> # {userScore ? userScore : 0} </Text>
        </View>
      </View>

      <ModalLoading status={loading} />
    </SafeAreaView>
  );
};
