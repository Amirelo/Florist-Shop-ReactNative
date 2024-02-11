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
  const [listCarts, setListCarts] = React.useState<any>()

  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );

  const userInfo = useSelector((store: any) => store.isLoggedIn.userInfo);

  const promoList = Array<PromocodeModel>();
  var promo = new PromocodeModel(
    1,
    'Summer sale',
    'All items get discount',
    '%',
    10,
    'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg',
    false,
  );
  promoList.push(promo);

  promo = new PromocodeModel(
    4,
    'Spring sale',
    'All items',
    '%',
    15,
    'https://images.pexels.com/photos/5872364/pexels-photo-5872364.jpeg',
    true,
  );
  promoList.push(promo);

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
    const carts: Array<any> = userInfo.carts;
    const tempProductList: any = [];
    console.log('User carts:', carts);
    carts.forEach(async (cart: any) => {
      console.log('Cart:', cart);
      console.log('Product Ref:', cart.productRef[0]);
      var product = await getProductByID(cart.productRef);
      console.log('Retreive cart product:', product);
      tempProductList.push(product);
      setListProducts(item => [... item,...tempProductList]);
      console.log('Temp product list:',tempProductList)
    });
    // Get products
  };


  // Count total price
  React.useEffect(() => {
    waitForData();
    var sum = 0;
    for (var i = 0; i < listProducts.length; i++) {
      sum += listProducts[i].price * 1;
    }
    setTotal(sum);
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
              setTotal={setTotal}
              
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
              ? `${(total * selectedPromo.amount) / 100}`
              : `$${total}`}
          </CustomText>
        </ItemRow>

        <TextButton onPressed={onBuyPressed} type="primary">
          {lang[langPref]['buttonPlaceOrder']}
        </TextButton>
      </View>
      {promoActive ? (
        <OptionsPanel setActive={setPromoActive} title="Promocodes">
          <FlatList
            data={promoList}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <CustomButton onPressed={() => onPromocodeSelected(item)}>
                <CustomText type="subTitle" marginBottom={12}>
                  {item.title}
                </CustomText>
              </CustomButton>
            )}
          />
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
