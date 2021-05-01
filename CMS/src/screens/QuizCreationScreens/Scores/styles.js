import {StyleSheet} from 'react-native';
import {colors, typographys} from '../../../styles/index';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 100,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    color: colors.PRIMARY,
    fontSize: 24,
    fontWeight: typographys.FONT_WEIGHT_BOLD,
  },
  baseText: {
    color: colors.PRIMARY,
  },
  fieldRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default styles;
