// React and libs
import React from 'react';
import {FlatList, ScrollView, View} from 'react-native';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useSelector} from 'react-redux';

// Constants
import {NAVIGATION_MAIN_CART} from '../../../constants/AppConstants';

// Models
import {ProductModel} from '../../../models';

// Services
import {AddCart} from '../MainService';

// Components
import {
  CustomImage,
  CustomText,
  RatingStars,
  ItemRow,
  Divider,
  CustomView,
} from '../../../components/atoms';
import {QuantityCounter} from '../../../components/molecules';
import {TextButton} from '../../../components/molecules/buttons';

// User Preferences
import themes from '../../../themes/themes';
import lang from '../../../language/lang';

// Utilities
import {deviceWidth, priceFormat} from '../../../utils/Utils';

const ProductDetailScreen = () => {
  // Initial
  const route = useRoute<RouteProp<any>>();
  const navigation = useNavigation<NavigationProp<any>>();
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );
  const currentTheme: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );
  const email = useSelector((store: any) => store.isLoggedIn.userEmail);

  // Fields
  const [quantity, setQuantity] = React.useState(1);
  const [product, setProduct] = React.useState<ProductModel>(
    new ProductModel('', '', -10, -10, '', -10, [], [], []),
  );
  const [priceString, setPriceString] = React.useState<string>();
  const [price, setPrice] = React.useState<number>();

  // Add Item to Cart
  const onAddToCartPressed = async () => {
    if (await AddCart(product.id, quantity, email)) {
      navigation.navigate(NAVIGATION_MAIN_CART, {
        product: product,
        quantity: quantity,
      });
    } else {
      navigation.navigate(NAVIGATION_MAIN_CART);
    }
  };

  // Check quantity changed
  React.useEffect(() => {
    console.log('Changed:', quantity);
  }, [quantity]);

  // Get data from route
  React.useEffect(() => {
    if (route.params?.item) {
      var data: ProductModel = route.params.item;
      setProduct(data);
      var formatedPrice = priceFormat(data.price, 'vn');
      setPrice(data.price);
      setPriceString(formatedPrice);
    }
  }, []);

  return (
    <ScrollView>
      <CustomView type="fullscreen">
        <CustomView type='product_detail_image'>
          {/* List-  Product Images */}
          <FlatList
            horizontal={true}
            data={product!.images}
            showsHorizontalScrollIndicator={false}
            snapToInterval={deviceWidth}
            decelerationRate={'fast'}
            keyExtractor={item => item}
            renderItem={({item}) => <CustomImage source={item} type="detail" />}
          />
        </CustomView>
        <CustomView type="body">
          <ItemRow marginBottom={6}>
            {/* Product Name */}
            <CustomText type="subHeader">{product!.name}</CustomText>
            {/* Product Price */}
            <CustomText
              type="subHeader"
              color={themes[currentTheme].primaryColor}>
              {priceString + ''}
            </CustomText>
          </ItemRow>

          <ItemRow marginBottom={6}>
            <CustomText type="subTitle">
              {lang[langPref]['text_availability']}
            </CustomText>
            {/* Product Status */}
            <CustomText
              type="subTitle"
              color={
                product!.quantity > 0
                  ? themes[currentTheme].primaryColor
                  : themes[currentTheme].errorcolor
              }>
              {product!.quantity > 0
                ? lang[langPref].text_availability_instock
                : lang[langPref].text_availability_none}
            </CustomText>
          </ItemRow>

          <ItemRow marginBottom={30}>
            <CustomText type="subTitle">
              {lang[langPref].text_rating}
            </CustomText>
            {/* Rating Stars */}
            <RatingStars totalRating={product!.totalRating} />
          </ItemRow>

          <ItemRow marginBottom={24}>
            <CustomText type="title">{lang[langPref].text_quantity}</CustomText>
            {/* Change Quantity */}
            <QuantityCounter
              maxQuantity={product!.quantity}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </ItemRow>

          <Divider marginBottom={20} />

          <ItemRow marginBottom={34}>
            <CustomText type="header">{lang[langPref].text_total}</CustomText>
            {/* Total Price */}
            <CustomText type="header">
              {price ? priceFormat(price * quantity, 'vn') : ''}
            </CustomText>
          </ItemRow>

          {/* Order Button */}
          {product.quantity > 0 ? (
            <TextButton
              type="primary"
              onPressed={onAddToCartPressed}
              marginBottom={20}>
              {lang[langPref].buttonAddToCart}
            </TextButton>
          ) : (
            <TextButton
              type="primary"
              backgroundColor={themes[currentTheme].textSecondaryColor}
              marginBottom={20}>
              {'Out Of Stock'}
            </TextButton>
          )}

          {/* Review button */}
          <TextButton
            type="primary"
            backgroundColor={themes[currentTheme].warnColor}
            marginBottom={20}>
            {lang[langPref].buttonSeeReviews}
          </TextButton>
        </CustomView>
      </CustomView>
    </ScrollView>
  );
};

export default ProductDetailScreen;
