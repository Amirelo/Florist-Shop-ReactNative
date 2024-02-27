// React and libs
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

// Components
import {CustomButton, CustomImage, CustomText} from '../atoms';

// User Preferences
import themes from '../../themes/themes';

interface Props {
  source?: string;
  username?: String;
  email?: String;
  marginTop?: number;
  marginBottom?: number;
  onPressed?(): void;
}

const ItemUser = (props: Props) => {
  const currentTheme:keyof typeof themes = useSelector((store:any) => store.preference.theme)
  return (
    <CustomButton
    onPressed={props.onPressed}
      style={[
        styles.view,
        {
          marginTop: props.marginTop,
          marginBottom: props.marginBottom ? props.marginBottom : 12,
          backgroundColor: themes[currentTheme].tertiaryColor,
        },
      ]}>
      <View style={styles.body}>
        {/* User Image */}
        <CustomImage type="tabImage" marginRight={8} source={props.source!} />
        <View style={{width:'70%'}}>
          {/* Email */}
          <CustomText maxLines={1} type="subTitle" marginBottom={4}>
            {props.email + ''}
          </CustomText>
          {/* Username */}
          <CustomText>{props.username + ''}</CustomText>
        </View>
      </View>
      <FontAwesomeIcon color={themes[currentTheme].textColor} icon={faChevronRight} />
    </CustomButton>
  );
};

export default ItemUser;

const styles = StyleSheet.create({
  view: {
    height: 94,
    borderRadius: 7,
    padding: 16,
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    width:'95%',
  },
  icon: {
    marginRight: 18,
  },
});
