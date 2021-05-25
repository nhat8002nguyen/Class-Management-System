import React from 'react';
import Modal from 'react-native-modal';
import {View, Image, ActivityIndicator} from 'react-native';
import {colors} from '../../styles';

export default Loading = ({visible}) => {
  return (
    <Modal
      isVisible={visible}
      animationIn="zoomInDown"
      animationOut="zoomOutDown"
      animationOutTiming={500}
      useNativeDriver>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{

            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <Image
            source={require('../../assets/images/loading.gif')}
            style={{height: 200, width: 200}}
          />
        </View>
      </View>
    </Modal>
  );
};
