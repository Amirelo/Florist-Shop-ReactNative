// React and libs
import React from 'react';
import {FlatList} from 'react-native';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';

// Constants
import {
  NAVIGATION_BOTTOM_TAB_EXPLORE,
  NAVIGATION_MAIN_ORDER_DETAIL,
} from '../../../constants/AppConstants';

// Models
import OrderModel from '../../../models/OrderModel';

// Components
import {CustomText, CustomView} from '../../../components/atoms';
import {ItemOrder} from '../../../components/molecules';
import {TextButton} from '../../../components/molecules/buttons';

// User Preferences
import lang from '../../../language/lang';

const OrderScreen = () => {
  // Initial
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<any>>();
  const email = useSelector((store: any) => store.isLoggedIn.userEmail);
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );

  // Fields
  const [listOrders, setListOrders] = React.useState<Array<OrderModel>>([]);

  // Navigate to Order Detail Screen with data
  const onDetailPressed = (data: OrderModel) => {
    navigation.navigate(NAVIGATION_MAIN_ORDER_DETAIL, {data: data});
  };

  // Navigate - ExploreScreen
  const onShoppingPressed = () => {
    navigation.navigate(NAVIGATION_BOTTOM_TAB_EXPLORE);
  };

  // Fill Order List if User Order found
  React.useEffect(() => {
    if (route.params?.userOrders) {
      setListOrders(route.params.userOrders);
      console.log('Route:', route.params.userOrders);
    }
  }, []);

  // Listener - Orders
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
    <CustomView type="fullscreen">
      <CustomView type="body">
        {/* List - User Orders */}
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
            {/* Show empty text if no Order found */}
            <CustomText type="title" alignSelf="center" marginBottom={20}>
              {lang[langPref].text_cart_empty}
            </CustomText>
            <TextButton type="primary" onPressed={onShoppingPressed}>
              {lang[langPref].buttonShopping}
            </TextButton>
          </>
        )}
      </CustomView>
    </CustomView>
  );
};

export default OrderScreen;
