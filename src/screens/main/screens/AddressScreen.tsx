import {FlatList, StyleSheet, View} from 'react-native';
import {ItemAddress} from '../../../components/molecules';
import {AddressModel} from '../../../models';

const AddressScreen = () => {
  const addressList = new Array<AddressModel>();

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
        style={{marginTop:30}}
        contentContainerStyle={{gap:16}}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <ItemAddress item={item} />}
      />
    </View>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
    view:{
        paddingHorizontal: 16
    }
})