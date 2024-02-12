import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {
  CustomButton,
  CustomText,
  Divider,
  ItemRow,
} from '../../../components/atoms';
import themes from '../../../themes/themes';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faColumns} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {OrderModel, ProductModel, PromocodeModel} from '../../../models';
import {ItemProduct, ItemProductLong} from '../../../components/molecules';
import {getProductByID} from '../MainService';
import {TextButton} from '../../../components/molecules/buttons';
import {priceFormat} from '../../../utils/Utils';

const OrderDetailScreen = () => {
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
        const product: ProductModel = await getProductByID(item.productRef);
        setListProducts(prev => [...prev, product]);
      });
    } else {
      console.log('No item found');
    }
  }, []);

  return (
    <ScrollView>
      <View style={styles.view}>
        <View style={styles.general}>
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
              color={order?.status == 'COMPLETED' ? 'green' : 'red'}>
              {order ? order.status : ''}
            </CustomText>
          </ItemRow>
        </View>
        <View style={styles.general}>
          <CustomText marginBottom={20} type="title">
            Products
          </CustomText>

          <FlatList
            style={{marginBottom: 20}}
            horizontal={true}
            data={listProducts}
            keyExtractor={item => item.name}
            renderItem={({item}) => (
              <ItemProduct langPref="en" product={item} />
            )}
          />
        </View>

        <View style={styles.general}>
          {promocode ? (
            <>
              <ItemRow marginBottom={8}>
                <CustomText type="subTitle">Price:</CustomText>
                <CustomText type="subTitle">
                  {order ? priceFormat(order.total, 'en') : ''}
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
              {order ? priceFormat(order.total, 'en') : ''}
            </CustomText>
          </ItemRow>
        </View>
        <TextButton type="primary" backgroundColor={'red'} marginBottom={20}>
          Cancel Order
        </TextButton>
        <TextButton
          type="primary"
          marginBottom={30}
          backgroundColor={themes['defaultTheme'].warnColor}>
          See Reviews
        </TextButton>
      </View>
    </ScrollView>
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
    backgroundColor: 'white',
    marginBottom: 30,
    borderRadius: 7,
    padding: 12,
  },
});
