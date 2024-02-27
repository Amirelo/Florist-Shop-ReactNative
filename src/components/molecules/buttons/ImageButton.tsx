// React and libs
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {StyleSheet} from 'react-native';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {useSelector} from 'react-redux';

// Components
import {CustomButton} from '../../atoms';

// User Preferences
import themes from '../../../themes/themes';

interface Props {
  icon: IconProp;
  onPressed?(): void;
}

const ImageButton = (props: Props) => {
  // Get selected theme
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
