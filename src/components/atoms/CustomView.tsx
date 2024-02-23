import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {useSelector} from 'react-redux';
import themes from '../../themes/themes';

interface Props {
  type?: keyof typeof styles;
  children: any;
  justifyContent?: ViewStyle['justifyContent'];
  marignBottom?: ViewStyle['marginBottom'];
  backgroundColor?: ViewStyle['backgroundColor'];
  borderColor?: ViewStyle['borderColor'];
  style?: StyleProp<ViewStyle>;
}

const CustomView = (props: Props) => {
  const currentTheme: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );
  const selectedstyle = props.type ? styles[props.type] : {};
  return (
    <View
      style={[
        selectedstyle,
        {
          backgroundColor: props.backgroundColor
            ? props.backgroundColor
            : themes[currentTheme].bgColor,
          justifyContent: props.justifyContent,
          marginBottom: props.marignBottom,
          borderColor: props.borderColor,
          borderWidth: props.borderColor ? 1 : undefined,
        },
        props.style,
      ]}>
      {props.children}
    </View>
  );
};

export default CustomView;

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
  },
  body: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  viewWithOptions: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  authCard: {
    padding: 16,
    borderRadius: 7,
    marginHorizontal: 16,
    marginTop: '30%',
  },
  itemRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  itemPadding: {
    padding: 12,
    borderRadius: 7,
  },
  itemCardRow: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 7,
  },
  centerScreen: {
    padding: 16,
    top: '40%',
  },
  product_detail_image: {
    width: '100%',
    height: 350,
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
    marginBottom: 20,
  },
});
