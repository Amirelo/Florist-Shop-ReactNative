// React and libs
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

// Models
import OrderModel from '../../models/OrderModel';

// Components
import {CustomText, ItemRow} from '../atoms';
import {TextButton} from './buttons';

// User Preferences
import themes from '../../themes/themes';
import lang from '../../language/lang';

// Utilities
import {dateFormat, priceFormat} from '../../utils/Utils';

interface Props {
  marginTop?: number;
  marginBottom?: number;
  item: OrderModel;
  onPressed?(): void;
}

const ItemOrder = (props: Props) => {
  const currentTheme: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );
  const langPref: keyof typeof lang = useSelector((store:any) => store.preference.language)
  return (
    <View
      style={[
        styles.view,
        {
          marginTop: props.marginTop,
          marginBottom: props.marginBottom,
          backgroundColor: themes[currentTheme].tertiaryColor,
          borderColor: themes[currentTheme].textSecondaryColor
        },
      ]}>
      <ItemRow marginBottom={8}>
        <CustomText>{lang[langPref].text_id +' '+ props.item.id}</CustomText>
        <CustomText>{dateFormat(props.item.orderDate)}</CustomText>
      </ItemRow>

      <ItemRow marginBottom={8}>
        <CustomText>{lang[langPref].text_num_items+' '+ props.item.productsQuantity}</CustomText>
        <CustomText>{lang[langPref].text_status+' '+ props.item.status.toLowerCase()}</CustomText>
      </ItemRow>
      <View style={styles.divider} />
      <ItemRow marginBottom={12}>
        <CustomText>{lang[langPref].text_price}</CustomText>
        <CustomText>{priceFormat(props.item.total, 'vn')}</CustomText>
      </ItemRow>
      <TextButton
        alignSelf="flex-end"
        type="primary"
        onPressed={props.onPressed}>
        {lang[langPref].buttonSeeDetail}
      </TextButton>
    </View>
  );
};

export default ItemOrder;

const styles = StyleSheet.create({
  view: {
    padding: 12,
    borderRadius: 7,
    borderWidth: 1,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 16,
  },
  button: {
    padding: 12,
    borderRadius: 7,
    alignSelf: 'flex-end',
    backgroundColor: themes['defaultTheme'].primaryColor,
  },
});
