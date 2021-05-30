import React, {useRef, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
import api from '../api';
import {colors} from '../../../styles';
import Feather from 'react-native-vector-icons/Feather';

export default ModalJoinGroup = ({visible, onClose, group, _onConfirm}) => {
  const [password, setPassword] = useState('');
  const [isHandling, setIsHandling] = useState(false);
  const err = useRef('');
  const onConfirm = async () => {
    try {
      setIsHandling(true);
      const res = await api.joinGroup(group.id, password);
      if (res) {
        onCloseAndReset();
      } else {
        err.current = 'Sai mật khẩu';
      }
    } catch (error) {
      err.current = 'Sai mật khẩu';
      console.log('Err@JoinGroup', error);
    } finally {
      setIsHandling(false);
    }
  };
  const __onConfirm = async() =>{
    setIsHandling(true)
    await _onConfirm(password)
    setIsHandling(false)
  }
  const onCloseAndReset = () => {
    setPassword('');
    setIsHandling(false);
    err.current = '';
    onClose();
  };
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onCloseAndReset}
      animationIn="zoomInDown"
      animationOut="zoomOutDown"
      animationOutTiming={500}
      useNativeDriver>
      <View style={styles.modalContainer}>
        <Text style={styles.mediumBoldText}>Nhập mật khẩu hoặc ID</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 8,
          }}>
          {/* <Feather name="lock" color={colors.PRIMARY} size={30}/> */}
          <TextInput
            value={password}
            onChangeText={text => setPassword(text)}
            placeholder="Mật khẩu/ID"
            style={{
              height: 40,
              width: '95%',
              marginTop: 5,
              borderWidth: 1,
              borderColor: 'white',
              borderBottomColor: colors.PRIMARY,
            }}
          />
        </View>
        <Text style={{color: 'red'}}>{err.current}</Text>
        <TouchableOpacity
          style={styles.confirmBTn}
          onPress={() => (_onConfirm ? __onConfirm() : onConfirm)}>
          {isHandling ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={{...styles.mediumBoldText, color: 'white'}}>
              Tham gia
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
