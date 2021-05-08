import React from 'react';
import {SafeAreaView, View, Text, ScrollView, StyleSheet} from 'react-native';
import styles from './styles';

const Scores = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>All Score</Text>
      <View style={styles.fieldRow}>
        <Text style={styles.baseText}>MSSV</Text>
        <Text style={styles.baseText}>Mark</Text>
      </View>
      <ScrollView>
        <View style={styles.row}>
          <Text style={styles.baseText}>1712474</Text>
          <Text style={styles.baseText}>13</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.baseText}>1712474</Text>
          <Text style={styles.baseText}>13</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Scores;
