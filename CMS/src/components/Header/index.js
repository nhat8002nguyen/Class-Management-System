import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../styles';
import {useNavigation} from '@react-navigation/native'
export default Header = ({title, isHome}) => {
  const navigation = useNavigation()
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.PRIMARY} />
      <View style={styles.container}>
        <View style={styles.colLeft}>
          <Ionicons
            onPress={() => (isHome ? null : navigation.goBack())}
            name={isHome ? 'menu' : 'arrow-back'}
            color={colors.WHITE}
            size={35}
          />
        </View>
        <View style={styles.colCenter}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProfileScreen')}
          style={styles.colRight}>
          <MaterialCommunityIcons
            name="account-circle"
            color={colors.WHITE}
            size={35}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.PRIMARY,
    flexDirection: 'row',
    height: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    color: colors.WHITE,
  },
  colLeft: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  colCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 6,
  },
  colRight: {
    justifyContent: 'center',
    alignItems: 'center',

    flex: 1,
  },
});
