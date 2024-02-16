import {ColorValue, FlexStyle, StyleSheet, TextStyle} from 'react-native';
import {CustomButton, CustomText} from '../../atoms';
import themes from '../../../themes/themes';

interface Props {
  children: string;
  onPressed?(): void;
  type?: keyof typeof styles;
  fontSize?:
    | 'big'
    | 'small'
    | 'header'
    | 'title'
    | 'subTitle'
    | 'subHeader'
    | 'normal'
    | undefined;
  backgroundColor?: ColorValue;
  textDecorationLine?: TextStyle['textDecorationLine'];
  alignSelf?: FlexStyle['alignSelf'];
  marginBottom?: number;
  marginTop?: number;
}

const TextButton = (props: Props) => {
  const selectedStyle = props.type ? props.type : 'none';
  return (
    <CustomButton
      style={[
        styles[selectedStyle],
        {
          marginTop: props.marginTop,
          marginBottom: props.marginBottom,
          backgroundColor: props.backgroundColor
            ? props.backgroundColor
            : props.type == 'primary'
            ? themes['defaultTheme'].primaryColor
            : props.type == 'tertiary'
            ? 'white'
            : '',
          alignSelf: props.alignSelf,
          width: props.alignSelf ? 'auto' : null
        },
      ]}
      onPressed={props.onPressed}>
      <CustomText
        style={{textDecorationLine: props.textDecorationLine}}
        color={
          selectedStyle == 'none' || selectedStyle == 'tertiary'
            ? 'black'
            : 'white'
        }
        fontWeight={
          selectedStyle == 'none'
            ? 'normal'
            : 'bold'
        }
        type={
          props.fontSize
            ? props.fontSize
            : props.type == 'primary'
            ? 'subTitle'
            : 'normal'
        }>
        {props.children}
      </CustomText>
    </CustomButton>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  primary: {
    height: 48,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tertiary: {
    height: 48,
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: 'white',
    borderColor: themes['defaultTheme'].textSecondaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  none: {},
});
