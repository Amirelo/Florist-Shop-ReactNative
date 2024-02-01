import {StyleSheet} from 'react-native';
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

    marginBottom?: number;
    marginTop?: number;
}

const TextButton = (props: Props) => {
  const selectedStyle = props.type ? props.type : 'tertiary';
  return (
    <CustomButton style={[styles[selectedStyle], {marginTop: props.marginTop, marginBottom: props.marginBottom}]} onPressed={props.onPressed}>
      <CustomText
        color={selectedStyle == 'tertiary' ? 'black' : 'white'}
        type={props.fontSize ? props.fontSize : props.type =='primary' ? 'subTitle':'normal'}>
        {props.children}
      </CustomText>
    </CustomButton>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  primary: {
    backgroundColor: themes['defaultTheme'].primaryColor,
    height: 48,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tertiary: {},
});