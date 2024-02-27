// React and libs
import {DimensionValue, StyleSheet} from 'react-native';
import {View} from 'react-native';
import { useSelector } from 'react-redux';

// User Preferences
import themes from '../../themes/themes';

interface Props {
  paddingHorizontal?: number;
  marginBottom?: number;
  width?: DimensionValue;
}

const Divider = (props: Props) => {
  // User Preferences
  const currentTheme:keyof typeof themes = useSelector((store:any) => store.preference.theme)
  return (
    <View
      style={[
        styles.view,
        {
          paddingHorizontal: props.paddingHorizontal,
          marginBottom: props.marginBottom,
          width: props.width,
          borderColor: themes[currentTheme].textColor

        },
      ]}
    />
  );
};

export default Divider;

const styles = StyleSheet.create({
  view: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
