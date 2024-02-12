import {FlatList, StyleSheet, View} from 'react-native';
import {ItemOrder} from '../../../components/molecules';
import OrderModel from '../../../models/OrderModel';
import {ProductModel} from '../../../models';
import {NavigationProp, RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';

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

  React.useEffect(()=> {
    if(route.params?.userOrders){
      setListOrders(route.params.userOrders)
      console.log("Route:", route.params.userOrders)
    }
  },[])

  return (
    <View style={styles.view}>
      <FlatList
        data={listOrders}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ItemOrder onPressed={() => onDetailPressed(item)} item={item} />
        )}
      />
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
