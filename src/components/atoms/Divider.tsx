import {StyleSheet} from 'react-native';
import {View} from 'react-native';

interface Props {
  paddingHorizontal?: number;
  marginBottom?: number;
}

const Divider = (props: Props) => {
  return (
    <View
      style={[
        styles.view,
        {
          paddingHorizontal: props.paddingHorizontal,
          marginBottom: props.marginBottom,
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
