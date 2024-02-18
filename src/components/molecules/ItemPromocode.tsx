import {StyleSheet, View} from 'react-native';
import {PromocodeModel} from '../../models';
import {CustomImage, CustomText} from '../atoms';
import React from 'react';
import {useSelector} from 'react-redux';
import themes from '../../themes/themes';

interface Props {
  item: PromocodeModel;
}

const ItemPromocode = (props: Props) => {
  const currentTheme: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );
  const [sale, setSale] = React.useState('');
  const [status, setStatus] = React.useState(
    props.item.status == 'AVAILABLE' ? 'Active' : 'Expired',
  );

  React.useEffect(() => {
    const discount =
      props.item.effect == '%'
        ? 'get ' + props.item.amount + '% off'
        : 'price decrease by ' + props.item.amount;
    setSale(discount);
  }, []);

  return (
    <View
      style={[
        styles.view,
        {backgroundColor: themes[currentTheme].tertiaryColor},
      ]}>
      <CustomImage type="tabImage" source={props.item.image} marginRight={12} />
      <View>
        <CustomText type="title">{props.item.title}</CustomText>
        <CustomText>{`All items ${sale}`}</CustomText>
        <CustomText
          fontWeight="bold"
          color={
            status == 'Active'
              ? themes[currentTheme].primaryColor
              : themes[currentTheme].errorcolor
          }>
          {status}
        </CustomText>
      </View>
    </View>
  );
};

export default ItemPromocode;

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    padding: 12,
  },
});
