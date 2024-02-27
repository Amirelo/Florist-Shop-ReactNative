// React and libs
import React from 'react';
import {ColorValue, StyleSheet, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {useSelector} from 'react-redux';

// Components
import {CustomButton, CustomText} from '../atoms';

// User Preferences
import themes from '../../themes/themes';

interface Props {
  children: string;
  description: string;
  amount?: number;
  color?: ColorValue;
  quantity?: number;
  marginTop?: number;
  marginBottom?: number;
  onPressed?(): void;
}

const ItemAccount = (props: Props) => {
  // Get selected theme
  const currentTheme: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );

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
        <CustomText color={props.color} type="title" marginBottom={8}>
          {props.children}
        </CustomText>
        <CustomText color={themes['defaultTheme'].textSecondaryColor}>
          {props.amount != null
            ? props.amount + ' ' + props.description
            : props.description}
        </CustomText>
      </View>
      <FontAwesomeIcon
        color={themes[currentTheme].textColor}
        icon={faChevronRight}
      />
    </CustomButton>
  );
};

export default ItemAccount;

const styles = StyleSheet.create({
  view: {
    height: 72,
    borderRadius: 7,
    padding: 16,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body: {},
  icon: {
    marginRight: 18,
  },
});
