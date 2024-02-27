// React and libs
import React from 'react';
import {FlatList} from 'react-native';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useSelector} from 'react-redux';

// Constants
import {
  NAVIGATION_BOTTOM_TAB_EXPLORE,
  NAVIGATION_MAIN_CART_DELIVERY,
} from '../../../constants/AppConstants';

// Models
import {CartModel, ProductModel} from '../../../models';

// services
import {
  deleteCartItem,
  getCart,
  getProductByID,
  updateCartQuantity,
} from '../MainService';

// Components
import {
  CustomButton,
  CustomText,
  CustomView,
  Divider,
  ItemRow,
} from '../../../components/atoms';
import {ItemCart, OptionsPanel} from '../../../components/molecules';
import {TextButton} from '../../../components/molecules/buttons';

// User Preferences
import themes from '../../../themes/themes';
import lang from '../../../language/lang';

// Utilities
import {priceFormat} from '../../../utils/Utils';

const CartScreen = () => {
  // Initial
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<any>>();
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );
  const email = useSelector((store: any) => store.isLoggedIn.userEmail);

  // Fields
  const [listCarts, setListCarts] = React.useState<Array<CartModel>>([]);
  const [listProducts, setListProducts] = React.useState<Array<ProductModel>>(
    [],
  );
  const [total, setTotal] = React.useState(0);
  const [selectedProduct, setSelectedProduct] = React.useState<ProductModel>();

  // Fields - Option panel status
  const [productActive, setProductActive] = React.useState(false);

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

  // Navigate - ExploreScreen
  const onShoppingPressed = () => {
    navigation.navigate(NAVIGATION_BOTTOM_TAB_EXPLORE);
  };

  // Delete cart item
  const onItemDeletePressed = async () => {
    setProductActive(false);
    // Find amount in cart list
    const decreaseQuantity = listCarts.filter(
      cartItem => cartItem.id == selectedProduct!.id,
    )[0].quantity;
    // Update total price
    setTotal(prev => prev - selectedProduct!.price * decreaseQuantity);
    // if delete cart success
    if (await deleteCartItem(selectedProduct!.id, email)) {
      // Remove item from product list
      setListProducts(
        listProducts.filter(
          productItem => productItem.id != selectedProduct!.id,
        ),
      );
      // Remove item from cart list
      setListCarts(
        listCarts.filter(cartItem => cartItem.id != selectedProduct!.id),
      );
    }
  };

  // Button - show cart item action
  const onItemEllipsesPressed = (item: ProductModel) => {
    setSelectedProduct(item);
    setProductActive(true);
  };

  // Update Total on item quantity change
  const onQuantityChanged = async (amount: number, item: ProductModel) => {
    setTotal(prev => prev + item.price * amount);
    await updateCartQuantity(item.id, amount, email);
  };

  // Get data
  const waitForData = async () => {
    // Clear fields
    setListProducts([]);
    setListCarts([]);
    setTotal(0);

    // Get carts
    const carts: Array<CartModel> = await getCart(email);
    console.log('User carts:', carts);
    setListCarts(carts);
    var sum = 0;

    // Get Products
    carts.forEach(async (cart: any) => {
      console.log('Cart:', cart);
      console.log('Product Ref:', cart.id);
      // Get product from Firebase
      var product = await getProductByID(cart.id);
      console.log('Retreive cart product:', product);
      // Calculate total price
      sum += product!.price * cart.quantity;
      console.log('Sum of products price:', sum);
      // Set data
      setListProducts(item => [...item, product]);
      setTotal(prev => prev + sum);
      console.log('Cart total:', total);
    });
  };

  // Run at beginning
  React.useEffect(() => {
    waitForData();
  }, []);

  // Update on route data
  React.useEffect(() => {
    console.log('Cart route changed');
    // Get data from route
    if (route.params?.product && route.params?.quantity) {
      const cart: CartModel = new CartModel(
        route.params.product.id,
        route.params.quantity,
      );
      // If cart not in list
      if (!listCarts.includes(cart)) {
        // Add to list
        console.log('item not in cart');
        setListProducts([...listProducts, route.params.product]);
        setListCarts([...listCarts, cart]);
        const routePrice = route.params.product.price * route.params.quantity;
        setTotal(prev => prev + routePrice);
      }
    }
    // Check if route from OrderScreen
    if (route.params?.action && route.params.action == 'Order') {
      // Clear all data
      console.log('Finish - remove all items');
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

          {/* Total Price */}
          <ItemRow marginBottom={10}>
            <CustomText type="title">
              {lang[langPref].text_total + ':'}
            </CustomText>
            <CustomText type="title">{priceFormat(total, 'vn')}</CustomText>
          </ItemRow>

          <Divider marginBottom={20} />

          {/* Button - Place Order */}
          <TextButton onPressed={onBuyPressed} type="primary">
            {lang[langPref].buttonPlaceOrder}
          </TextButton>
        </CustomView>
      ) : (
        // Empty cart
        <CustomView type={'centerScreen'}>
          <CustomText type="title" alignSelf="center" marginBottom={20}>
            {lang[langPref].text_cart_empty}
          </CustomText>
          <TextButton type="primary" onPressed={onShoppingPressed}>
            {lang[langPref].buttonShopping}
          </TextButton>
        </CustomView>
      )}

      {/* Option Panel - delete cart */}
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
