import {FlatList, StyleSheet, View} from 'react-native';
import {ProductModel, PromocodeModel} from '../../../models';
import {CustomButton, CustomText, Divider, ItemRow} from '../../../components/atoms';
import {ItemProductLong} from '../../../components/molecules';
import React from 'react';
import themes from '../../../themes/themes';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const CartDetail = () => {
    const navigation = useNavigation<NavigationProp<any>>();
  const [selectedPromo, setSelectedPromo] = React.useState<PromocodeModel>();
  const [total, setTotal] = React.useState(0);
  var productList = Array<ProductModel>();
  const testProduct = new ProductModel(1, 'Spark', 90, 3, 'A bouquet', 2.5, 1, [
    'https://cdn.pixabay.com/photo/2024/01/12/21/23/cortina-dampezzo-8504755_1280.jpg',
  ]);
  productList.push(testProduct);
  const testProduct1 = new ProductModel(
    2,
    'Sponk',
    90,
    3,
    'A bouquet',
    2.5,
    1,
    [
      'https://cdn.pixabay.com/photo/2024/01/12/21/23/cortina-dampezzo-8504755_1280.jpg',
    ],
  );
  productList.push(testProduct1);

  const onOrderPressed = () => {
    console.log("Pressed")
    navigation.navigate('Home')
  }

  return (
    <View style={styles.view}>
      <CustomText type="title">Products</CustomText>
      <FlatList
        key={'#'}
        contentContainerStyle={{gap: 16}}
        style={{marginTop: 24}}
        showsVerticalScrollIndicator={false}
        data={productList}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <ItemProductLong product={item} />}
      />

      <ItemRow marginBottom={20}>
        <CustomText type="title">Products price:</CustomText>
        <CustomText type="title">{total.toString()}</CustomText>
      </ItemRow>

      <Divider/>

      {selectedPromo ? (
        <ItemRow marginBottom={20}>
          <CustomText type="title">Discount:</CustomText>
          <CustomText type="title">
            {`$${(total * parseInt( selectedPromo.effect.slice(1,selectedPromo.effect.length), )) / 100} `}
          </CustomText>
        </ItemRow>
      ) : (
        <></>
      )}

      <ItemRow marginBottom={20}>
        <CustomText type="title">Total</CustomText>
        <CustomText type="title">
          {selectedPromo
            ? `${
                total *
                (1 -
                  parseInt(
                    selectedPromo.effect.slice(1, selectedPromo.effect.length),
                  ) /
                    100)
              }`
            : `$${total}`}
        </CustomText>
      </ItemRow>

      <CustomText marginBottom={20} type='subTitle'>Cash payment</CustomText>
      <CustomButton onPressed={onOrderPressed} style={styles.orderButton}>
          <CustomText color={'white'}>Order</CustomText>
        </CustomButton>
    </View>
  );
};

export default CartDetail;

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  orderButton:{
    marginBottom: 20,
    height: 48,
    borderRadius: 7,
    backgroundColor: themes['defaultTheme'].primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
