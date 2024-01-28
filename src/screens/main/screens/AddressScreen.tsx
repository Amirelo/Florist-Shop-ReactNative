import {FlatList, StyleSheet, View} from 'react-native';
import {ItemAddress} from '../../../components/molecules';
import {AddressModel} from '../../../models';
import {NavigationProp, useNavigation} from '@react-navigation/native';

const AddressScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const addressList = new Array<AddressModel>();
  const onEditPressed = (item: AddressModel) => {
    navigation.navigate('AddressEdit', {item: item});
  };

  var address = new AddressModel(
    1,
    '42',
    'No Trang Long',
    'Tan Son Nhi',
    'Binh Thanh',
    'HCM',
  );
  addressList.push(address);
  address = new AddressModel(
    2,
    '41',
    'No Trang Long',
    'Tan Son Nhi',
    'Binh Thanh',
    'HCM',
  );
  addressList.push(address);
  address = new AddressModel(
    3,
    '40',
    'No Trang Long',
    'Tan Son Nhi',
    'Binh Thanh',
    'HCM',
  );
  addressList.push(address);

  return (
    <View style={styles.view}>
      <FlatList
        data={addressList}
        style={{marginTop: 30}}
        contentContainerStyle={{gap: 16}}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <ItemAddress onPressed={() => onEditPressed(item)} item={item} />
        )}
      />
    </View>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 16,
  },
});
