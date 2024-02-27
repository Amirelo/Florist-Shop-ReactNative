// React and libs
import {StyleSheet, View, ViewStyle} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {useSelector} from 'react-redux';

// Components
import {CustomButton, CustomImage, CustomText} from '../atoms';

// User Preferences
import themes from '../../themes/themes';

interface Props {
  title: string;
  description?: string;
  icon?: IconProp;
  marginTop?: number;
  marginBottom?: number;
  backgroundImage?: Array<string>;
  height?: ViewStyle['height'];
  onPressed?(): void;
}

const CardHelp = (props: Props) => {
  // Get seleceted theme
  const currentTheme: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );
  return (
    <CustomButton onPressed={props.onPressed}>
      <View
        style={
          [
            props.backgroundImage
              ? ''
              : [
                  styles.view,
                  {backgroundColor: themes[currentTheme].primaryColor},
                ],
            {
              marginTop: props.marginTop,
              marginBottom: props.marginBottom,
              height: props.height ? props.height : null,
            },
          ] as ViewStyle
        }>
        {props.backgroundImage ? (
          <View style={[styles.backgroundView]}>
            <CustomImage
              type="match_parent"
              source={
                currentTheme == 'dark'
                  ? props.backgroundImage[1]
                  : props.backgroundImage[0]
              }
            />
          </View>
        ) : (
          <></>
        )}
        <View style={styles.body}>
          <View>
            <CustomText type="big" color={themes[currentTheme].tertiaryColor}>
              {props.title ? props.title : ''}
            </CustomText>
            <CustomText
              type="subTitle"
              color={themes[currentTheme].tertiaryColor}>
              {props.description ? props.description : ''}
            </CustomText>
          </View>

          {props.icon ? (
            <FontAwesomeIcon
              color={themes[currentTheme].tertiaryColor}
              size={39}
              icon={props.icon}
            />
          ) : (
            <></>
          )}
        </View>
      </View>
    </CustomButton>
  );
};

export default CardHelp;

const styles = StyleSheet.create({
  view: {
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
