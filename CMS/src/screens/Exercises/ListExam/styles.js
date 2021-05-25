import {StyleSheet} from 'react-native';

import {colors} from '../../../styles';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addBtn: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: colors.PRIMARY,
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 2
  },
  groupItem: {
    padding: 10,
    alignSelf: 'center',
    borderRadius: 10,
    shadowOpacity: 0.9,
    shadowOffset: {height: 13, width: 55},
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    elevation: 6,
    shadowRadius: 15,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: 'white',
    width: '98%',
  },
  mediumBoldText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  smallBoldText: {
    fontWeight: '400',
  },
  modalContainer: {
    padding: 10,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
  },
  input: {
    height: 40,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 10,
    shadowOpacity: 0.9,
    shadowOffset: {height: 13, width: 55},
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    elevation: 6,
    shadowRadius: 15,
  },
  confirmBTn: {
    height: 40,
    width: '60%',
    alignSelf: 'center',
    backgroundColor: colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 10,
  },
  selectWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginLeft: 20,
  },
  row: {
    flexDirection: 'row',
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'white',
    borderBottomColor: '#EBEBEB',
    alignItems: 'flex-end',
    padding: 3,
  },
  btn: {
    height: 40,
    width: '70%',
    borderRadius: 10,
    shadowOpacity: 0.9,
    shadowOffset: {height: 13, width: 55},
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    elevation: 6,
    shadowRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center', marginBottom: 8
  },
});

export default styles;
