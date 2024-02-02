import React from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {
  CustomButton,
  CustomImage,
  CustomText,
  RatingStars,
  ItemRow,
} from '../../../components/atoms';
import {ProductModel} from '../../../models';
import {QuantityCounter} from '../../../components/molecules';
import themes from '../../../themes/themes';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';
import {RouteProp, useRoute} from '@react-navigation/native';
import {priceFormat} from '../../../utils/Utils';
import lang from '../../../language/lang';
import {useSelector} from 'react-redux';

const ProductDetailScreen = () => {
  // Initial
  const route = useRoute<RouteProp<any>>();

  // Fields
  const [quantity, setQuantity] = React.useState(1);
  const [product, setProduct] = React.useState<ProductModel>(
    new ProductModel(-10, '', -10, -10, '', -10, [], []),
  );

  const [priceString, setPriceString] = React.useState<string>();
  const [price, setPrice] = React.useState<number>();
  const [isAdd, setIsAdd] = React.useState(false);

  // Saved language
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );

  // Check quantity changed
  React.useEffect(() => {
    console.log('Changed:', quantity);
  }, [quantity]);

  // Get data from route
  React.useEffect(() => {
    if (route.params?.item) {
      var data: ProductModel = route.params.item;
      setProduct(data);
      var formatedPrice = priceFormat(data.price, langPref);
      setPrice(data.price);
      setPriceString(formatedPrice);
    }
  }, []);

  return (
    <ScrollView>
      <View>
        <View
          style={{
            width: '100%',
            height: 350,
            borderWidth: 1,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            overflow: 'hidden',
            marginBottom: 20,
          }}>
          <FlatList
            horizontal={true}
            data={product!.images}
            keyExtractor={item => item}
            renderItem={({item}) => <CustomImage source={item} type="detail" />}
          />
        </View>
        <View style={styles.body}>
          <ItemRow marginBottom={6}>
            <CustomText type="subHeader">{product!.name}</CustomText>
            <CustomText
              type="subHeader"
              color={themes['defaultTheme'].primaryColor}>
              {priceString + ''}
            </CustomText>
          </ItemRow>

          <ItemRow marginBottom={6}>
            <CustomText type="subTitle">{lang[langPref]['text_availability']}</CustomText>
            <CustomText
              type="subTitle"
              color={
                product!.quantity > 0
                  ? themes['defaultTheme'].primaryColor
                  : themes['defaultTheme'].errorcolor
              }>
              {product!.quantity > 0 ? lang[langPref]['text_availability_instock'] : lang[langPref]['text_availability_none']}
            </CustomText>
          </ItemRow>

          <ItemRow marginBottom={30}>
            <CustomText type="subTitle">{lang[langPref]['text_rating']}</CustomText>
            <RatingStars totalRating={product!.totalRating} />
          </ItemRow>
          <View style={styles.line}></View>

          <ItemRow marginBottom={24}>
            <CustomText type="title">{lang[langPref]['text_quantity']}</CustomText>
            <QuantityCounter
              maxQuantity={product!.quantity}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </ItemRow>

          <ItemRow marginBottom={34}>
            <CustomText type="header">
              {lang[langPref]['text_total']}
            </CustomText>
            <CustomText type="header">
              {price ? priceFormat(price * quantity, langPref) : ''}
            </CustomText>
          </ItemRow>
        </View>
        <CustomButton style={{alignSelf: 'center', marginBottom: 30}}>
          <View
            style={{
              width: 205,
              height: 60,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              backgroundColor: themes['defaultTheme'].primaryColor,
              borderRadius: 7,
            }}>
            <FontAwesomeIcon color="white" icon={faCartShopping} />
            <CustomText color={'white'}>{lang[langPref]['buttonAddToCart']}</CustomText>
          </View>
        </CustomButton>
      </View>
    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 16,
  },
  line: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 30,
  },
});
