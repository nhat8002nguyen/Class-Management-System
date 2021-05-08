import {StyleSheet} from 'react-native';
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
    color: 'orange',
    fontSize: 28,
    fontWeight: typographys.FONT_WEIGHT_BOLD,
  },
  quizDetail: {
    marginTop: 30,
    width: 360,
    alignItems: 'flex-start',
  },
  image: {
    width: 360,
    height: 220,
  },
  fieldName: {
    color: colors.PRIMARY,
    marginTop: 10,
  },
  answer: {
    marginTop: 20,
    width: '100%',
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.PRIMARY,
    width: '100%',
    borderRadius: 10,
    backgroundColor: colors.PRIMARY,
    color: 'white',
    marginBottom: 5,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  bottomButton: {
    display: 'flex',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  acceptTest: {
    width: 40,
    height: 40,
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: colors.PRIMARY,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
