import {StyleSheet, View} from 'react-native';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {CustomButton, CustomText} from '../atoms';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import themes from '../../themes/themes';
import { useSelector } from 'react-redux';

interface Props {
  icon: IconProp;
  title: string;
  data: string;
  viewOnly?: boolean;
  marginTop?: number;
  marginBottom?: number;
  onPressed?(data: string): void;
}

const ItemProfile = (props: Props) => {
  const currentTheme:keyof typeof themes = useSelector((store:any) => store.preference.theme)
  return (
    <CustomButton
      onPressed={() =>
        props.onPressed != undefined ? props.onPressed(props.data) : undefined
      }
      style={[
        styles.view,
        {
          marginTop: props.marginTop,
          marginBottom: props.marginBottom,
          backgroundColor: props.viewOnly
            ? themes[currentTheme].textSecondaryColor
            : themes[currentTheme].tertiaryColor,
        },
      ]}>
      <View style={styles.body}>
        <FontAwesomeIcon
          size={24}
          color={themes[currentTheme].primaryColor}
          style={{marginRight: 12}}
          icon={props.icon}
        />
        <CustomText>{props.title}</CustomText>
      </View>
      <View style={styles.body}>
        <CustomText marginRight={12}>{props.data}</CustomText>
        <FontAwesomeIcon icon={faChevronRight} />
      </View>
    </CustomButton>
  );
};

export default ItemProfile;

const styles = StyleSheet.create({
  view: {
    height: 54,
    borderRadius: 7,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
