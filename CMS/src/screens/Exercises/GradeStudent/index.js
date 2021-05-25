import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Linking,
  ToastAndroid,
} from 'react-native';
import Loading from '../../../components/Loading';
import Header from '../../../components/Header';
import api from '../api';
import styles from './styles';
import Clipboard from '@react-native-community/clipboard';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../../styles';
export default GradeStudent = ({navigation, route}) => {
  const [note, setNote] = useState('');
  const [isHandling, setIsHandling] = useState(false);
  const {userEmail, uri, submitTime, submitNote} = route.params;
  const [score, setScore] = useState('');

  // useEffect(() => {
  //   getData();
  // }, []);
  const onGrade = async () => {
    if (score === '') return;
    try {
      const data = {
        score,
      };
      setIsHandling(true);
      const res = await api.grade(route.params.id, data);
      console.log(res);
      if (res) {
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsHandling(false);
    }
  };
  const onCopy = () => {
    Clipboard.setString(uri);
    ToastAndroid.show('Copy link thành công!', ToastAndroid.SHORT);
  };
  const onBrowse = async () => {
    await Linking.openURL(uri);
  };
  return (
    <View style={{flex: 1}}>
      <Header title="Chấm điểm" isHome={false} navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.smallBoldText}>Email HS/SV</Text>
        <View style={styles.input}>
          <Text>{userEmail || ''}</Text>
        </View>
        <Text style={styles.smallBoldText}>Link bài nộp</Text>
        <View style={styles.input}>
          <Text>{uri || ''}</Text>
          <View style={{...styles.row, position: 'absolute', right: 0}}>
            <AntDesign
              name="copy1"
              color={colors.PRIMARY}
              size={20}
              onPress={onCopy}
            />
            <AntDesign
              name="link"
              color={colors.PRIMARY}
              size={20}
              onPress={onBrowse}
              style={{marginHorizontal: 8}}
            />
          </View>
        </View>
        <Text style={styles.smallBoldText}>Thời gian nộp</Text>
        <View style={styles.input}>
          <Text>{moment(submitTime).format('DD/MM/YYYY HH:mm') || ''}</Text>
        </View>
        <Text style={styles.smallBoldText}>Ghi chú</Text>
        <View style={styles.input}>
          <Text>{submitNote?.length ? submitNote : 'Không'}</Text>
        </View>

        <Text style={styles.smallBoldText}>Chấm điểm</Text>
        <TextInput
          style={{
            width: '30%',
            textAlign: 'center',
            fontSize: 25,
            color: 'red',
            fontWeight: 'bold',
            backgroundColor: 'white',
            padding: 5,
            borderRadius: 10,
            marginTop: 5,
            alignSelf: 'center',
          }}
          placeholder={'0'}
          keyboardType="numeric"
          value={score}
          onChangeText={text => setScore(text)}
        />
        <TouchableOpacity style={styles.addBtn} onPress={onGrade}>
          <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
            Chấm điểm
          </Text>
        </TouchableOpacity>
      </View>

      <Loading visible={isHandling} />
    </View>
  );
};
