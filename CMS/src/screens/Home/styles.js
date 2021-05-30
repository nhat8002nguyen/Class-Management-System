import {StyleSheet, Dimensions} from 'react-native'
import {colors} from '../../styles';
const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
  box:{
    height: 200,
    width:  width*0.95,
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
    height: 150,
    width: 160,
  },
  container:{
    flex: 1,
  },
  title:{
    fontWeight: 'bold',
    color: colors.PRIMARY,
    fontSize: 17, marginTop: 10
  },
  checkin:{
    borderRadius: 20, 
    backgroundColor: colors.PRIMARY,
    position: 'absolute',
    bottom: 10,
    right: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40, 
    flexDirection: 'row',
    zIndex: 100
  },
  mediumBoldText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15
  },
  smallBoldText: {
    fontWeight: 'bold',
    marginTop: 15
  },
  input:{
    width: '95%',
    height: 40,
    padding: 10, 
    borderRadius: 10, 
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 5,
    shadowOpacity: 0.9,
    shadowOffset: {height: 13, width: 55},
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    elevation: 6,
    shadowRadius: 15,
  },
  addBtn:{
    width: '60%',
    justifyContent: 'center', 
    alignSelf: 'center', 
    alignItems: 'center',
    backgroundColor: colors.PRIMARY,
    shadowOpacity: 0.9,
    shadowOffset: {height: 13, width: 55},
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    elevation: 6,
    shadowRadius: 15,
    height: 40, 
    borderRadius: 10,
    marginTop: 30
  },
})

export default styles