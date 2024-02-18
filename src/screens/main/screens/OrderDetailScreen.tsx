import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {
  CustomButton,
  CustomText,
  CustomView,
  Divider,
  ItemRow,
} from '../../../components/atoms';
import themes from '../../../themes/themes';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faColumns} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  CartModel,
  OrderModel,
  ProductModel,
  PromocodeModel,
} from '../../../models';
import {
  ItemCartDetail,
  ItemProduct,
  ItemProductLong,
} from '../../../components/molecules';
import {getProductByID} from '../MainService';
import {TextButton} from '../../../components/molecules/buttons';
import {priceFormat} from '../../../utils/Utils';
import {useSelector} from 'react-redux';

const OrderDetailScreen = () => {
  const currentTheme: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );
  // Initial
  const route = useRoute<RouteProp<any>>();

  // Fields
  const [order, setOrder] = React.useState<OrderModel>();
  const [listProducts, setListProducts] = React.useState<Array<ProductModel>>(
    [],
  );

  const [promocode, setPromocode] = React.useState<PromocodeModel>();

  // Get data from route
  React.useEffect(() => {
    setListProducts([]);
    if (route.params?.data) {
      setOrder(route.params.data);
      route.params.data.products.forEach(async (item: any) => {
        console.log('item found:', item);
        const product: ProductModel = await getProductByID(item.id);
        setListProducts(prev => [...prev, product]);
      });
    } else {
      console.log('No item found');
    }
  }, []);

  return (
    <CustomView type="fullscreen">
      <ScrollView>
        <CustomView type="body">
          <View
            style={[
              styles.general,
              {borderColor: themes[currentTheme].textSecondaryColor},
            ]}>
            <CustomText marginBottom={20} type="title">
              General Info
            </CustomText>
            <ItemRow marginBottom={8}>
              <CustomText>Order ID</CustomText>
              <CustomText>{order ? order.id : ''}</CustomText>
            </ItemRow>
            <Divider marginBottom={8} />
            <ItemRow marginBottom={8}>
              <CustomText>Order date</CustomText>
              <CustomText>{order ? order.orderDate : ''}</CustomText>
            </ItemRow>
            <Divider marginBottom={8} />
            <ItemRow>
              <CustomText>Status</CustomText>
              <CustomText
                textTransform="capitalize"
                fontWeight="bold"
                color={
                  order?.status == 'COMPLETED'
                    ? themes[currentTheme].primaryColor
                    : themes[currentTheme].errorcolor
                }>
                {order ? order.status : ''}
              </CustomText>
            </ItemRow>
          </View>
          <View
            style={[
              styles.general,
              {borderColor: themes[currentTheme].textSecondaryColor},
            ]}>
            <CustomText marginBottom={20} type="title">
              Products
            </CustomText>

            <FlatList
              style={{marginBottom: 20}}
              horizontal={true}
              data={listProducts}
              keyExtractor={item => item.name}
              renderItem={({item}) => (
                <ItemCartDetail
                  langPref="en"
                  product={item}
                  cart={
                    order
                      ? order.products.filter(
                          (cart: CartModel) => cart.id == item.id,
                        )[0]
                      : undefined
                  }
                />
              )}
            />
          </View>

          <View
            style={[
              styles.general,
              {borderColor: themes[currentTheme].textSecondaryColor},
            ]}>
            {promocode ? (
              <>
                <ItemRow marginBottom={8}>
                  <CustomText type="subTitle">Price:</CustomText>
                  <CustomText type="subTitle">
                    {order ? priceFormat(order.total, 'vn') : ''}
                  </CustomText>
                </ItemRow>

                <Divider marginBottom={8} />

                <ItemRow marginBottom={8}>
                  <CustomText type="subTitle">Coupon:</CustomText>
                  <CustomText type="subTitle">
                    {order ? order?.discountRef : ''}
                  </CustomText>
                </ItemRow>

                <Divider marginBottom={8} />
              </>
            ) : (
              <></>
            )}
            <ItemRow marginBottom={8}>
              <CustomText type="title">Total:</CustomText>
              <CustomText type="title">
                {order ? priceFormat(order.total, 'vn') : ''}
              </CustomText>
            </ItemRow>
          </View>
          {order?.status == 'PENDING' ? (
            <TextButton
              type="primary"
              backgroundColor={themes[currentTheme].errorcolor}
              marginBottom={20}>
              Cancel Order
            </TextButton>
          ) : (
            <></>
          )}
        </CustomView>
      </ScrollView>
    </CustomView>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  button: {
    paddingVertical: 12,
    width: '60%',
    borderRadius: 7,
    backgroundColor: themes['defaultTheme'].errorcolor,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  review: {
    backgroundColor: themes['defaultTheme'].primaryColor,
  },
  general: {
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 30,
    padding: 12,
  },
});
