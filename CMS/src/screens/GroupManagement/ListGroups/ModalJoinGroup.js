import React, {useState} from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
import api from '../api'
import {colors} from '../../../styles';

export default ModalJoinGroup = ({visible, onClose, group, userId}) => {
  const [password, setPassword] = useState('');

  const onConfirm = async ()=>{
    try {
      const res = await api.joinGroup(group.id, userId, password)
    } catch (error) {
      
    }
  }
  const onCloseAndReset = () =>{
    setPassword("")
    onClose()
  }
  return (
    <Modal isVisible={visible} onBackdropPress={onCloseAndReset}>
      <View style={styles.modalContainer}>
        <Text style={styles.mediumBoldText}>Nhập mật khẩu</Text>
        <TextInput
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Mật khẩu"
          style={styles.input}
          secureTextEntry = {true}
        />
        <TouchableOpacity style ={styles.confirmBTn}
          onPress = {onConfirm}
        >
        <Text style = {{...styles.mediumBoldText, color: 'white'}}>Tham gia</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
