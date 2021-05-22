import {StyleSheet, Dimensions} from 'react-native'
import {colors} from '../../styles';
const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
  box:{
    height: width/2,
    width:  width/2.2,
    backgroundColor: 'white',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowOpacity: 0.9,
    shadowOffset: {height: 13, width: 55},
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    elevation: 6,
    shadowRadius: 15,
  },
  image:{
    height: width/2.2 - 30,
    width: width/2.2 - 30,
  },
  container:{
    flex: 1,
  },
  title:{
    fontWeight: 'bold',
    color: colors.PRIMARY,
    fontSize: 17, marginTop: 10
  }
})

export default styles