import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Overlay } from 'react-native-elements';

const ModalLoading = ({ status = false }) => (
  <Overlay
    animationType="fade"
    isVisible={status}
    overlayBackgroundColor="transparent"
    width="auto"
    height="auto"
  >
    <ActivityIndicator size="large" color={'#F28D3E'} animating={true} />
  </Overlay>
);

export default ModalLoading;
