import React, {useEffect, useState, useRef} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import styles from './styles';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../../../styles'
import moment from 'moment'
export default Group = ({item, onPress}) => {
  return (
    <TouchableOpacity style={styles.groupItem} onPress = {onPress}>
      <View style = {{width: '95%'}}>
        <Text numberOfLines ={1} ellipsizeMode = "tail" style = {styles.mediumBoldText}>{item?.name|| ""}</Text>
        <Text>Bảo mật: Có</Text>
      </View>
      <Feather name="arrow-right" color={colors.PRIMARY} size={20} />
    </TouchableOpacity>
  );
};
