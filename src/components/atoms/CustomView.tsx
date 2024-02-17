import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import themes from '../../themes/themes';

interface Props {
  type: keyof typeof styles;
  children: any;
}

const CustomView = (props: Props) => {
  const currentTheme: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );
  const selectedstyle = props.type ? styles[props.type] : {};
  return <View style={[selectedstyle, {backgroundColor: themes[currentTheme].bgColor}]}>{props.children}</View>;
};

export default CustomView;

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  viewWithOptions: {
    flex: 1,
  },
});
