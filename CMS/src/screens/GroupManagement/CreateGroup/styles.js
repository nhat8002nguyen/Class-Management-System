import {StyleSheet} from 'react-native';

import {colors} from '../../../styles';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
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
    width: '100%',
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
    marginTop: 30, marginBottom: 40
  },
  selectWrap: {
    marginLeft: 20
  }
});

export default styles;
