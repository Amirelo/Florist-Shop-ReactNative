import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {PromocodeModel} from '../../../models';
import {ItemPromocode} from '../../../components/molecules';

const PromocodeScreen = () => {
  // Fields
  const promoList = Array<PromocodeModel>();
  var promo = new PromocodeModel(
    1,
    'Summer sale',
    'All items get discount',
    '%',
    15,
    'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg',
    false
  );
  promoList.push(promo);
  promo = new PromocodeModel(
    2,
    'Winter sale',
    'All items',
    '%',
    10,
    'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg',
    true
  );
  promoList.push(promo);
  promo = new PromocodeModel(
    3,
    'Autumn sale',
    'All items',
    '%',
    20,
    'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg',
    true
  );
  promoList.push(promo);
  promo = new PromocodeModel(
    4,
    'Spring sale',
    'All items',
    '%',
    3,
    'https://images.pexels.com/photos/5872364/pexels-photo-5872364.jpeg',
    true
  );
  promoList.push(promo);
  return (
    <View style={styles.view}>
      <FlatList
        contentContainerStyle={{gap: 16}}
        data={promoList}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <ItemPromocode item={item} />}
      />
    </View>
  );
};

export default PromocodeScreen;

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 16,
    paddingTop: 30,
  },
});
