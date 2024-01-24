import React from 'react';
import {CustomButton, CustomText} from '../../../components/atoms';
import {FlatList, StyleSheet, View} from 'react-native';
import {ItemCart, ItemRow} from '../../../components/molecules';
import {ProductModel} from '../../../models';
import themes from '../../../themes/themes';

const CartScreen = () => {
  const [total, setTotal] = React.useState(0);

  var productList = Array<ProductModel>();
  const testProduct = new ProductModel('Spark', 90, 3, 'A bouquet', 2.5, 1, [
    'https://cdn.pixabay.com/photo/2024/01/12/21/23/cortina-dampezzo-8504755_1280.jpg',
  ]);
  productList.push(testProduct);
  const testProduct1 = new ProductModel('Sponk', 90, 3, 'A bouquet', 2.5, 1, [
    'https://cdn.pixabay.com/photo/2024/01/12/21/23/cortina-dampezzo-8504755_1280.jpg',
  ]);
  productList.push(testProduct1)
  React.useEffect(()=>{
    var sum = 0
    for(var i = 0; i < productList.length; i++){
      sum += productList[i].price * 1
    }
    setTotal(sum)
  },[])

  return (
    <View style={styles.view}>
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
        data={productList}
        keyExtractor={item => item.name}
        renderItem={({item}) => <ItemCart marginBottom={12} item={item} total={total} setTotal={setTotal}/>}
      />

      <View style={styles.line} />

      <ItemRow
        leftWidget={<CustomText type="title">Total</CustomText>}
        rightWidget={<CustomText type="title">{`$${total}`}</CustomText>}
      />

      <CustomButton style={styles.couponButton}>
        <CustomText>Click here to find coupons</CustomText>
      </CustomButton>

      <CustomButton style={styles.orderButton}>
        <CustomText color={'white'}>Place Order</CustomText>
      </CustomButton>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 16,
  },
  couponButton: {
    marginTop: 20,
    marginBottom: 20,
    height: 48,
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: 'white',
    borderColor: themes['defaultTheme'].textSecondaryColor,
    alignItems: 'center',
    justifyContent: 'center',
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
