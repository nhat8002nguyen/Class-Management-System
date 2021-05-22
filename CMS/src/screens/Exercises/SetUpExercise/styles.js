import {StyleSheet} from 'react-native';

import {colors} from '../../../styles';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10
  },
  mediumBoldText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  smallBoldText: {
    fontWeight: 'bold',
    marginTop: 15
  },
  input:{
    flex: 7,
    height: 35,
    padding: 10, 
    borderRadius: 20, 
    backgroundColor: 'white',
    alignSelf: 'center',
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
    marginTop: 20
  },
  selectWrap: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center', 
    flexWrap: 'wrap'
  },
  box:{
    borderRadius: 10, 
    padding: 5, 
    paddingVertical: 12,
    backgroundColor: 'white',
    shadowOpacity: 0.9,
    shadowOffset: {height: 13, width: 55},
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    elevation: 6,
    shadowRadius: 15,
    marginTop: 10,
    flexDirection: 'row',
    
  },
  row:{
    flexDirection: 'row',
    width: '100%',
    marginTop: 15,
    position: 'absolute',
    bottom: 0, 
    alignSelf: 'center',
    backgroundColor: colors.PRIMARY,
    padding: 10,
  }
});

export default styles;
