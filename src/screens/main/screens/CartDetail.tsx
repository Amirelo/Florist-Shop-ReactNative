import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {
  AddressModel,
  CartModel,
  OrderModel,
  ProductModel,
  PromocodeModel,
} from '../../../models';
import {
  CustomButton,
  CustomText,
  CustomView,
  Divider,
  ItemRow,
} from '../../../components/atoms';
import {
  ItemCartDetail,
  ItemProduct,
  ItemProductLong,
  OptionsPanel,
} from '../../../components/molecules';
import React from 'react';
import themes from '../../../themes/themes';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  addressFormat,
  priceFormat,
  promoEffectFormat,
} from '../../../utils/Utils';
import {TextButton} from '../../../components/molecules/buttons';
import {AddUserOrder, deleteCart, getUserPromoocodes} from '../MainService';
import {useSelector} from 'react-redux';
import {NAVIGATION_MAIN_CART} from '../../../constants/AppConstants';
import lang from '../../../language/lang';

const CartDetail = () => {
  // initial
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<any>>();

  const currentTheme: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );

  // Fields
  const [selectedPromo, setSelectedPromo] = React.useState<PromocodeModel>();
  const [total, setTotal] = React.useState(0);
  const [discountTotal, setDiscountTotal] = React.useState(0);
  const [shippingCost, setShippingCost] = React.useState(50000);
  const [totalQuantity, setTotalQuantity] = React.useState(0);
  const [address, setAddress] = React.useState<AddressModel>();
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [cartList, setCartList] = React.useState<Array<CartModel>>([]);
  const [listProducts, setListProducts] = React.useState<Array<ProductModel>>(
    [],
  );

  const [promoActive, setPromoActive] = React.useState(false);
  const [listPromos, setListPromos] = React.useState<Array<PromocodeModel>>([]);

  const email = useSelector((store: any) => store.isLoggedIn.userEmail);

  // Open option panel (promocodes)
  const onPromocodePressed = () => {
    setPromoActive(true);
  };

  // Saved selected promocodes into useState
  const onPromocodeSelected = (item: PromocodeModel) => {
    setPromoActive(false);
    setSelectedPromo(item);
    if (item != undefined) {
      if (item.effect == '%') {
        setDiscountTotal(total * (1 - item.amount / 100) + shippingCost);
      }
      if (item.effect == '-') {
        setDiscountTotal(
          total + shippingCost - item.amount < 0
            ? 0
            : total - item.amount + shippingCost,
        );
      }
    }
  };

  // Navigate home on pressed
  const onOrderPressed = async () => {
    const totalPrice = selectedPromo
      ? total * (1 - selectedPromo.amount / 100)
      : total;
    const userOrder = new OrderModel(
      '',
      'PENDING',
      selectedPromo ? selectedPromo.id : '',
      total,
      totalQuantity,
      totalPrice,
      '',
      cartList,
      addressFormat(address!),
      phoneNumber,
    );
    const addOrderRes = await AddUserOrder(userOrder, email);
    if (addOrderRes) {
      await deleteCart(email);
      navigation.navigate(NAVIGATION_MAIN_CART, {action: 'Order'});
    }
  };

  // Get promo
  const getPromocodes = async () => {
    const codes = await getUserPromoocodes(email);
    setListPromos(codes);
  };

  // Get data from routes
  React.useEffect(() => {
    getPromocodes();
    if (route.params?.carts) {
      setTotalQuantity(0);
      setCartList(route.params.carts);
      console.log('Route - carts:', route.params.carts);
      cartList.forEach(item => {
        setTotalQuantity(prev => prev + item.quantity);
      });
    }
    if (route.params?.total) {
      setTotal(route.params.total);
      setDiscountTotal(route.params.total + shippingCost);
      console.log('Route - total:', route.params.total);
    }
    if (route.params?.address) {
      setAddress(route.params.address);
      console.log('Route - address:', route.params.address);
    }
    if (route.params?.products) {
      setListProducts(route.params.products);
      console.log('Route - products:', route.params.products);
    }
    if (route.params?.phoneNumber) {
      setPhoneNumber(route.params.phoneNumber);
      console.log('Route - phone number:', route.params.phoneNumber);
    }
  }, []);

  return (
    <ScrollView>
      <CustomView type="body">
        {/* Delivery Information */}
        <View
          style={{
            borderWidth: 1,
            padding: 12,
            borderColor: themes[currentTheme].textSecondaryColor,
            borderRadius: 7,
            marginBottom: 30,
          }}>
          <CustomText fontWeight="bold" marginBottom={20} type="title">
            {lang[langPref].text_delivery_info}
          </CustomText>
          <CustomText type="subTitle">
            {address ? addressFormat(address) : ''}
          </CustomText>
        </View>

        <View
          style={{
            borderWidth: 1,
            padding: 12,
            borderColor: themes[currentTheme].textSecondaryColor,
            borderRadius: 7,
            marginBottom: 30,
          }}>
          <CustomText type="title" fontWeight="bold">
            {lang[langPref].text_product_detail}
          </CustomText>
          <FlatList
            horizontal={true}
            scrollEnabled={listProducts.length > 1}
            key={'#'}
            contentContainerStyle={{gap: 16}}
            style={{marginTop: 24, marginBottom: 30}}
            showsVerticalScrollIndicator={false}
            data={listProducts}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <ItemCartDetail
                product={item}
                cart={
                  cartList
                    ? cartList.filter(
                        (cart: CartModel) => cart.id == item.id,
                      )[0]
                    : undefined
                }
                langPref="vn"
              />
            )}
          />
        </View>
        <View
          style={{
            borderWidth: 1,
            padding: 12,
            borderColor: themes[currentTheme].textSecondaryColor,
            borderRadius: 7,
            marginBottom: 30,
          }}>
          {/* Title */}
          <CustomText marginBottom={20} type="title" fontWeight="bold">
            {lang[langPref].text_payment}
          </CustomText>

          {/* Products' Price */}
          <ItemRow marginBottom={20}>
            <CustomText type="title">
              {lang[langPref].text_products_price}
            </CustomText>
            <CustomText type="title">{priceFormat(total, 'vn')}</CustomText>
          </ItemRow>

          {/* Shipping Cost */}
          <ItemRow marginBottom={20}>
            <CustomText type="title">Shipping cost:</CustomText>
            <CustomText type="title">
              {priceFormat(shippingCost, 'vn')}
            </CustomText>
          </ItemRow>

          <Divider marginBottom={20} />

          {/* Select Promocode */}
          <TextButton
            type="tertiary"
            marginBottom={20}
            onPressed={onPromocodePressed}>
            {lang[langPref].buttonSelectPromo}
          </TextButton>

          {/* Promocode Effect */}
          <ItemRow marginBottom={20}>
            <CustomText type="title">Discount:</CustomText>
            <CustomText type="title">
              {selectedPromo
                ? promoEffectFormat(selectedPromo.effect, selectedPromo.amount)
                : lang[langPref].text_discount_none}
            </CustomText>
          </ItemRow>

          {/* Total Price After Promocode */}
          <ItemRow marginBottom={20}>
            <CustomText type="title">{lang[langPref].text_total}</CustomText>
            <CustomText
              type="title"
              fontWeight="bold"
              color={themes[currentTheme].primaryColor}>
              {priceFormat(discountTotal, 'vn')}
            </CustomText>
          </ItemRow>
        </View>

        {/* Payment Method */}
        <View
          style={{
            borderWidth: 1,
            padding: 12,
            borderColor: themes[currentTheme].textSecondaryColor,
            borderRadius: 7,
            marginBottom: 30,
          }}>
          <CustomText type="title" fontWeight="bold" marginBottom={20}>
            {lang[langPref].text_paymentMethod}
          </CustomText>
          <CustomText marginBottom={20} type="subTitle">
            {lang[langPref].text_paymentMethod_cash}
          </CustomText>
        </View>
        {/* Button - Order */}
        <TextButton type="primary" onPressed={onOrderPressed} marginBottom={20}>
          {lang[langPref].buttonOrder}
        </TextButton>
      </CustomView>
      {/* Option Panel - how Promocodes */}
      {promoActive ? (
        <OptionsPanel setActive={setPromoActive} title="Promocodes">
          {listPromos?.length > 0 ? (
            <FlatList
              data={listPromos}
              scrollEnabled={false}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <CustomButton onPressed={() => onPromocodeSelected(item)}>
                  <CustomText type="subTitle" marginBottom={12}>
                    {item.title}
                  </CustomText>
                </CustomButton>
              )}
            />
          ) : (
            <CustomText type="subTitle">
              {lang[langPref].text_discount_none}
            </CustomText>
          )}
          <TextButton
            fontSize="subTitle"
            onPressed={() => {
              setSelectedPromo(undefined);
            }}>
            {lang[langPref].text_discount_reset}
          </TextButton>
        </OptionsPanel>
      ) : (
        <></>
      )}
    </ScrollView>
  );
};

export default CartDetail;
