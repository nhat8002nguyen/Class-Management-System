import React from 'react';
import { SafeAreaView, View, Text, ScrollView, StyleSheet } from 'react-native';


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
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 100,
    paddingHorizontal: 20,
    paddingTop: 30,

  },
  title: {
    color:  '#F28D3E',
    fontSize: 24,
    fontWeight: '700',
  },
  baseText: {
    color: '#F28D3E',
  },
  fieldRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  }

})

export default Scores;