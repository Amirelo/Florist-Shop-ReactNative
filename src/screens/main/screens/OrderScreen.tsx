import {FlatList, StyleSheet, View} from 'react-native';
import {ItemOrder} from '../../../components/molecules';
import OrderModel from '../../../models/OrderModel';
import {ProductModel} from '../../../models';
import {NavigationProp, useNavigation} from '@react-navigation/native';

const OrderScreen = () => {
  var productList = [];
  var product = new ProductModel(1,'Spark', 40, 20, 'A bouquet', 2.5, 1, [
    'https://cdn.pixabay.com/photo/2024/01/12/21/23/cortina-dampezzo-8504755_1280.jpg',
  ]);
  productList.push(product);
  const order = new OrderModel(1, 'PREPARING', 5, 530, '20240423', productList);
  var orderList = [];
  orderList.push(order);

  const navigation = useNavigation<NavigationProp<any>>();
  const onDetailPressed = (data: OrderModel) => {
    navigation.navigate('OrderDetail', {data: data});
  };

  return (
    <View style={styles.view}>
      <FlatList
        data={orderList}
        keyExtractor={item => item.id.toString()}
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
