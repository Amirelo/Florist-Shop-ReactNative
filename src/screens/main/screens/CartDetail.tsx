import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {AddressModel, ProductModel, PromocodeModel} from '../../../models';
import {
  CustomButton,
  CustomText,
  Divider,
  ItemRow,
} from '../../../components/atoms';
import {ItemProductLong} from '../../../components/molecules';
import React from 'react';
import themes from '../../../themes/themes';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

const CartDetail = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<any>>();
  const [selectedPromo, setSelectedPromo] = React.useState<PromocodeModel>();
  const [total, setTotal] = React.useState(0);
  const [address, setAddress] = React.useState<AddressModel>();
  const [cartList, setCartList] = React.useState();
  var productList = Array<ProductModel>();
  var testProduct = new ProductModel(1, 'Spark', 35, 5, 'A bouquet', 2.4, 1, [
    'https://images.pexels.com/photos/230129/pexels-photo-230129.jpeg',
  ]);
  productList.push(testProduct);
  testProduct = new ProductModel(2, 'Bomb', 75, 5, 'A bouquet', 3.6, 1, [
    'https://images.pexels.com/photos/953057/pexels-photo-953057.jpeg',
  ]);
  productList.push(testProduct);

  const onOrderPressed = () => {
    console.log('Pressed');
    navigation.navigate('Home');
  };

  React.useEffect(() => {
    if (route.params?.carts) {
      setCartList(route.params.carts);
    }
    if (route.params?.total) {
      setTotal(route.params.total);
    }
    if (route.params?.address) {
      setAddress(route.params.address);
    }
  });

  return (
    <ScrollView>
      <View style={styles.view}>
        <CustomText marginBottom={20} type="title">
          Delivery Information
        </CustomText>
        <CustomText marginBottom={30} type="subTitle">
          {address
            ? address.streetNumber +
              ' ' +
              address.street +
              ', ' +
              address.ward +
              ', ' +
              address.district +
              ', ' +
              address.city
            : ''}
        </CustomText>
        <CustomText type="title">Products</CustomText>
        <FlatList
          key={'#'}
          contentContainerStyle={{gap: 16}}
          style={{marginTop: 24, marginBottom: 30}}
          showsVerticalScrollIndicator={false}
          data={productList}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <ItemProductLong product={item} />}
        />

        <CustomText marginBottom={20} type="title">Pricing</CustomText>

        <ItemRow marginBottom={20}>
          <CustomText type="title">Products price:</CustomText>
          <CustomText type="title">{total.toString()}</CustomText>
        </ItemRow>

        <Divider />

        {selectedPromo ? (
          <ItemRow marginBottom={20}>
            <CustomText type="title">Discount:</CustomText>
            <CustomText type="title">
              {`$${
                (total *
                  parseInt(
                    selectedPromo.effect.slice(1, selectedPromo.effect.length),
                  )) /
                100
              } `}
            </CustomText>
          </ItemRow>
        ) : (
          <></>
        )}

        <ItemRow marginBottom={20}>
          <CustomText type="title">Total</CustomText>
          <CustomText type="title">{total.toString()}</CustomText>
        </ItemRow>

        <CustomText marginBottom={20} type="subTitle">
          Cash payment
        </CustomText>
        <CustomButton onPressed={onOrderPressed} style={styles.orderButton}>
          <CustomText color={'white'}>Order</CustomText>
        </CustomButton>
      </View>
    </ScrollView>
  );
};

export default CartDetail;

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  orderButton: {
    marginBottom: 20,
    height: 48,
    borderRadius: 7,
    backgroundColor: themes['defaultTheme'].primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
