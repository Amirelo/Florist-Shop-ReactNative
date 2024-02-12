import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {CustomButton, CustomText, ItemRow} from '../../../components/atoms';
import themes from '../../../themes/themes';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faColumns} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { OrderModel, ProductModel } from '../../../models';
import { ItemProduct, ItemProductLong } from '../../../components/molecules';
import { getProductByID } from '../MainService';

const OrderDetailScreen = () => {
  // Initial
  const route = useRoute<RouteProp<any>>();
  
  // Fields
  const [order, setOrder] = React.useState<OrderModel>();
  const [listProducts, setListProducts] = React.useState<Array<ProductModel>>([]);
  
  // Get data from route
  React.useEffect(()=>{
    if (route.params?.data){
      setOrder(route.params.data)
      route.params.data.products.forEach( async (item:any) => {
        const product:ProductModel = await getProductByID(item.productRef)
        setListProducts(prev => [...prev, product])
      })

    } else{
      console.log("No item found")
    }
  },[])

  return (
    <ScrollView>
      <View style={styles.view}>
        <ItemRow>
          <CustomText marginBottom={20} type="title">
            General Info
          </CustomText>
          <FontAwesomeIcon size={24} icon={faColumns} />
        </ItemRow>
        <ItemRow marginBottom={8}>
          <CustomText>Order ID</CustomText>
          <CustomText>{order ? order.id : ''}</CustomText>
        </ItemRow>
        <ItemRow marginBottom={8}>
          <CustomText>Order date</CustomText>
          <CustomText>{order ? order.orderDate : ''}</CustomText>
        </ItemRow>
        <ItemRow marginBottom={30}>
          <CustomText>Status</CustomText>
          <CustomText>{order ? order.status : ''}</CustomText>
        </ItemRow>

        <ItemRow>
          <CustomText marginBottom={20} type="title">
            Products
          </CustomText>
          <FontAwesomeIcon size={24} icon={faColumns} />
        </ItemRow>

        <FlatList
        style={{marginBottom: 20}}
        horizontal={true}
        data={listProducts}
        keyExtractor={item => item.name}
        renderItem={({item}) => (<ItemProduct langPref='en' product={item}/>)}
        />

        <ItemRow marginBottom={30}>
          <CustomText>Total Price</CustomText>
          <CustomText>$290</CustomText>
        </ItemRow>

        <CustomButton style={styles.button}>
          <CustomText type="subTitle" color={'white'}>
            Cancel Order
          </CustomText>
        </CustomButton>

        <CustomButton style={[styles.button, styles.review]}>
          <CustomText type="subTitle" color={'white'}>
            Write a review
          </CustomText>
        </CustomButton>
      </View>
    </ScrollView>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  button: {
    paddingVertical: 12,
    width: '60%',
    borderRadius: 7,
    backgroundColor: themes['defaultTheme'].errorcolor,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  review: {
    backgroundColor: themes['defaultTheme'].primaryColor,
  },
});
