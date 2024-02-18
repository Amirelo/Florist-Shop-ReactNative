import React from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {
  CustomButton,
  CustomImage,
  CustomText,
  RatingStars,
  ItemRow,
  Divider,
  CustomView,
} from '../../../components/atoms';
import {ProductModel} from '../../../models';
import {QuantityCounter} from '../../../components/molecules';
import themes from '../../../themes/themes';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {deviceWidth, priceFormat} from '../../../utils/Utils';
import lang from '../../../language/lang';
import {useSelector} from 'react-redux';
import {TextButton} from '../../../components/molecules/buttons';
import {AddCart} from '../MainService';
import { NAVIGATION_MAIN_CART } from '../../../constants/AppConstants';

const ProductDetailScreen = () => {
  // Initial
  const route = useRoute<RouteProp<any>>();
  const navigation = useNavigation<NavigationProp<any>>();

  // Fields
  const [quantity, setQuantity] = React.useState(1);
  const [product, setProduct] = React.useState<ProductModel>(
    new ProductModel('', '', -10, -10, '', -10, [], []),
  );
  const [priceString, setPriceString] = React.useState<string>();
  const [price, setPrice] = React.useState<number>();

  // Saved language
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );

    const currentTheme:keyof typeof themes = useSelector((store:any) => store.preference.theme)

  const email = useSelector((store: any) => store.isLoggedIn.userEmail);

  const onAddToCartPressed = async () => {
    if (await AddCart(product.id, quantity, email)) {
      navigation.navigate(NAVIGATION_MAIN_CART, {product: product, quantity: quantity});
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
      <CustomView type='fullscreen'>
        <View
          style={{
            width: '100%',
            height: 350,
            borderWidth: 1,
            borderTopWidth:0,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            overflow: 'hidden',
            marginBottom: 20,
          }}>
          {/* Product Image List */}
          <FlatList
            horizontal={true}
            data={product!.images}
            showsHorizontalScrollIndicator={false}
            snapToInterval={deviceWidth}
            decelerationRate={'fast'}
            keyExtractor={item => item}
            renderItem={({item}) => <CustomImage source={item} type="detail" />}
          />
        </View>
        <CustomView type='body'>
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
            <CustomText type="title">
              {lang[langPref].text_quantity}
            </CustomText>
            {/* Change Quantity */}
            <QuantityCounter
              maxQuantity={product!.quantity}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </ItemRow>

          <Divider marginBottom={20} />

          <ItemRow marginBottom={34}>
            <CustomText type="header">
              {lang[langPref].text_total}
            </CustomText>
            {/* Total Price */}
            <CustomText type="header">
              {price ? priceFormat(price * quantity, 'vn') : ''}
            </CustomText>
          </ItemRow>

          {/* Order Button */}
          <TextButton type="primary" onPressed={onAddToCartPressed} marginBottom={20}>
            {lang[langPref].buttonAddToCart}
          </TextButton>

          {/* Review button */}
          <TextButton
            type="primary"
            backgroundColor={themes[currentTheme].warnColor} marginBottom={20}>
            {lang[langPref].buttonSeeReviews}
          </TextButton>
        </CustomView>
      </CustomView>
    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 16,
  },
});
