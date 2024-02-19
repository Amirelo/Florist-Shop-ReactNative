import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  CustomButton,
  CustomText,
  CustomView,
  Divider,
} from '../../../components/atoms';
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
import {
  NAVIGATION_BOTTOM_TAB_EXPLORE,
  NAVIGATION_MAIN_CART_DELIVERY,
} from '../../../constants/AppConstants';

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
    const decreaseQuantity = listCarts.filter(cartItem => cartItem.id == selectedProduct!.id)[0].quantity
    setTotal(prev=>prev - selectedProduct!.price * decreaseQuantity)
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
    setTotal(0);
    const carts: Array<CartModel> = await getCart(email);

    console.log('User carts:', carts);
    setListCarts(carts);
    var sum = 0;
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
    console.log('Cart route changed')
    if (route.params?.product && route.params?.quantity) {
      const cart: CartModel = new CartModel(
        route.params.product.id,
        route.params.quantity,
      );
      if (!listCarts.includes(cart)) {
        console.log('item not in cart')
        setListProducts([...listProducts, route.params.product]);
        setListCarts([...listCarts, cart]);
        const routePrice = route.params.product.price * route.params.quantity
        setTotal(prev=> prev + routePrice)
      }
    }
    if (route.params?.action && route.params.action == 'Order') {
      console.log('Finish - remove all items')
      setListProducts([]);
      setListCarts([]);
      setTotal(0);
    }
  }, [route]);

  return (
    <CustomView type={'fullscreen'}>
      {listCarts.length > 0 ? (
        <CustomView type="body">
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

          <ItemRow marginBottom={10}>
            <CustomText type="title">{lang[langPref].text_total+':'}</CustomText>
            <CustomText type="title">{priceFormat(total, 'vn')}</CustomText>
          </ItemRow>

          <Divider marginBottom={20} />

          <TextButton onPressed={onBuyPressed} type="primary">
            {lang[langPref]['buttonPlaceOrder']}
          </TextButton>
        </CustomView>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            height: '100%',
            paddingHorizontal: 16,
          }}>
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
              {lang[langPref].option_delete_cart}
            </CustomText>
          </CustomButton>
        </OptionsPanel>
      ) : (
        <></>
      )}
    </CustomView>
  );
};

export default CartScreen;