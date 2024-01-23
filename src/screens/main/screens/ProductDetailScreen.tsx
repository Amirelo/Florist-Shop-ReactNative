import {StyleSheet, View} from 'react-native';
import {CustomImage, CustomText, RatingStars} from '../../../components/atoms';
import {ProductModel} from '../../../components/models';
import {ItemRow} from '../../../components/molecules';
import themes from '../../../themes/themes';

const ProductDetailScreen = () => {
  const testProduct = new ProductModel('Spark', 90, 5, 'A bouquet', 2.4, 1, [
    'https://cdn.pixabay.com/photo/2024/01/12/21/23/cortina-dampezzo-8504755_1280.jpg',
  ]);
  return (
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
        rightWidget={<RatingStars totalRating={testProduct.totalRating}/>}
        />
        <View style={styles.line}></View>

        <ItemRow
        marginBottom={24}
        leftWidget={<CustomText type='title'>Quantity</CustomText>}
        rightWidget={<CustomText type='title'>Quantity</CustomText>}/>

      </View>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 16,
  },
  line:{
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom:30,
  }
});
