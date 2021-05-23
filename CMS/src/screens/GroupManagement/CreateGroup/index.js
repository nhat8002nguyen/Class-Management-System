import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import styles from './styles';
import {useSelector} from 'react-redux';

import Feather from 'react-native-vector-icons/Feather';
const CLASS_ID = 'd92b8c7f-afee-4700-a350-4d9c5b288040';
import Loading from '../../../components/Loading'
import Header from '../../../components/Header';
import {colors} from '../../../styles';
import SelectComponent from '../../../components/SelectComponent';
import api from '../api';
export default CreateGroup = ({navigation}) => {
  const [grName, setGrName] = useState('');
  const [pass, setPass] = useState('');
  const {userSignin} = useSelector(s => s.userSignin);
  const [showInputTopic, setShowInputTopic] = useState(false);
  const typeRef = useRef([0]);
  const [topic, setTopic] = useState('');
  const [isHandling, setIsHandling] = useState(false)
  const [description, setDescription] = useState('')
  const onChangeInput = (flag, text) => {
    if (flag === 'name') {
      setGrName(text);
    } else if (flag === 'topic') {
      setTopic(text);
    } else if(flag === 'des'){
      setDescription(text)
    } else {
      setPass(text);
    }
  };
  const onAdd = async () => {
    setIsHandling(true)
    try {
      if(grName === "" || pass === "") return 
      const res = await api.createGroup(CLASS_ID, grName, pass)
      console.log(res);
    } catch (error) {
      console.log('Err@CreateGroup', error);
    }
  };
  const listType = [
    {key: 0, value: 'Khoa học'},
    {key: 1, value: 'Nghệ thuật'},
    {key: 3, value: 'Công nghệ'},
    {key: 4, value: 'Ngoại ngữ'},
    {key: 5, value: 'Khác'},
  ];
  const onCheckedType = list => {
    typeRef.current = list;
  };
  const onCheckLast = () => {
    setShowInputTopic(true);
  };
  return (
    <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
      <Header title="Tạo nhóm" isHome={false} navigation={navigation} />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.smallBoldText}>Tên nhóm</Text>
          <TextInput
            value={grName}
            style={styles.input}
            placeholder="Nhập tên nhóm"
            onChangeText={text => onChangeInput('name', text)}
          />
          <Text style={styles.smallBoldText}>Mật khẩu</Text>
          <TextInput
            value={pass}
            style={styles.input}
            placeholder="Nhập mật khẩu"
            onChangeText={text => onChangeInput('pass', text)}
          />
          <Text style={styles.smallBoldText}>Chủ đề của nhóm</Text>
          <View style={styles.selectWrap}>
            <SelectComponent
              items={listType}
              iconColor={colors.PRIMARY}
              checked={typeRef.current}
              multipleChoose={false}
              onChecked={onCheckedType}
              onCheckLast={onCheckLast}
            />
            {showInputTopic && (
              <TextInput
                value={topic}
                style={{...styles.input}}
                placeholder="Nhập chủ đề"
                onChangeText={text => onChangeInput('topic', text)}
              />
            )}
          </View>
          <Text style={styles.smallBoldText}>Mô tả</Text>
          <TextInput
            value={description}
            style={styles.input}
            placeholder="Mô tả ngắn về nhóm này"
            onChangeText={text => onChangeInput('des', text)}
          />

          <TouchableOpacity style={styles.addBtn} onPress={onAdd}>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: 'white'}}>
              Tạo
            </Text>
          </TouchableOpacity>
        </View>
        <Loading visible = {isHandling}/>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
