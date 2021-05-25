import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import styles from './styles';
export default Group = ({item, onPress}) => {
  return (
    <TouchableOpacity style={styles.groupItem} onPress={()=> onPress(item)}>
      <Image source = {require('../../../assets/images/icongroup.png')} style = {{height: 60, width: 60}}/>
      <View style={{flex: 1, marginLeft: 8}}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.mediumBoldText}>
          {item?.name || ''}
        </Text>
        <Text>Chủ đề: {item.keywords || 'Tất cả '}</Text>
        <Text numberOfLines = {2} ellipsizeMode ='tail'>{item.description || ''}</Text>
      </View>
    </TouchableOpacity>
  );
};
