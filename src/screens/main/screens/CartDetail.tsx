// React and libs
import React from 'react';
import {FlatList, ScrollView, View} from 'react-native';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

// Constants
import {MSG_ORDER_SUCCESS, NAVIGATION_MAIN_CART} from '../../../constants/AppConstants';

// Models
import {
  AddressModel,
  CartModel,
  OrderModel,
  ProductModel,
  PromocodeModel,
} from '../../../models';

// Services
import {AddUserOrder, deleteCart, getUserPromoocodes} from '../MainService';

// Redux
import {useDispatch, useSelector} from 'react-redux';

// Components
import {
  CustomButton,
  CustomText,
  CustomView,
  Divider,
  ItemRow,
} from '../../../components/atoms';
import {ItemCartDetail, OptionsPanel} from '../../../components/molecules';
import {TextButton} from '../../../components/molecules/buttons';

// User Preferences
import lang from '../../../language/lang';
import themes from '../../../themes/themes';

// Utilities
import {
  addressFormat,
  priceFormat,
  promoEffectFormat,
} from '../../../utils/Utils';
import { addMessage } from '../../../redux/actions/PreferenceAction';

const CartDetail = () => {
  // initial
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<any>>();
  const dispatch = useDispatch();
  const currentTheme: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );
  const email = useSelector((store: any) => store.isLoggedIn.userEmail);

  // Fields
  const [cartList, setCartList] = React.useState<Array<CartModel>>([]);
  const [listPromos, setListPromos] = React.useState<Array<PromocodeModel>>([]);
  const [listProducts, setListProducts] = React.useState<Array<ProductModel>>(
    [],
  );
  const [address, setAddress] = React.useState<AddressModel>();
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [total, setTotal] = React.useState(0);
  const [discountTotal, setDiscountTotal] = React.useState(0);
  const [shippingCost, setShippingCost] = React.useState(50000);
  const [totalQuantity, setTotalQuantity] = React.useState(0);
  const [selectedPromo, setSelectedPromo] = React.useState<PromocodeModel>();

  // Fields - Option Panel status
  const [promoActive, setPromoActive] = React.useState(false);

  // Open option panel (promocodes)
  const onPromocodePressed = () => {
    setPromoActive(true);
  };

  // Saved selected promocodes into useState
  const onPromocodeSelected = (item: PromocodeModel) => {
    setPromoActive(false);
    setSelectedPromo(item);
    if (item != undefined) {
      // Discount - %
      if (item.effect == '%') {
        setDiscountTotal(total * (1 - item.amount / 100) + shippingCost);
      }
      // Discount - amount
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
    // Calculate total (with promo)
    const totalPrice = selectedPromo
      ? total * (1 - selectedPromo.amount / 100)
      : total;
    // Create model
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
    // Service
    const addOrderRes = await AddUserOrder(userOrder, email);
    // If success
    if (addOrderRes) {
      // Delete carts
      dispatch(addMessage(MSG_ORDER_SUCCESS))
      await deleteCart(email);
      navigation.navigate(NAVIGATION_MAIN_CART, {action: 'Order'});
    }
  };

  // Get promo
  const getPromocodes = async () => {
    const codes = (await getUserPromoocodes(email)).filter(
      item => item.status == 'ACTIVE',
    );
    setListPromos(codes);
  };

  // Get data from routes
  React.useEffect(() => {
    getPromocodes();
    // Get carts from previous screen
    if (route.params?.carts) {
      setTotalQuantity(0);
      setCartList(route.params.carts);
      console.log('Route - carts:', route.params.carts);
      cartList.forEach(item => {
        setTotalQuantity(prev => prev + item.quantity);
      });
    }
    // Get total from previous screen
    if (route.params?.total) {
      setTotal(route.params.total);
      setDiscountTotal(route.params.total + shippingCost);
      console.log('Route - total:', route.params.total);
    }
    // Get address from previous screen
    if (route.params?.address) {
      setAddress(route.params.address);
      console.log('Route - address:', route.params.address);
    }
    // Get products from previous screen
    if (route.params?.products) {
      setListProducts(route.params.products);
      console.log('Route - products:', route.params.products);
    }
    // Get phoneNumber from previous screen
    if (route.params?.phoneNumber) {
      setPhoneNumber(route.params.phoneNumber);
      console.log('Route - phone number:', route.params.phoneNumber);
    }
  }, []);

  return (
    <ScrollView>
      <CustomView type="body">
        {/* Delivery Information */}
        <CustomView
          type={'itemPadding'}
          borderColor={themes[currentTheme].textSecondaryColor}
          marignBottom={30}>
          {/* Title - Delivery information */}
          <CustomText fontWeight="bold" marginBottom={20} type="title">
            {lang[langPref].text_delivery_info}
          </CustomText>
          {/* Chosen Address */}
          <CustomText type="subTitle" marginBottom={8}>
            {address ? addressFormat(address) : ''}
          </CustomText>
          {/* Chosen Phone Number */}
          <CustomText type="subTitle">{phoneNumber}</CustomText>
        </CustomView>
        <CustomView
          type={'itemPadding'}
          borderColor={themes[currentTheme].textSecondaryColor}
          marignBottom={30}>
          {/* Title - Product Detail */}
          <CustomText type="title" fontWeight="bold">
            {lang[langPref].text_product_detail}
          </CustomText>
          {/* List - products */}
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
        </CustomView>
        <CustomView
          type={'itemPadding'}
          borderColor={themes[currentTheme].textSecondaryColor}
          marignBottom={30}>
          {/* Title - Payment */}
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

          {/* Button - Select Promocode */}
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
        </CustomView>

        {/* Payment Method */}
        <CustomView
          type={'itemPadding'}
          borderColor={themes[currentTheme].textSecondaryColor}
          marignBottom={30}>
          {/* Title */}
          <CustomText type="title" fontWeight="bold" marginBottom={20}>
            {lang[langPref].text_paymentMethod}
          </CustomText>
          {/* Payment Option */}
          <CustomText marginBottom={20} type="subTitle">
            {lang[langPref].text_paymentMethod_cash}
          </CustomText>
        </CustomView>
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
          {/* Button - Reset */}
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
