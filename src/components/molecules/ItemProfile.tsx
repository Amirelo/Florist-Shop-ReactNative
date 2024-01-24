import {StyleSheet, View} from 'react-native';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {CustomText} from '../atoms';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import themes from '../../themes/themes';

interface Props {
  icon: IconProp;
  title: string;
  data: string;
  marginTop?: number;
  marginBottom?: number;
}

const ItemProfile = (props: Props) => {
  return (
    <View
      style={[
        styles.view,
        {marginTop: props.marginTop, marginBottom: props.marginBottom},
      ]}>
      <View style={styles.body}>
        <FontAwesomeIcon
          size={24}
          color={themes['defaultTheme'].primaryColor}
          style={{marginRight: 12}}
          icon={props.icon}
        />
        <CustomText>{props.title}</CustomText>
      </View>
      <View style={styles.body}>
        <CustomText marginRight={12}>{props.data}</CustomText>
        <FontAwesomeIcon icon={faChevronRight} />
      </View>
    </View>
  );
};

export default ItemProfile;

const styles = StyleSheet.create({
  view: {
    height: 54,
    backgroundColor: 'white',
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
