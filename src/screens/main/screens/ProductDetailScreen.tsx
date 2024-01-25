import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
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

const ProductDetailScreen = () => {
  const [quantity, setQuantity] = React.useState(1);

  React.useEffect(() => {
    console.log('Changed:', quantity);
  }, [quantity]);

  const testProduct = new ProductModel('Spark', 90, 5, 'A bouquet', 2.4, 1, [
    'https://cdn.pixabay.com/photo/2024/01/12/21/23/cortina-dampezzo-8504755_1280.jpg',
  ]);
  return (
    <ScrollView>
      <View>
        <CustomImage
          marginBottom={10}
          source={testProduct.links[0]}
          type="productDetail"
        />
        <View style={styles.body}>
          <ItemRow marginBottom={6}>
            <CustomText type="subHeader">{testProduct.name}</CustomText>
            <CustomText
              type="subHeader"
              color={
                themes['defaultTheme'].primaryColor
              }>{`$${testProduct.price}`}</CustomText>
          </ItemRow>

          <ItemRow marginBottom={6}>
            <CustomText type="subTitle">Availability</CustomText>
            <CustomText
              type="subTitle"
              color={
                testProduct.quantity > 0
                  ? themes['defaultTheme'].primaryColor
                  : themes['defaultTheme'].errorcolor
              }>
              {testProduct.quantity > 0 ? 'In Stock' : 'Out Of Stock'}
            </CustomText>
          </ItemRow>

          <ItemRow marginBottom={30}>
            <CustomText type="subTitle">Rating</CustomText>
            <RatingStars totalRating={testProduct.totalRating} />
          </ItemRow>
          <View style={styles.line}></View>

          <ItemRow marginBottom={24}>
            <CustomText type="title">Quantity</CustomText>
            <QuantityCounter
              maxQuantity={testProduct.quantity}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </ItemRow>

          <ItemRow marginBottom={34}>
            <CustomText type="header">Total</CustomText>
            <CustomText type="header">{`$${
              testProduct.price * quantity
            }`}</CustomText>
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
            <CustomText color={'white'}>Add To Cart</CustomText>
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
