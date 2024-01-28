import {StyleSheet} from 'react-native';
import {View} from 'react-native';

interface Props {
  paddingHorizontal?: number;
}

const Divider = (props: Props) => {
  return (
    <View style={[styles.view, {paddingHorizontal: props.paddingHorizontal}]} />
  );
};

export default Divider;

const styles = StyleSheet.create({
  view: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
