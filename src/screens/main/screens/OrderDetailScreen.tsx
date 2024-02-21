// React and libs
import React from 'react';
import {FlatList, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {RouteProp, useRoute} from '@react-navigation/native';

// Models
import {
  CartModel,
  OrderModel,
  ProductModel,
  PromocodeModel,
} from '../../../models';

// Services
import {getProductByID} from '../MainService';

// Components
import {
  CustomText,
  CustomView,
  Divider,
  ItemRow,
} from '../../../components/atoms';
import {ItemCartDetail} from '../../../components/molecules';
import {TextButton} from '../../../components/molecules/buttons';

// User Preferences
import lang from '../../../language/lang';
import themes from '../../../themes/themes';

// Utilities
import {dateFormat, priceFormat} from '../../../utils/Utils';

const OrderDetailScreen = () => {
  // Initials
  const route = useRoute<RouteProp<any>>();
  const currentTheme: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );

  // Fields
  const [listProducts, setListProducts] = React.useState<Array<ProductModel>>(
    [],
  );
  const [order, setOrder] = React.useState<OrderModel>();
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
          <CustomView
            type="itemPadding"
            borderColor={themes[currentTheme].textSecondaryColor}>
            {/* Title - General Info */}
            <CustomText marginBottom={20} type="title">
              {lang[langPref].text_general_info}
            </CustomText>

            {/* Order ID */}
            <ItemRow marginBottom={8}>
              <CustomText>{lang[langPref].text_id}</CustomText>
              <CustomText>{order ? order.id : ''}</CustomText>
            </ItemRow>
            <Divider marginBottom={8} />

            {/* Order Date */}
            <ItemRow marginBottom={8}>
              <CustomText>{lang[langPref].text_date}</CustomText>
              <CustomText>
                {order ? dateFormat(order.orderDate) : ''}
              </CustomText>
            </ItemRow>
            <Divider marginBottom={8} />

            {/* Order status */}
            <ItemRow>
              <CustomText>{lang[langPref].text_status}</CustomText>
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
          </CustomView>
          <CustomView
            type="itemPadding"
            borderColor={themes[currentTheme].textSecondaryColor}>
            {/* Title - Product Details */}
            <CustomText marginBottom={20} type="title">
              {lang[langPref].text_product_detail}
            </CustomText>

            {/* List - Brought Products */}
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
          </CustomView>

          <CustomView
            type="itemPadding"
            borderColor={themes[currentTheme].textSecondaryColor}>
            {promocode ? (
              <>
                {/* Product Price -before - if had promocde */}
                <ItemRow marginBottom={8}>
                  <CustomText type="subTitle">
                    {lang[langPref].text_price}
                  </CustomText>
                  <CustomText type="subTitle">
                    {order ? priceFormat(order.total, 'vn') : ''}
                  </CustomText>
                </ItemRow>

                <Divider marginBottom={8} />

                {/* Discount Effect */}
                <ItemRow marginBottom={8}>
                  <CustomText type="subTitle">
                    {lang[langPref].text_discount}
                  </CustomText>
                  <CustomText type="subTitle">
                    {order ? order?.discountRef : ''}
                  </CustomText>
                </ItemRow>

                <Divider marginBottom={8} />
              </>
            ) : (
              <></>
            )}
            {/* Total Price */}
            <ItemRow marginBottom={8}>
              <CustomText type="title">{lang[langPref].text_total}</CustomText>
              <CustomText type="title">
                {order ? priceFormat(order.total, 'vn') : ''}
              </CustomText>
            </ItemRow>
          </CustomView>
          {/* Allow cancel order if it is pending */}
          {order?.status == 'PENDING' ? (
            <TextButton
              type="primary"
              backgroundColor={themes[currentTheme].errorcolor}
              marginBottom={20}>
              {lang[langPref].buttonCancelOrder}
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
