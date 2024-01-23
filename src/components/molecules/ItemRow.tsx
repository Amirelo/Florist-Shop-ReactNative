import {FlexStyle, StyleSheet, View} from 'react-native';

interface Props {
  leftWidget: React.JSX.Element;
  rightWidget: React.JSX.Element;
  justifyContent?: FlexStyle['justifyContent'];
  marginBottom?: number;
}

const ItemRow = (props: Props) => {
  return (
    <View
      style={[
        styles.view,
        {
          marginBottom: props.marginBottom,
          justifyContent: props.justifyContent
            ? props.justifyContent
            : 'space-between',
        },
      ]}>
      {props.leftWidget}
      {props.rightWidget}
    </View>
  );
};

export default ItemRow;

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
  },
});
