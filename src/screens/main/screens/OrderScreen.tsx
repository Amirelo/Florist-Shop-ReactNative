import {FlatList, StyleSheet, View} from 'react-native';
import {ItemOrder} from '../../../components/molecules';
import OrderModel from '../../../models/OrderModel';
import {ProductModel} from '../../../models';
import {NavigationProp, RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import { CustomText } from '../../../components/atoms';
import { TextButton } from '../../../components/molecules/buttons';

const OrderScreen = () => {
  // Initial
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<any>>();

  // Fields
  const [listOrders, setListOrders] = React.useState<Array<OrderModel>>([])

  // Navigate to Order Detail Screen with data
  const onDetailPressed = (data: OrderModel) => {
    navigation.navigate('OrderDetail', {data: data});
  };

  const onShoppingPressed = () => {
    navigation.navigate('Explore')
  }

  React.useEffect(()=> {
    if(route.params?.userOrders){
      setListOrders(route.params.userOrders)
      console.log("Route:", route.params.userOrders)
    }
  },[])

  return (
    <View style={styles.view}>
      {listOrders.length>0 ?
      <FlatList
        data={listOrders}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ItemOrder onPressed={() => onDetailPressed(item)} item={item} />
        )}
      />:
      <>
      <CustomText type='title' alignSelf='center' marginBottom={20}>Empty cart</CustomText>
      <TextButton type='primary' onPressed={onShoppingPressed}>Start Shopping now</TextButton>
      </>}
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
});
