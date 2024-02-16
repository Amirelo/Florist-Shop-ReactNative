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
import {addressFormat, priceFormat} from '../../../utils/Utils';
import {TextButton} from '../../../components/molecules/buttons';
import {AddUserOrder, deleteCart, getUserPromoocodes} from '../MainService';
import {useSelector} from 'react-redux';

const CartDetail = () => {
  // initial
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<any>>();

  // Fields
  const [selectedPromo, setSelectedPromo] = React.useState<PromocodeModel>();
  const [total, setTotal] = React.useState(0);
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
      navigation.navigate('Cart', {action: 'Order'});
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
      <View style={styles.view}>
        {/* Delivery Information */}
        <View
          style={{
            borderWidth: 1,
            padding: 12,
            borderRadius: 7,
            marginBottom: 30,
          }}>
          <CustomText fontWeight="bold" marginBottom={20} type="title">
            Delivery Information
          </CustomText>
          <CustomText type="subTitle">
            {address ? addressFormat(address) : ''}
          </CustomText>
        </View>

        <View
          style={{
            borderWidth: 1,
            padding: 12,
            borderRadius: 7,
            marginBottom: 30,
          }}>
          <CustomText type="title" fontWeight="bold">
            Products' Detail
          </CustomText>
          <FlatList
            horizontal={true}
            scrollEnabled={listProducts.length > 2}
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
                langPref="en"
              />
            )}
          />
        </View>
        <View
          style={{
            borderWidth: 1,
            padding: 12,
            borderRadius: 7,
            marginBottom: 30,
          }}>
          <CustomText marginBottom={20} type="title" fontWeight="bold">
            Payment
          </CustomText>

          <ItemRow marginBottom={20}>
            <CustomText type="title">Products price:</CustomText>
            <CustomText type="title" color={'green'} fontWeight="bold">
              {priceFormat(total, 'en')}
            </CustomText>
          </ItemRow>

          <Divider marginBottom={20} />

          <TextButton
            type="tertiary"
            marginBottom={20}
            onPressed={onPromocodePressed}>
            Select coupon
          </TextButton>

          <ItemRow marginBottom={20}>
            <CustomText type="title">Discount:</CustomText>
            <CustomText type="title">
              {selectedPromo ? selectedPromo.effect : 'None selected'}
            </CustomText>
          </ItemRow>

          <ItemRow marginBottom={20}>
            <CustomText type="title">Total</CustomText>
            <CustomText type="title">{priceFormat(total, 'en')}</CustomText>
          </ItemRow>
        </View>
        <View
          style={{
            borderWidth: 1,
            padding: 12,
            borderRadius: 7,
            marginBottom: 30,
          }}>
          <CustomText type="title" fontWeight="bold" marginBottom={20}>
            Payment Method
          </CustomText>
          <CustomText marginBottom={20} type="subTitle">
            Cash payment
          </CustomText>
        </View>
        <TextButton type="primary" onPressed={onOrderPressed} marginBottom={20}>
          Order
        </TextButton>
      </View>
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
            <CustomText>No promocodes available</CustomText>
          )}
          <CustomButton onPressed={() => setSelectedPromo(undefined)}>
            <CustomText
              color={themes['defaultTheme'].errorcolor}
              type="subTitle">
              Reset
            </CustomText>
          </CustomButton>
        </OptionsPanel>
      ) : (
        <></>
      )}
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
