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
  preJoinQuiz,
} from "../../../redux/actions/doQuizActions";
import { SAVE_DATA_FOR_JOIN_QUIZ } from "../../../redux/constants/doQuizActionConstants";

export default function EnterPINScreen({ navigation }) {
  const [quizPIN, setQuizPIN] = useState("");
  const {
    loading,
    quizInfo,
    fetchQuizInfoSuccess,
    fetchErr,
    fetchErrMsg,
  } = useSelector(state => state.preJoinQuizReducer);

  const dispatch = useDispatch();

  const enterPIN = () => {
    if (quizPIN.length === 0) {
      Alert.alert(
        "Empty PIN",
        "Please enter PIN to start");
      return;
    }

    if (!quizPIN.match(/^-?\d+$/)) {
      Alert.alert(
        "Invalid PIN",
        "Please enter a valid PIN",
      );
      return;
    }

    dispatch(preJoinQuiz(quizPIN));
  };

  useEffect(() => {
    if (fetchQuizInfoSuccess && quizInfo) {
      dispatch({ type: SAVE_DATA_FOR_JOIN_QUIZ, payload: { quizInfo } });

      navigation.navigate("EnterNameScreen");
    }
  }, [fetchQuizInfoSuccess, quizInfo]);
  useEffect(() => {
    if (fetchErr) {
      Alert.alert(
        "Error when fetching quiz info",
        fetchErrMsg,
      );
    }
  }, [fetchErr]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{
        flex: 0.3,
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Text style={styles.label}> Quiz </Text>
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
            keyboardType="numeric"
            placeholder="PIN"
            placeholderTextColor="#828282"
            style={styles.input}
            value={quizPIN}
            onChangeText={text => setQuizPIN(text)}
          />
        </View>

        <View style={{
          flex: 0.1,
        }} />

        <View style={{
          flex: 0.6,
          alignItems: "flex-start",
        }}>
          <Button
            containerStyle={styles.button}
            type="clear"
            title="Enter"
            titleStyle={styles.buttonText}
            onPress={enterPIN}
          />
        </View>

      </View>

      <View style={{
        flex: 0.2,
      }}
      >
      </View>
      <ModalLoading status={loading} />
    </SafeAreaView>
  );
};
