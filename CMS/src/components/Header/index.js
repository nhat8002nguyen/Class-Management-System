import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../styles';

export default Header = ({title, isHome, navigation}) => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.PRIMARY} />
      <View style={styles.container}>
        <View style={styles.colLeft}>
          <Ionicons
            onPress={() =>
              isHome ? null : navigation.goBack()
            }
            name={isHome ? 'menu' : 'arrow-back'}
            color={colors.WHITE}
            size={35}
          />
        </View>
        <View style={styles.colCenter}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.colRight}>
          {isHome ? (
            <Ionicons name="notifications" color={colors.WHITE} size={30} />
          ) : null}
        </View>
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
