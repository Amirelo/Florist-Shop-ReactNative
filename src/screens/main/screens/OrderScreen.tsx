import {FlatList, StyleSheet, View} from 'react-native';
import {ItemOrder} from '../../../components/molecules';
import OrderModel from '../../../models/OrderModel';
import {ProductModel} from '../../../models';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React from 'react';
import {CustomText} from '../../../components/atoms';
import {TextButton} from '../../../components/molecules/buttons';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import { NAVIGATION_BOTTOM_TAB_EXPLORE, NAVIGATION_MAIN_ORDER_DETAIL } from '../../../constants/AppConstants';

const OrderScreen = () => {
  // Initial
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<any>>();
  const email = useSelector((store: any) => store.isLoggedIn.userEmail);

  // Fields
  const [listOrders, setListOrders] = React.useState<Array<OrderModel>>([]);

  // Navigate to Order Detail Screen with data
  const onDetailPressed = (data: OrderModel) => {
    navigation.navigate(NAVIGATION_MAIN_ORDER_DETAIL, {data: data});
  };

  const onShoppingPressed = () => {
    navigation.navigate(NAVIGATION_BOTTOM_TAB_EXPLORE);
  };

  React.useEffect(() => {
    if (route.params?.userOrders) {
      setListOrders(route.params.userOrders);
      console.log('Route:', route.params.userOrders);
    }
  }, []);

  React.useEffect(() => {
    firestore()
      .collection('users')
      .doc(email)
      .collection('orders')
      .onSnapshot(querySnapshot => {
        setListOrders([]);
        querySnapshot.docs.map(doc => {
          const info = doc.data();
          const order = new OrderModel(
            doc.id,
            info.status,
            info.discountRef,
            info.productsPrice,
            info.productsQuantity,
            info.total,
            info.orderDate,
            info.products,
            info.address,
            info.phoneNumber,
          );
          setListOrders(prev => [...prev, order]);
        });
      });
  }, []);

  return (
    <View style={styles.view}>
      {listOrders.length > 0 ? (
        <FlatList
          data={listOrders}
          contentContainerStyle={{gap: 16}}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ItemOrder onPressed={() => onDetailPressed(item)} item={item} />
          )}
        />
      ) : (
        <>
          <CustomText type="title" alignSelf="center" marginBottom={20}>
            Empty cart
          </CustomText>
          <TextButton type="primary" onPressed={onShoppingPressed}>
            Start Shopping now
          </TextButton>
        </>
      )}
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
