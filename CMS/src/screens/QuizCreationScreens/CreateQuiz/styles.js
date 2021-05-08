import {StyleSheet, TouchableOpacityComponent} from 'react-native';
import {PRIMARY} from '../../../styles/colors';
import {colors, typographys} from '../../../styles/index';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    paddingBottom: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: typographys.FONT_WEIGHT_BOLD,
    color: colors.PRIMARY,
  },

  title: {
    color: colors.PRIMARY,
    fontSize: 28,
    fontWeight: typographys.FONT_WEIGHT_BOLD,
  },
  testDetail: {
    marginTop: 30,
    width: 360,
    alignItems: 'flex-start',
  },
  bigImage: {
    height: 224,
  },
  image: {
    width: 360,
    height: 220,
  },
  fieldName: {
    color: colors.PRIMARY,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.PRIMARY,
    width: '100%',
    borderRadius: 10,
  },
  inputText: {
    backgroundColor: colors.PRIMARY,
    color: 'white',
  },
  viewQuestions: {
    width: 360,
    alignItems: 'flex-start',
    marginTop: 10,
    height: 200,
  },
  bottomButton: {
    display: 'flex',
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  buttonAdd: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  acceptTest: {
    width: 40,
    height: 40,
  },
});

export default styles;
