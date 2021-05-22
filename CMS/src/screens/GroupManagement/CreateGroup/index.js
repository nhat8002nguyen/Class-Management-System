import React, {useEffect, useState, useRef} from 'react';
import {View, TouchableOpacity, Text, FlatList, TextInput} from 'react-native';
import styles from './styles';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../../../components/Header';
import {colors} from '../../../styles';
import SelectComponent from '../../../components/SelectComponent';
export default CreateGroup = ({navigation}) => {
  const [grName, setGrName] = useState('');
  const [pass, setPass] = useState('');
  const [showInputTopic, setShowInputTopic] = useState(false);
  const typeRef = useRef([0]);
  const [topic, setTopic] = useState('');
  const onChangeInput = (flag, text) => {
    if (flag === 'name') {
      setGrName(text);
    } else if (flag === 'topic') {
      setTopic(text);
    } else {
      setPass(text);
    }
  };
  const onAdd = async () => {
    navigation.goBack();
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
  }
  return (
    <>
      <Header title="Tạo nhóm" isHome={false} navigation={navigation} />
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
          value={pass}
          style={styles.input}
          placeholder="Mô tả ngắn về nhóm này"
          onChangeText={text => onChangeInput('pass', text)}
        />
        <TouchableOpacity style={styles.addBtn} onPress={onAdd}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: 'white'}}>
            Tạo
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
