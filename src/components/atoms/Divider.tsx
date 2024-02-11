import {DimensionValue, StyleSheet} from 'react-native';
import {View} from 'react-native';

interface Props {
  paddingHorizontal?: number;
  marginBottom?: number;
  width?: DimensionValue;
}

const Divider = (props: Props) => {
  return (
    <View
      style={[
        styles.view,
        {
          paddingHorizontal: props.paddingHorizontal,
          marginBottom: props.marginBottom,
          width: props.width
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
