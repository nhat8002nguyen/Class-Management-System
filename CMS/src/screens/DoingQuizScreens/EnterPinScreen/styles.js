import {StyleSheet} from 'react-native';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import {colors, typographys} from '../../../styles/index';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY,
    minHeight: 800,
    alignItems: 'center',
  },
  title: {
    color: colors.WHITE,
    fontSize: 32,
    fontWeight: typographys.FONT_WEIGHT_BOLD,
    fontFamily: typographys.FONT_FAMILY_BOLD,
    marginTop: 100,
  },
  formInput: {
    marginTop: 150,
    alignItems: 'center',
  },
  pinInput: {
    backgroundColor: colors.WHITE,
    width: 200,
    height: 50,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 24,
  },
  button: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: 100,
    height: 40,
    backgroundColor: colors.WHITE,
  },
  buttonName: {
    fontSize: 16,
    color: colors.PRIMARY,
    fontWeight: '500',
  },
  quizInfo: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizDetails: {
    fontSize: 16,
    color: colors.WHITE,
    fontWeight: typographys.FONT_WEIGHT_REGULAR,
  },
});
