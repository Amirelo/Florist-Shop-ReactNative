import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {CustomButton, CustomText} from '../../../components/atoms';
import {CustomInput, ItemCart, OptionsPanel} from '../../../components/molecules';
import {ItemRow} from '../../../components/atoms';
import {CartModel, ProductModel, PromocodeModel} from '../../../models';
import themes from '../../../themes/themes';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {CartDelivery} from '.';

const CartScreen = () => {
  const [total, setTotal] = React.useState(0);
  const [promoActive, setPromoActive] = React.useState(false);
  const [selectedPromo, setSelectedPromo] = React.useState<PromocodeModel>();
  const navigation = useNavigation<NavigationProp<any>>();

  var productList = Array<ProductModel>();
  var testProduct = new ProductModel(1, 'Spark', 35, 5, 'A bouquet', 2.4, 1, [
    'https://images.pexels.com/photos/230129/pexels-photo-230129.jpeg',
  ]);
  productList.push(testProduct);
  testProduct = new ProductModel(2, 'Bomb', 75, 5, 'A bouquet', 3.6, 1, [
    'https://images.pexels.com/photos/953057/pexels-photo-953057.jpeg',
  ]);
  productList.push(testProduct);

  const promoList = Array<PromocodeModel>();
  var promo = new PromocodeModel(
    1,
    'Summer sale',
    'All items get discount',
    '%15',
    'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg',
    false,
  );
  promoList.push(promo);
  promo = new PromocodeModel(
    2,
    'Winter sale',
    'All items',
    '%15',
    'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg',
    true,
  );
  promoList.push(promo);
  promo = new PromocodeModel(
    3,
    'Autumn sale',
    'All items',
    '%15',
    'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg',
    true,
  );
  promoList.push(promo);
  promo = new PromocodeModel(
    4,
    'Spring sale',
    'All items',
    '%15',
    'https://images.pexels.com/photos/5872364/pexels-photo-5872364.jpeg',
    true,
  );
  promoList.push(promo);

  var cartList = new Array<CartModel>();
  var cart = new CartModel(1, 3, 1)
  cartList.push(cart)
  cart = new CartModel(2, 2, 2)
  cartList.push(cart)

  // Go to cart delivery on press 'Place Order'
  const onBuyPressed = () => {
    navigation.navigate('CartDeli', {carts: cartList, total: total});
  };

  const onPromocodePressed = () => {
    setPromoActive(true);
  };

  const onPromocodeSelected = (item: PromocodeModel) => {
    setPromoActive(false);
    setSelectedPromo(item);
  };

  React.useEffect(() => {
    var sum = 0;
    for (var i = 0; i < productList.length; i++) {
      sum += productList[i].price * 1;
    }
    setTotal(sum);
  }, []);

  return (
    <View style={{height: '100%'}}>
      <View style={styles.view}>
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
          data={productList}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <ItemCart
              marginBottom={12}
              item={item}
              total={total}
              setTotal={setTotal}
              setItemQuantity={(quantity: number) => cartList.filter(filterItem => filterItem.productID == item.id)[0].setQuantity(quantity)}
            />
          )}
        />

        <View style={styles.line} />

        <CustomButton
          onPressed={onPromocodePressed}
          style={styles.couponButton}>
          <CustomText>
            {selectedPromo
              ? selectedPromo.title
              : 'Click here to find promocodes'}
          </CustomText>
        </CustomButton>

        <ItemRow marginBottom={20}>
          <CustomText type="title">Total</CustomText>
          <CustomText type="title">
            {selectedPromo
              ? `${
                  total *
                  (1 -
                    parseInt(
                      selectedPromo.effect.slice(
                        1,
                        selectedPromo.effect.length,
                      ),
                    ) /
                      100)
                }`
              : `$${total}`}
          </CustomText>
        </ItemRow>

        <CustomButton onPressed={onBuyPressed} style={styles.orderButton}>
          <CustomText color={'white'}>Place Order</CustomText>
        </CustomButton>
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
