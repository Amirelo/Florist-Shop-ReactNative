import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {CustomImage, CustomText} from '../atoms';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {faCalendarDays} from '@fortawesome/free-regular-svg-icons';
import themes from '../../themes/themes';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

interface Props {
  title: string;
  description?: string;
  icon?: IconProp;
  marginTop?: number;
  marginBottom?: number;
  backgroundImage?: string;
  height?: ViewStyle['height'];
}

const CardHelp = (props: Props) => {
  return (
    <View
      style={
        [
          props.backgroundImage ? '' : styles.view,
          {
            marginTop: props.marginTop,
            marginBottom: props.marginBottom,
            height: props.height ? props.height : null,
          },
        ] as ViewStyle
      }>
      {props.backgroundImage ? (
        <View style={styles.backgroundView}>
          <CustomImage type="match_parent" source={props.backgroundImage} />
        </View>
      ) : (
        <></>
      )}
      <View style={styles.body}>
        <View>
          <CustomText type="big" color={'#ffffff'}>
            {props.title ? props.title : ''}
          </CustomText>
          <CustomText type="subTitle" color={'#ffffff'}>
            {props.description ? props.description : ''}
          </CustomText>
        </View>

        {props.icon ? (
          <FontAwesomeIcon color="white" size={39} icon={props.icon} />
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default CardHelp;

const styles = StyleSheet.create({
  view: {
    backgroundColor: themes['defaultTheme'].primaryColor,
    borderRadius: 7,
    borderBottomLeftRadius: 0,
  },
  backgroundView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 7,
    overflow: 'hidden',
  },
  body: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
