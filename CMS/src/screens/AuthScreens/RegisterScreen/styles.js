import {StyleSheet} from 'react-native';
import {theme} from '../../../styles/theme';

export default styles = StyleSheet.create({
  userTypes: {
    flexDirection: 'row',
  },
  userType: {
    marginRight: 100,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
