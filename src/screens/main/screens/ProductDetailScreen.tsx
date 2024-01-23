import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  CustomButton,
  CustomImage,
  CustomText,
  RatingStars,
} from '../../../components/atoms';
import {ProductModel} from '../../../models';
import {ItemRow, QuantityCounter} from '../../../components/molecules';
import themes from '../../../themes/themes';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';

const ProductDetailScreen = () => {
  const [quantity, setQuantity] = React.useState(2);

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
          <ItemRow
            leftWidget={
              <CustomText type="subHeader">{testProduct.name}</CustomText>
            }
            rightWidget={
              <CustomText
                type="subHeader"
                color={
                  themes['defaultTheme'].primaryColor
                }>{`$${testProduct.price}`}</CustomText>
            }
            marginBottom={6}
          />

          <ItemRow
            marginBottom={6}
            leftWidget={<CustomText type="subTitle">Availability</CustomText>}
            rightWidget={
              <CustomText
                type="subTitle"
                color={
                  testProduct.quantity > 0
                    ? themes['defaultTheme'].primaryColor
                    : themes['defaultTheme'].errorcolor
                }>
                {testProduct.quantity > 0 ? 'In Stock' : 'Out Of Stock'}
              </CustomText>
            }
          />

          <ItemRow
            marginBottom={30}
            leftWidget={<CustomText type="subTitle">Rating</CustomText>}
            rightWidget={<RatingStars totalRating={testProduct.totalRating} />}
          />
          <View style={styles.line}></View>

          <ItemRow
            marginBottom={24}
            leftWidget={<CustomText type="title">Quantity</CustomText>}
            rightWidget={<QuantityCounter />}
          />

          <ItemRow
            marginBottom={34}
            leftWidget={<CustomText type="header">Total</CustomText>}
            rightWidget={
              <CustomText type="header">{`$${
                testProduct.price * quantity
              }`}</CustomText>
            }
          />
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
