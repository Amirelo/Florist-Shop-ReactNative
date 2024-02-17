import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {CustomButton, CustomText, Divider} from '../../../components/atoms';
import {ItemCart, OptionsPanel} from '../../../components/molecules';
import {ItemRow} from '../../../components/atoms';
import {CartModel, ProductModel, PromocodeModel} from '../../../models';
import themes from '../../../themes/themes';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {TextButton} from '../../../components/molecules/buttons';
import lang from '../../../language/lang';
import {useSelector} from 'react-redux';
import {
  deleteCartItem,
  getCart,
  getProductByID,
  updateCartQuantity,
} from '../MainService';
import {priceFormat} from '../../../utils/Utils';
import firestore from '@react-native-firebase/firestore';
import { NAVIGATION_BOTTOM_TAB_EXPLORE, NAVIGATION_MAIN_CART_DELIVERY } from '../../../constants/AppConstants';

const CartScreen = () => {
  // Initial
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<any>>();

  // Fields
  const [total, setTotal] = React.useState(0);
  const [productActive, setProductActive] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<ProductModel>();
  const [listProducts, setListProducts] = React.useState<Array<ProductModel>>(
    [],
  );
  const [listCarts, setListCarts] = React.useState<Array<CartModel>>([]);

  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );

  const email = useSelector((store: any) => store.isLoggedIn.userEmail);

  const userInfo = useSelector((store: any) => store.isLoggedIn.userInfo);

  // Go to cart delivery on press 'Place Order'
  const onBuyPressed = () => {
    console.log('CartScreen - passing route - carts:', listCarts);
    console.log('CartScreen - passing route - products:', listProducts);
    console.log('CartScreen - passing route - total:', total);
    navigation.navigate(NAVIGATION_MAIN_CART_DELIVERY, {
      carts: listCarts,
      products: listProducts,
      total: total,
    });
  };

  const onShoppingPressed = () => {
    navigation.navigate(NAVIGATION_BOTTOM_TAB_EXPLORE);
  };

  const onItemDeletePressed = async () => {
    setProductActive(false);
    if (await deleteCartItem(selectedProduct!.id, email)) {
      setListProducts(
        listProducts.filter(
          productItem => productItem.id != selectedProduct!.id,
        ),
      );
      setListCarts(
        listCarts.filter(cartItem => cartItem.id != selectedProduct!.id),
      );
    }
  };

  const onItemEllipsesPressed = (item: ProductModel) => {
    setSelectedProduct(item);
    setProductActive(true);
  };

  const onQuantityChanged = async (amount: number, item: ProductModel) => {
    setTotal(prev => prev + item.price * amount);
    await updateCartQuantity(item.id, amount, email);
  };

  const waitForData = async () => {
    setListProducts([]);
    setListCarts([]);
    const carts: Array<CartModel> = await getCart(email);

    console.log('User carts:', carts);
    setListCarts(carts);
    var sum = 0;
    setTotal(0);
    // Get Products
    carts.forEach(async (cart: any) => {
      console.log('Cart:', cart);
      console.log('Product Ref:', cart.id);
      var product = await getProductByID(cart.id);
      console.log('Retreive cart product:', product);
      sum += product!.price * cart.quantity;
      console.log('Sum of products price:', sum);
      setListProducts(item => [...item, product]);
      setTotal(prev => prev + sum);
      console.log('Cart total:', total);
    });
  };

  React.useEffect(() => {
    waitForData();
  }, []);

  React.useEffect(() => {
    if (route.params?.product && route.params?.quantity) {
      const cart: CartModel = new CartModel(
        route.params.product.id,
        route.params.quantity,
      );
      if (!listCarts.includes(cart)) {
        setListProducts([...listProducts, route.params.product]);
        setListCarts([...listCarts, cart]);
      }
      if (route.params?.action && route.params.action == 'Order') {
        setListProducts([]);
        setListCarts([]);
        setTotal(0);
      }
    }
  }, [route]);

  return (
    <View style={{height: '100%'}}>
      {listCarts.length > 0 ? (
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
                onEllipsesPressed={() => onItemEllipsesPressed(item)}
                quantity={
                  listCarts.filter(filterItem => filterItem.id == item.id)[0]
                    ? listCarts.filter(
                        filterItem => filterItem.id == item.id,
                      )[0].quantity
                    : -10
                }
                onQuantityChanged={(amount: number) =>
                  onQuantityChanged(amount, item)
                }
              />
            )}
          />

          <Divider marginBottom={20} />

          <TextButton onPressed={onBuyPressed} type="primary">
            {lang[langPref]['buttonPlaceOrder']}
          </TextButton>
        </View>
      ) : (
        <View style={{justifyContent:'center', height:'100%', paddingHorizontal:16}}>
          <CustomText type="title" alignSelf="center" marginBottom={20}>
            Empty cart
          </CustomText>
          <TextButton type="primary" onPressed={onShoppingPressed}>
            Start Shopping now
          </TextButton>
        </View>
      )}
      {productActive && selectedProduct ? (
        <OptionsPanel title={selectedProduct.name} setActive={setProductActive}>
          <CustomButton onPressed={onItemDeletePressed}>
            <CustomText type="subTitle" color={'red'} fontWeight="bold">
              Delete item
            </CustomText>
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
    marginTop: 20,
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
