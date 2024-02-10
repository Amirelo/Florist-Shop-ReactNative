import {FlexStyle, StyleSheet, View} from 'react-native';

interface Props {
  justifyContent?: FlexStyle['justifyContent'];
  marginBottom?: number;
  children: any;
  flex?: number;
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
          flex: props.flex,
        },
      ]}>
      {props.children}
    </View>
  );
};

export default ItemRow;

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
