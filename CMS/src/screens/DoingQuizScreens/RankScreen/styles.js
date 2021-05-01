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
  ranksBox: {
    width: 350,
    height: 500,
    backgroundColor: colors.WHITE,
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.PRIMARY,
  },
  rank: {
    height: 100,
    backgroundColor: colors.PRIMARY,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yourRank: {
    color: 'white',
  },
  studentRank: {
    color: colors.WHITE,
    fontSize: 24,
    marginTop: 20,
  },
  topRank: {
    alignItems: 'center',
  },
  topTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 10,
    color: '#828282',
  },
  memberRank: {
    width: '100%',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
  memberItem: {
    color: '#828282',
    fontSize: 16,
  },
  line: {
    backgroundColor: colors.PRIMARY,
    height: 1,
    width: '80%',
    marginTop: 10,
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
