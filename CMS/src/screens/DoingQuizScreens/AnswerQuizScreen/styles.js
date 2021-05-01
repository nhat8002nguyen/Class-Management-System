import {StyleSheet} from 'react-native';
import {colors, typographys} from '../../../styles/index';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: typographys.FONT_FAMILY_BOLD,
    fontWeight: typographys.FONT_WEIGHT_BOLD,
    color: colors.PRIMARY,
  },
  quizInfo: {
    marginTop: 10,
  },
  quizDetails: {
    fontSize: 16,
    fontFamily: typographys.FONT_FAMILY_BOLD,
    fontWeight: '700',
    marginTop: 10,
    color: '#828282',
  },
  answersBox: {
    width: 350,
    height: 500,
    backgroundColor: colors.WHITE,
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.PRIMARY,
  },
  questionInfo: {
    height: 220,
    backgroundColor: colors.PRIMARY,
    padding: 10,
    borderRadius: 10,
  },
  questionOrd: {
    color: 'black',
  },
  qContentBox: {
    marginTop: 50,
    height: 120,
  },
  questionContent: {
    color: colors.WHITE,
  },
  answerBox: {
    width: 120,
    height: 100,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  answer: {
    color: 'white',
  },
  scoreBox: {
    height: 50,
    backgroundColor: colors.PRIMARY,
    marginTop: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  scoreItem: {
    color: colors.WHITE,
    fontSize: 16,
    fontFamily: typographys.FONT_FAMILY_REGULAR,
    fontWeight: typographys.FONT_WEIGHT_REGULAR,
  },
});
