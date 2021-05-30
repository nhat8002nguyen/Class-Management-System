import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    // alignItems: 'center',
    justifyContent: 'space-between'
  },
  label: {
    color: '#F28D3E',
    textAlign: 'center',
    fontFamily: 'roboto',
    fontSize: 40,
    fontWeight: 'bold'
  },
  subLabel: {
    color: '#828282',
    textAlign: 'left',
    fontFamily: 'roboto',
    fontSize: 20,
    fontWeight: 'bold'
  },
  input: {
    width: 200,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FFF',
    color: '#828282',
    textAlign: 'center',
    fontFamily: 'roboto',
    fontSize: 24,
    fontWeight: 'bold'
  },
  button: {
    width: 100,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#F28D3E',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'roboto',
    fontSize: 24,
    fontWeight: 'bold'
  }
});
