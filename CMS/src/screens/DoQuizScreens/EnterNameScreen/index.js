import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput, Alert,
} from "react-native";
import { Button } from "react-native-elements";
import styles from "./styles";
import { default as ModalLoading } from "../../../components/ModalLoading";
import { useDispatch, useSelector } from "react-redux";
import {
  joinQuiz,
} from "../../../redux/actions/doQuizActions";
import { SAVE_DATA_FOR_GET_QUESTION } from "../../../redux/constants/doQuizActionConstants";

export default function EnterNameScreen({ navigation }) {
  const [quizPIN, setQuizPIN] = useState("");
  const [quizName, setQuizName] = useState("");
  const [userName, setUserName] = useState("");
  const {
    loading,
    questionOrder,
    userScore,
    quizInfo,
    success,
    err,
    errMsg,
  } = useSelector(state => state.joinQuizReducer);

  const dispatch = useDispatch();

  const enterName = async () => {
    if (userName.length === 0) {
      alert("Please enter name to start");
      return;
    }

    dispatch(joinQuiz(quizInfo.id, userName));
  };

  useEffect(() => {
    if (quizInfo) {
      setQuizPIN(quizInfo.PIN);
      setQuizName(quizInfo.name);
    }
  }, [quizInfo]);
  useEffect(() => {
    if (success) {
      dispatch({ type: SAVE_DATA_FOR_GET_QUESTION, payload: { questionOrder, userName, userScore, quizInfo } });

      if (questionOrder && questionOrder !== 1) {
        Alert.alert(
          "Current question order detected",
          `You are at question ${questionOrder} and score ${userScore} in quiz and we will navigate you to the next question.`,
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("AnswerQuizScreen"),
            },
          ],
        );
      } else {
        navigation.navigate("AnswerQuizScreen");
      }
    }
  }, [success]);
  useEffect(() => {
    if (err) {
      Alert.alert(
        "Error when joining quiz",
        errMsg);
    }
  }, [err]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{
        flex: 0.3,
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Text style={styles.label}>Quiz</Text>
        <Text style={styles.subLabel}># {quizPIN}</Text>
        <Text style={styles.subLabel}># {quizName}</Text>
      </View>

      <View style={{
        flex: 0.5,
        alignItems: "center",
        justifyContent: "center",
      }}>
        <View style={{
          flex: 0.3,
          justifyContent: "flex-end",
        }}>
          <TextInput
            placeholder="Name"
            placeholderTextColor="#828282"
            style={styles.input}
            value={userName}
            onChangeText={text => setUserName(text)}
          />
        </View>

        <View style={{
          flex: 0.1,
        }}
        />

        <View style={{
          flex: 0.6,
          justifyContent: "flex-start",
        }}>
          <Button
            title="Enter"
            type="clear"
            containerStyle={styles.button}
            titleStyle={styles.buttonText}
            onPress={enterName}
          />
        </View>

      </View>

      <View style={{
        flex: 0.2,
      }}
      />

      <ModalLoading status={loading} />
    </SafeAreaView>
  );
};
