import {StyleSheet} from 'react-native';
import {colors, typographys} from '../../styles/index';

const styles = StyleSheet.create({
  title: {
    color: colors.PRIMARY,
    fontSize: 28,
    fontWeight: typographys.FONT_WEIGHT_BOLD,
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    paddingBottom: 100,
    minHeight: 800,
  },
  addClass: {
    position: 'absolute',
    bottom: 150,
    right: 20,
  },
  addIcon: {
    width: 50,
    height: 50,
    resizeMode: 'stretch',
  },
});

export default styles;
