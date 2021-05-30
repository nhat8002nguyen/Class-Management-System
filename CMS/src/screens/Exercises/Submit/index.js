import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import NoData from '../../../components/NoData';
import Loading from '../../../components/Loading';
import Header from '../../../components/Header';
import api from '../api';
import styles from './styles';
import Searching from '../../../components/Searching';
import moment from 'moment';
export default Submit = ({navigation, route}) => {
  const [uri, setUri] = useState('');
  const [note, setNote] = useState('');
  const [isHandling, setIsHandling] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const submitRef = useRef(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await api.getSubmit(route.params.id);
      if (res) {
        submitRef.current = res.data[0];
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async () => {
    if (uri === '') return;
    try {
      const data = {
        uri,
        submitTime: new Date(),
        submitNote: note,
      };
      setIsHandling(true);
      const res = await api.submit(route.params.id, data);
      if (res) {
        await getData()
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsHandling(false);
    }
  };
  return (
    <View style={{flex: 1}}>
      <Header title="Nộp bài" isHome={false} navigation={navigation} />
      {isLoading ? (
        <Searching />
      ) : submitRef.current ? (
        <View style={styles.container}>
          <Text style={styles.mediumBoldText}>Thông tin bài nộp</Text>

          <View style={styles.row}>
            <Text>
              Link bài nộp:{' '}
             
                {submitRef.current.uri}
          
            </Text>
          </View>
          <View style={styles.row}>
            <Text>
              Ngày nộp:{' '}
              {moment(submitRef.current.submitTime).format('DD/MM/YYYY HH:mm')}
            </Text>
          </View>
          <View style={styles.row}>
            <Text>
              Ghi chú:{' '}
              {submitRef.current.submitNote.length? submitRef.current.submitNote: 'Không'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text>
              Tình trạng:{' '}
              {submitRef.current.score? 'Đã chấm điểm': 'Chưa chấm điểm'}
            </Text>
          </View>
          {submitRef.current.score? <View style = {styles.score}>
            <Text style = {{color: 'white'}}>ĐIỂM</Text>
            <Text style = {{color: 'white', fontSize: 20, fontWeight: 'bold'}}>{submitRef.current.score || '0'}/10</Text>
          </View> : null}
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={{...styles.mediumBoldText, textAlign: 'center'}}>Bạn chưa nộp bài</Text>
          <Text style={styles.smallBoldText}>
            Tên bài tập (Google Drive, Github,...)
          </Text>
          <TextInput
            value={uri}
            style={styles.input}
            placeholder="Link bài nộp"
            onChangeText={text => setUri(text)}
          />
          <Text style={styles.smallBoldText}>
            Ghi chú cho giáo viên (nếu có)
          </Text>
          <TextInput
            value={note}
            style={styles.input}
            placeholder="Ghi chú"
            onChangeText={text => setNote(text)}
          />
          <TouchableOpacity onPress={onSubmit} style={styles.addBtn}>
            <Text style={{fontSize: 17, fontWeight: 'bold', color: 'white'}}>
              Nộp bài
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <Loading visible={isHandling} />
    </View>
  );
};
