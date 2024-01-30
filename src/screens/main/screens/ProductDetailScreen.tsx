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
import { RouteProp, useRoute } from '@react-navigation/native';

const ProductDetailScreen = () => {
  const [quantity, setQuantity] = React.useState(1);
  const [product, setProduct] = React.useState<ProductModel>(new ProductModel(-10,'',-10,-10,'',-10,-10,[]));
  const route = useRoute<RouteProp<any>>();

  React.useEffect(() => {
    console.log('Changed:', quantity);
  }, [quantity]);

  React.useEffect(()=>{
    if(route.params?.item){
      setProduct(route.params.item)
    }
  },[])

  return (
    <ScrollView>
      <View>
        <CustomImage
          marginBottom={10}
          source={product!.links[0]}
          type="productDetail"
        />
        <View style={styles.body}>
          <ItemRow marginBottom={6}>
            <CustomText type="subHeader">{product!.name}</CustomText>
            <CustomText
              type="subHeader"
              color={
                themes['defaultTheme'].primaryColor
              }>{`$${product!.price}`}</CustomText>
          </ItemRow>

          <ItemRow marginBottom={6}>
            <CustomText type="subTitle">Availability</CustomText>
            <CustomText
              type="subTitle"
              color={
                product!.quantity > 0
                  ? themes['defaultTheme'].primaryColor
                  : themes['defaultTheme'].errorcolor
              }>
              {product!.quantity > 0 ? 'In Stock' : 'Out Of Stock'}
            </CustomText>
          </ItemRow>

          <ItemRow marginBottom={30}>
            <CustomText type="subTitle">Rating</CustomText>
            <RatingStars totalRating={product!.totalRating} />
          </ItemRow>
          <View style={styles.line}></View>

          <ItemRow marginBottom={24}>
            <CustomText type="title">Quantity</CustomText>
            <QuantityCounter
              maxQuantity={product!.quantity}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </ItemRow>

          <ItemRow marginBottom={34}>
            <CustomText type="header">Total</CustomText>
            <CustomText type="header">{`$${
              product!.price * quantity
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
