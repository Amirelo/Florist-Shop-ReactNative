import {StyleSheet} from 'react-native';
import {CustomButton, CustomText} from '../../atoms';
import themes from '../../../themes/themes';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {useSelector} from 'react-redux';

interface Props {
  children: string;
  icon: IconProp;
  onPressed?(): void;
  marginBottom?: number;
  marginTop?: number;
}

const SocialButton = (props: Props) => {
  const currentTheme: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );
  return (
    <CustomButton
      style={[
        styles.primary,
        {marginTop: props.marginTop, marginBottom: props.marginBottom,
        borderColor: themes[currentTheme].textSecondaryColor,
      backgroundColor: themes[currentTheme].tertiaryColor},
      ]}
      onPressed={props.onPressed}>
      <FontAwesomeIcon
        color={themes[currentTheme].textColor}
        style={styles.icon}
        size={24}
        icon={props.icon}
      />
      <CustomText type={'subTitle'}>{props.children}</CustomText>
    </CustomButton>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  primary: {
    borderWidth: 1,
    height: 48,
    borderRadius: 7,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    start: 12,
  },
});
