import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {CustomButton, CustomText, Divider} from '../../../components/atoms';
import {ItemCart, OptionsPanel} from '../../../components/molecules';
import {ItemRow} from '../../../components/atoms';
import {CartModel, ProductModel, PromocodeModel} from '../../../models';
import themes from '../../../themes/themes';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {TextButton} from '../../../components/molecules/buttons';
import lang from '../../../language/lang';
import {useSelector} from 'react-redux';
import {getProductByID} from '../MainService';
import { priceFormat } from '../../../utils/Utils';

const CartScreen = () => {
  // Initial
  const navigation = useNavigation<NavigationProp<any>>();

  // Fields
  const [total, setTotal] = React.useState(0);
  const [promoActive, setPromoActive] = React.useState(false);
  const [selectedPromo, setSelectedPromo] = React.useState<PromocodeModel>();
  const [listProducts, setListProducts] = React.useState<Array<ProductModel>>(
    [],
  );
  const [listCarts, setListCarts] = React.useState<any>();
  const [listPromos, setListPromos] = React.useState<Array<PromocodeModel>>();

  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );

  const userInfo = useSelector((store: any) => store.isLoggedIn.userInfo);

  // Go to cart delivery on press 'Place Order'
  const onBuyPressed = () => {
    navigation.navigate('CartDeli', {carts: listCarts, total: total});
  };

  // Open option panel (promocodes)
  const onPromocodePressed = () => {
    setPromoActive(true);
  };

  // Saved selected promocodes into useState
  const onPromocodeSelected = (item: PromocodeModel) => {
    setPromoActive(false);
    setSelectedPromo(item);
  };

  const waitForData = async () => {
      // Get Promocodes
      console.log('User Promocodes:', userInfo.promocodes);
      setListPromos(userInfo.promocodes);

      const carts: Array<any> = userInfo.carts;
      const tempProductList: any = [];
      console.log('User carts:', carts);

      var sum = 0;

      // Get Products
      carts.forEach(async (cart: any) => {
        console.log('Cart:', cart);
        console.log('Product Ref:', cart.productRef[0]);
        var product = await getProductByID(cart.productRef);
        console.log('Retreive cart product:', product);
        tempProductList.push(product);
        sum += product!.price * cart.quantity
        console.log("Sum of products price:", sum)
        setListProducts(item => [...item, ...tempProductList]);
        console.log('Temp product list:', tempProductList);
        setTotal(sum)
      });
     
  };

  // Count total price
  React.useEffect(() => {
    waitForData();
  }, []);

  return (
    <View style={{height: '100%'}}>
      <View style={styles.view}>
        {/* Cart Item List */}
        <FlatList
          style={{
            marginTop: 30,
            marginBottom: 20,
            height: '50%',
            borderWidth: 1,
            borderColor: themes['defaultTheme'].primaryColor,
            borderRadius: 7,
          }}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          data={listProducts}
          key={'#'}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ItemCart
              marginBottom={12}
              item={item}
              total={total}
              //setTotal={setTotal}
            />
          )}
        />

        <Divider marginBottom={20} />

        <CustomButton
          onPressed={onPromocodePressed}
          style={styles.couponButton}>
          <CustomText>
            {selectedPromo
              ? selectedPromo.title
              : lang[langPref]['text_find_promocodes']}
          </CustomText>
        </CustomButton>

        <ItemRow marginBottom={20}>
          <CustomText type="title">{lang[langPref]['text_total']}</CustomText>
          <CustomText type="title">
            {selectedPromo
              ? priceFormat((total * (100 - selectedPromo.amount)) / 100, 'en')
              : priceFormat(total, 'en')
            }
          </CustomText>
        </ItemRow>

        <TextButton onPressed={onBuyPressed} type="primary">
          {lang[langPref]['buttonPlaceOrder']}
        </TextButton>
      </View>
      {promoActive ? (
        <OptionsPanel setActive={setPromoActive} title="Promocodes">
          <FlatList
            data={listPromos}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <CustomButton onPressed={() => onPromocodeSelected(item)}>
                <CustomText type="subTitle" marginBottom={12}>
                  {item.title}
                </CustomText>
              </CustomButton>
            )}
          />
          <CustomButton onPressed={() => setSelectedPromo(undefined)}>
            <CustomText type="subTitle">Cancel</CustomText>
          </CustomButton>
        </OptionsPanel>
      ) : (
        <></>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 16,
  },
  couponButton: {
    marginTop: 20,
    marginBottom: 20,
    height: 48,
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: 'white',
    borderColor: themes['defaultTheme'].textSecondaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderButton: {
    marginBottom: 20,
    height: 48,
    borderRadius: 7,
    backgroundColor: themes['defaultTheme'].primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: themes['defaultTheme'].textSecondaryColor,
    marginBottom: 20,
  },
});
