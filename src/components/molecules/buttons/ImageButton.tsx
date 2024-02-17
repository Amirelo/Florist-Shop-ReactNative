import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {CustomButton} from '../../atoms';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {StyleSheet} from 'react-native';
import themes from '../../../themes/themes';
import {useSelector} from 'react-redux';

interface Props {
  icon: IconProp;
  onPressed?(): void;
}

const ImageButton = (props: Props) => {
  const currentTheme: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );

  return (
    <CustomButton
      style={[
        styles.view,
        {backgroundColor: themes[currentTheme].primaryColor},
      ]}
      onPressed={props.onPressed}>
      <FontAwesomeIcon icon={props.icon} color={themes[currentTheme].bgColor} />
    </CustomButton>
  );
};

export default ImageButton;

const styles = StyleSheet.create({
  view: {
    alignSelf: 'baseline',
    padding: 8,
    borderRadius: 7,
  },
});
